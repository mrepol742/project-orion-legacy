const cheerio = require("cheerio")
const axios = require("axios");
const fs = require("fs");

//axios.get("https://mydramalist.com/search?q=sweet+home").then(response => {
//fs.writeFileSync(__dirname + "/mal.html", response.data, "UTF-8")
let mal = cheerio.load(fs.readFileSync(__dirname + "/mal.html", "UTF-8"));
const findSearchResults = mal("h6");

//<h6 class="text-primary title"><a href="/34064-sweet-home">Sweet Home</a>
//<a class="btn simple btn-manage-list" rel="nofollow" data-id="34064" data-stats="mylist:34064"><span><i class="far fa-plus"></i></span></a>
//</h6>
const header = mal(findSearchResults[0])
let url = String(header).split("<a href=\"")[1].split("\">")[0];
console.log("mdl_url " + url);

///axios.get("https://mydramalist.com" + url).then(response => {
   //fs.writeFileSync(__dirname + "/res.html", response.data, "UTF-8")
   let res = cheerio.load(fs.readFileSync(__dirname + "/res.html", "UTF-8"));
console.log(formatMdlRes(res(".list-item")))
//});
//});

function formatMdlRes(str) {
    if (str === null || str === "") {
        return false;
    } else {
        str = str.toString();
    }
    return str.replace(/(<([^>]+)>)/gi, "");
}
