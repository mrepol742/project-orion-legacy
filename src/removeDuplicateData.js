/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

const fs = require("fs");

let arr = JSON.parse(fs.readFileSync(__dirname + "/wyr.json"));

var clean = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.ops1 === arr.ops1 && t.ops2 === arr.ops2)));

console.log(clean);

fs.writeFileSync(__dirname + "/wyr.json", JSON.stringify(clean), "utf8");