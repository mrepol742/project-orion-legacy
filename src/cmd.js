/*
 *
 * Copyright (c) 2022 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Mrepol742-the-License
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require("fs");

function gen() {
    let arr = fs.readFileSync("index.js") + "";

    let commands = arr.match(/testCommand\((.*?)\)/g);

    commands.pop();

    console.log("found " + commands.length + "cmd");

    let count = 0;
    let helpCount = 1;
    let help = {};

    let commandAll = [];

    for (cmd in commands) {
        let query = commands[cmd].replace("testCommand(", "").replace(")", "");
        query = query.replaceAll('"', "").replaceAll("--", " --").split(", ");

        query[2] = query[2];

        let permission = query[4];
        if (["root", "owner", "admin"].includes(permission)) {
            if (help[permission] !== undefined) {
                help[permission].push(query[2]);
            } else {
                help[permission] = [query[2]];
            }
        } else {
            commandAll.push(query[2]);
        }
    }

    help["root"] = help["root"].sort((a, b) => a.localeCompare(b));
    help["owner"] = help["owner"].sort((a, b) => a.localeCompare(b));
    commandAll = commandAll.sort((a, b) => a.localeCompare(b));

    for (cmd in commandAll) {
        count++;
        if (count % 21 == 0) {
            helpCount++;
        } else {
            if (help["help" + helpCount]) {
                help["help" + helpCount].push(commandAll[cmd]);
            } else {
                help["help" + helpCount] = [commandAll[cmd]];
            }
        }
    }

    return JSON.stringify(help, null, 4);
}

function formatGen(gen) {
    let strs = "⋆｡° ^@^C^A>^D^A^@^P^C^AL\n│\n";
    for (a in gen) {
        strs += "│  ⦿ " + gen[a] + "\n";
    }
    strs += "│\n└─ @ỹ@cmd-prj- orion";
    return strs;
}
/*

 let gen1 = JSON.parse(gen());
 console.log(formatGen(gen1["root"]))
*/

module.exports = {
    gen,
    formatGen
}