const { Innertube, UniversalCache, Utils } = require("youtubei.js");
const fs = require("fs");

async function a() {
const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
const search = await yt.search("in the end", { type: "video" });

console.log(JSON.stringify(search.results[0].id, null, 1))
return;
if (contents && contents.title) {

    const stream = await yt.download(contents.id, {
        type: "video+audio",
        quality: "best",
        format: "mp4",
    });

    let filename = "../cache/music_.mp4";
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