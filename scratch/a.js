const fs = require("fs");

let arr = JSON.parse(fs.readFileSync("../data/users.json"));

const id = "61554476991649";

if (!arr.blocked.includes(id) && !arr.bot.includes(id)) {
    console.log(" not blocked")
} else {
    console.log(" blocked")
}
