const fs = require("fs");

function gen() {
    let arr = fs.readFileSync("index.js") + "";

    let commands = arr.match(/testCommand\((.*?)\)/g);

    commands.pop();

    console.log("found " + commands.length + "cmd");

    let count = 0;
    let helpCount = 1;
    let help = {};

    for (cmd in commands) {
        let query = commands[cmd].replace("testCommand(", "").replace(")", "");
        query = query.replaceAll('"', "").replaceAll("--", " --").split(", ");

        query[2] = "    " + query[2];

        let permission = query[4];
        if (["root", "owner"].includes(permission)) {
            if (help[permission] !== undefined) {
                help[permission].push(query[2]);
            } else {
            help[permission] = [query[2]];
            }
        } else {
            count++;

            if (count % 21 == 0) {
                helpCount++;

            } else {
                if (help["help" + helpCount] !== undefined) {
                    help["help" + helpCount].push(query[2]);
                } else {
                help["help" + helpCount] = [query[2]];
                }
            }
        }
    }

    return JSON.stringify(help, null, 4);
}

function formatGen(gen) {
    let strs = "usage: command <option>\noperations:\n";
    for (a in gen) {
        strs += gen[a] + "\n";
    }
    return strs;
}

module.exports = {
    gen: gen,
    formatGen: formatGen
};
