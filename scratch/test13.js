const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

//axios.get("https://snaptik.app/").then((response) => {
    //fs.writeFileSync(__dirname +"/tik.html", response.data, 'UTF-8');
    let file = fs.readFileSync(__dirname + "/tik.html", 'utf8');
    $ = cheerio.load(file);
    $("input").each(function() {
        $(this).attr("value", "hello world")
    })
    console.log($.html())
//});
