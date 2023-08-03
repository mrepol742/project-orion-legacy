const fs = require("fs");
const axios = require("axios");

let wyr = [];

async function main() {
for (let i = 0; i < 3000; i++) {
    await sleep(500)
getResponseData("https://meowfacts.herokuapp.com/").then((response) => {
   
    if (response == null) {
        console.log("null")
    } else {
      if (!wyr.includes(response.data) && response.data != null) {
            console.log("added " + response.data)
            wyr.push(response.data);
            fs.writeFileSync(__dirname + "/cat.json", JSON.stringify(wyr), "utf8")
      }
    }
});
}
}
main();
/*
const ss = JSON.parse(fs.readFileSync(__dirname + "/joke.json", "utf8"));
console.log(ss.length)
*/
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


async function getResponseData(url) {
    console.log("response_data " + url);
    let data = await axios
        .get(encodeURI(url))
        .then((response) => {
            if (response.data.error === undefined) {
                return response.data;
            } else {
                console.log("response_null " + url);
                return null;
            }
        })
        .catch((err) => {
            console.log("response_data_err " + err);
            return null;
        });
    return data;
}
