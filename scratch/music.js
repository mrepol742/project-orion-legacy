const { Innertube, UniversalCache, Utils } = require("youtubei.js");
const fs = require("fs");

async function main() {
const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
const search = await yt.music.search("in the end ", { type: "song" });

let stringBuilder = "";
let thumbnails = [];
let time =" utils.getTimestamp()";
for (musicID in search["contents"][0]["contents"]) {

   
    if (musicID < 7 && search["contents"][0]["contents"][musicID].type == "MusicResponsiveListItem") {
        
        stringBuilder += (parseInt(musicID) + 1) + ". " + search["contents"][0]["contents"][musicID].title;
        stringBuilder += "\n" + search["contents"][0]["contents"][musicID].duration.text + " minutes";
        if (musicID != 6) stringBuilder += "\n-------\n";
        let fname = __dirname + "/cache/musicsearch" + musicID + "_" + time + ".png";
       await downloadFile(encodeURI(search["contents"][0]["contents"][musicID].thumbnails[0].url), fname).then((response1) => {
           thumbnails.push(fname);
        });
    }
    
}


    console.log(stringBuilder)
}

main();