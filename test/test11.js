// malne

const cheerio = require("cheerio")
const axios = require("axios");
const fs = require("fs");

let toBeSearch = "manga";
try {
axios.get("https://myanimelist.netdad/search/all?cat=all&q=detective%20conan").then(response => {
    try {
let mal = cheerio.load(response.data);
mal.html();

const findSearchResults = mal("a");
for (let i = 0; i < findSearchResults.length; i++) {
    if (String(mal(findSearchResults[i]).attr("class")) == animeMM(toBeSearch)) {
        let res = mal(findSearchResults[i]);
        let url = String(res).split("/");
        if (isNumeric(url[4]) && url[3] == toBeSearch) {
console.log(toBeSearch + " == " + res.text())
        }
    }
}
} catch (err) {
    console.log("err")
}
});
} catch (err) {
    console.log("ea")
}

function animeMM(str) {
    if (str == "manga") {
        return "hoverinfo_trigger fw-b";
    }
    return "hoverinfo_trigger fw-b fl-l";
}
function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
           !isNaN(parseFloat(str))
  }