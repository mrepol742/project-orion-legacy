const fs = require("fs");

let a = [];
fs.readdir(__dirname + "/", function (err, files) {
    a.push(files);
    fs.writeFileSync(__dirname + "/fonts.json", JSON.stringify(a), 'utf8')
});

