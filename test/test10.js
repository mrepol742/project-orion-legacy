const cheerio = require("cheerio")
const axios = require("axios");
const fs = require("fs");

axios.get("https://myanimelist.net/search/all?cat=all&q=detective%20conan").then(response => {
let mal = cheerio.load(response.data);

const findSearchResults = mal("a");
for (let i = 0; i < findSearchResults.length; i++) {
    if (String(mal(findSearchResults[i]).attr("class")).includes("hoverinfo_trigger")) {
        console.log("mal_found " + mal(findSearchResults[i]).attr("href"))
        axios.get(mal(findSearchResults[i]).attr("href")).then(response1 => {
            let mal1 = cheerio.load(response1.data, { decodeEntities: false});
            
            let construct = "Title: " + formatMalRes(mal1(".title-name"), false);
            construct += formatMalRes(mal1(".spaceit_pad"), false).replace(/\s+/g, ' ')
            .replaceAll("__new_tab_here__", "\n")

            .replace(/\%delete_span\%(.*?)\%\^delete_span\%/g, "")
            .replace(/\%delete_span\%/g, "")
        
            construct += "\n\n" + formatMalRes(mal1("[itemprop=description]"), true).replace(/\s+/g, ' ')
            .replaceAll("__new_tab_here__", "\n");

            console.log(construct);

        });
        break;
    }
}
});

function formatMalRes(str, bn) {
    if (str === null || str === "") {
        return false;
    } else {
        str = str.toString();
    }
    str = str
    .replaceAll("<small>", "%delete_span%").replaceAll("</small>", "%^delete_span%")
    .replaceAll("<span itemprop=\"genre\" style=\"display: none\">", "%delete_span%")
    .replaceAll("</span><a href=\"/anime/genre/", "%^delete_span%<a href=\"/anime/genre/")
    .replaceAll("<span", "__new_tab_here__<span")

    if (bn) {
        str = str.replaceAll("<br", "__new_tab_here__<br");
    }
    return str.replace(/(<([^>]+)>)/gi, "");
}
