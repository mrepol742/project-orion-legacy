/*
 * 
 * This file is part of Project Orion.
 * Copyright (c) 2022 Melvin Jones
 * 
 * Orion is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by 
 * the Free Software Foundation, version 3 of the License
 * 
 * Orion is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Orion. If not, see <https://www.gnu.org/licenses/>.
 * 
 */

const fs = require("fs");
const path = require("path");

let func = {};

fs.readdirSync(__dirname).forEach((fileName) => {
    if (/\.js$/.test(fileName) && fileName != "utils.js") {
        const funcName = fileName.slice(0, -3);
        const filePath = path.join(__dirname, fileName);
        func[funcName] = require(filePath);
    }
});

// uncomment if you want to add hidden command to utils
// mapHiddenCommand();

function mapHiddenCommand() {
    fs.readdirSync(path.join(__dirname, ".cmd")).forEach((fileName) => {
        if (/\.js$/.test(fileName)) {
            const funcName = fileName.slice(0, -3);
            const filePath = path.join(__dirname, fileName);
            func[funcName] = require(filePath);
        }
    });
}

module.exports = func;