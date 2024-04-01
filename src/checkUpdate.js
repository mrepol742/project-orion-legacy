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

const axios = require("axios");
const log = require("./log");
module.exports = async (vr) => {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/mrepol742/project-orion/master/package.json");
        let remoteV = parseFloat(response.data.version);
        if (remoteV > parseFloat(vr)) {
            log("new_update " + response.data.version);
            log("new_update https://github.com/mrepol742/project-orion/");
            log("new_update please update to have all enchancements")
        } else {
            log("latest_update you are already using the latest version");
        }
    } catch (err) {
        log(err);
    }
}