const utils = require("./assets/mj-fca/utils.js");
const https = require("http")

https.get("http://127.0.0.1:3000", function (res) {
    console.log('statusCode:', res.statusCode);
});