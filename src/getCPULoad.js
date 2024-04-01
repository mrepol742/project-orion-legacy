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

const os = require("os");

let oldCPUTime = 0;
let oldCPUIdle = 0;

module.exports = () => {
    let cpus = os.cpus();
    let totalTime = -oldCPUTime;
    let totalIdle = -oldCPUIdle;
    let i;
    for (i = 0; i < cpus.length; i++) {
        let cpu = cpus[i];
        for (let type in cpu.times) {
            totalTime += cpu.times[type];
            if (type == "idle") {
                totalIdle += cpu.times[type];
            }
        }
    }
    let load = 100 - Math.round((totalIdle / totalTime) * 100);
    oldCPUTime = totalTime;
    oldCPUIdle = totalIdle;
    return load;
}