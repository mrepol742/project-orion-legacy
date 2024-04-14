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

const chokidar = require('chokidar')
const log = require("./log");

module.exports = () => {
    const watcher = chokidar.watch('./data/cookies');
    log("watching_cookie please add your app state to");
    log("watching_cookie /data/cookies/appstate.bin");
    watcher
    .on('add', (path) => {
        if (path.endsWith(".bin")) {
            return process.exit(0);
        } 
        log("invalid_file_format make sure it ends in .bin");
    })
    .on('error', (error) => {
       log(error);
    })
}