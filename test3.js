const fs = require('fs');

let count = 0;
let count1 = 0;
let count2 = 0;
let count3 = 0;
let a = ["audios", "images", "videos", "files"];
for (typ in a) {
   let type = a[typ];
    fs.readdir(__dirname + "/cache/" + type + "/", function (err, files) {
        if (err) {
            return console.log(err);
        }
        files.forEach(function (file) {
            if (!file.endsWith(".gitkeep")) {
                if (type == "audios") {
                    count++;
                } else if (type == "images") {
                    count1++;
                } else if (type == "videos") {
                    count2++;
                } else {
                    count3++;
                }
                unlink(__dirname + "/cache/" + type + "/" + file);
            }
        });
    });
}

function unlink(dir) {
   fs.unlinkSync(dir, (err) => {
      if (err) console.log(err);
     console.log("un_link " + dir);
  });
}

let message =
    `
_______  Cache  _______

⦿ Cache 0: ` +
    count +
    ` file(s)
⦿ Cache 1: ` +
    count1 +
    ` file(s)
⦿ Cache 2: ` +
    count2 +
    ` file(s)
⦿ Cache 3: ` +
    count3 +
    ` file(s)
_______________________
`;
console.log(message)