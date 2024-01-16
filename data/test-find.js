/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

const fs = require("fs");

let users = JSON.parse(fs.readFileSync(__dirname + "/users.json","utf8"));

let count = 1;
for (user in users.list) {
    let name = users.list[user].name;
    if (name) {
    let userName = name.normalize("NFKC").toLowerCase()
   // console.log(userName)
    } else {
        console.log(users.list[user].id)
        count++;
    }
}

console.log("found " + count + " no profiled users")