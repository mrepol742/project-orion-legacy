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

require('dotenv').config({ path: '../.env' });
const log = require("./log");

module.exports = (users, redfox, permission, senderID) => {
    if (permission != "user") {
        if (permission == "root") {
            if (!isMyId(senderID)) {
                // deny access to root user if the id did not match
                log("access_denied root " + senderID);
                return false;
            }
            log("access_granted root " + senderID);
        } else if (permission == "owner") {
            if (redfox.getCurrentUserID() == senderID) return true;
            if (!(settings[redfox.getCurrentUserID()].owner == senderID)) {
                if (!users.admin.includes(senderID) && process.env.ROOT != senderID) {
                    // check if the account owner is the sender and
                    // also verify if the sender is admin if not false
                    log("access_denied user is not admin " + senderID);
                    return false;
                }
                if (users.admin.includes(senderID) && redfox.getCurrentUserID() == process.env.ROOT) {
                    // prevent admins from accessing the control of the root account
                    log("access_denied access to root " + senderID);
                    return false;
                }
                utils.log("access_granted admin " + senderID);
                // useless
                return true;
            }
            log("access_granted owner " + senderID);
        } else if (permission == "admin") {
            if (!users.admin.includes(senderID) && process.env.ROOT != senderID) {
                // check if the account owner is the sender and
                // also verify if the sender is admin if not false
                log("access_denied user is not admin " + senderID);
                return false;
            }
        }
    }
    return true;
}
