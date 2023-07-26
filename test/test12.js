const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

axios.get("https://mydramalist.com/search?q=detective+conan").then((response) => {
    let mal = cheerio.load(response.data);
    const findSearchResults = mal("h6");

    const header = mal(findSearchResults[0]);
    let url = String(header).split('<a href="')[1].split('">')[0];
    console.log("mdl_url " + url);

    axios.get("https://mydramalist.com" + url).then((response1) => {
        let res = cheerio.load(response1.data, { decodeEntities: false });
        console.log(
            formatMdlRes(res(".list-item"))
                .replace(/\s+/g, " ")
                .replace(/%_new_tab_line%/g, "\n")
                .replace(/%_comma_here_%/g, " as")
                .replace(/\/%_main_role_%/g, "\n")
        );

        console.log(formatMdlRes(res(".show-synopsis")).replace(/\s+/g, " ").split("%_split_here_%")[0]);
    });
});

function formatMdlRes(str) {
    if (str === null || str === "") {
        return false;
    } else {
        str = str.toString();
    }
    str = str.replaceAll('<b class="inline">', '%_new_tab_line%<b class="inline">');
    str = str.replaceAll('<span class="read-more-hidden">', '%_split_here_%<span class="read-more-hidden">');
    str = str.replaceAll("</b></a>", "</b>%_comma_here_%</a>");
    str = str.replaceAll('itempropx="name">', 'itempropx="name">/%_main_role_%');

    return str.replace(/(<([^>]+)>)/gi, "");
}
