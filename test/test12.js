
const cheerio = require("cheerio")
const axios = require("axios");
const fs = require("fs");

axios.get("https://animepahe.ru/").then(response => {
let mal = cheerio.load(response.data);
fs.writeFileSync(__dirname + "/mal.html", response.data, 'UTF-8')
});