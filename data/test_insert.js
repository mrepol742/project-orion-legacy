/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

const fs = require("fs");

let settings = JSON.parse(fs.readFileSync(__dirname + "/accountPreferences.json", "utf8"));
let settingsThread = JSON.parse(fs.readFileSync(__dirname + "/threadPreferences.json", "utf8"));

let data = "insertData account value:true".split(" ");

let location = data[1];
let tbs = data[2].split(":");
if (location == "account") {
    for (account in settings) {
        settings[account][tbs[0]] = getTrueValue(tbs[1]);
    }
} else if (location == "thread") {
    for (thread in settingsThread) {
        settingsThread[thread][tbs[0]] = getTrueValue(tbs[1]);
    }
}

function getTrueValue(value) {
    if (/^\d+$/.test(value)) {
        // str > int
        value = parseInt(value);
    } else if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
        // str > fl/db
        value = parseFloat(value);
    } else if (/^(true|false)$/.test(value)) {
        // str > bn
        value = value === "true";
    }
    return value;
}

console.log(JSON.stringify(settings, null, 4));
