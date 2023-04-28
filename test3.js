const fs = require('fs');
var uids = [];
fs.readdir(__dirname + "/data/cookies/", function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    for (let i = 0; i < files.length; i++) {
        uids[i] = files[i].replace(".json", "");
    }
});

console.log(JSON.stringify(uids));