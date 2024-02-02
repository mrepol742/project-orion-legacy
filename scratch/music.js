const { Innertube, UniversalCache, Utils } = require("youtubei.js");
const fs = require("fs");

async function a() {
const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
const search = await yt.music.search("in the end", { type: "song" });

const contents = search.contents[0].contents[0];

if (contents && contents.title) {

    const stream = await yt.download(contents.id, {
        type: "audio+video",
        quality: "best",
        format: "mp4",
    });

    let filename = "../cache/music_.mp3";
    let file = fs.createWriteStream(filename);

    for await (chunk of Utils.streamToIterable(stream)) {
        file.write(chunk);
    }
    let construct = contents.title + "\n\nDuration: " + contents.duration.text + " minutes";
    if (contents.album) {
        construct += "\nAlbum: " + contents.album.name;
    }
    if (contents.artist) {
        construct += "\nArtist: " + contents.artist.name;
    }
    let message = {
        body: construct,
        attachment: fs.createReadStream(filename),
    };

    console.log(construct)
}
}

a();