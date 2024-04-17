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

module.exports = (data) => { 
    if (typeof data === "string") {
        let d = data.normalize("NFKC").split(" ");
        if (d[0].includes("_")) {
            let db = d[0];
            let db1 = d[1] + "";
            d.shift();
            if (db1.length > 14 && /^\d+$/.test(parseInt(db1))) {
                d.shift();
                console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", "\x1b[40m", db, "\x1b[0m", "\x1b[34m", db1, "\x1b[0m", d.join(" "));
            } else {
                console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", "\x1b[40m", db, "\x1b[0m", d.join(" "));
            }
        } else {
            console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", d.join(" "));
        }
    } else {
        console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", JSON.stringify(data));
    }
}

function getCurrentTime() {
    let options = {
            timeZone: "Asia/Manila",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        },
        formatter = new Intl.DateTimeFormat([], options);
    return formatter.format(new Date());
}