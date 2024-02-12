const { Innertube, UniversalCache, Utils } = require("youtubei.js");
const fs = require("fs");

async function main() {
const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
const search = await yt.search("in the end", { type: "video" });

let stringBuilder = "";
let thumbnails = [];
let time = utils.getTimestamp();
for (musicID in search.results) {
    if (musicID < 7 && search.results[musicID].type == "Video") {
        stringBuilder += (parseInt(musicID) + 1) + ". " + search.results[musicID].title.text;
        stringBuilder += "\n" + search.results[musicID].published.text;
        stringBuilder += "\n" + search.results[musicID].short_view_count.text;
        stringBuilder += "\n" + search.results[musicID].duration.text + " minutes";
        if (musicID != 5) stringBuilder += "\n-------\n";
        let fname = __dirname + "/cache/musicsearch" + musicID + "_" + time + ".png";
        await downloadFile(encodeURI(search.results[musicID].thumbnails[0].url), fname).then((response1) => {
            thumbnails.push(fname);
        });
    }
}

let message = {
    body: stringBuilder,
    attachment: [],
};

for (thumbnail in thumbnails) {
    message.attachment.push(fs.createReadStream(thumbnails[thumbnail]));
}
sendMessage(api, event, message);
}

main();