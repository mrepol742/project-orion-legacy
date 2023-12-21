const fs = require("fs");

function gen() {
    let arr = fs.readFileSync("../index.js") + "";

    let commands = arr.match(/testCommand\((.*?)\)/g);

    commands.pop();

    console.log("found " + commands.length + "cmd");

    let count = 0;
    let helpCount = 1;
    let help = {};

    for (cmd in commands) {
        let query = commands[cmd].replace("testCommand(", "").replace(")", "");
        query = query.replaceAll('"', "").replaceAll("--", " --").split(", ");


        let permission = query[3];
        if (["root", "owner"].includes(permission)) {
            if (help[permission] !== undefined) {
                help[permission].push(query[1]);
            } else {
            help[permission] = [query[1]];
            }
        } else {
            count++;

            if (count % 21 == 0) {
                helpCount++;

            } else {
                if (help["help" + helpCount] !== undefined) {
                    help["help" + helpCount].push(query[1]);
                } else {
                help["help" + helpCount] = [query[1]];
                }
            }
        }
    }

    return JSON.stringify(help, null, 4);
}

module.exports = {
    gen: gen,
};
