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

let func = {};

const fileNames = [
    'checkCommandPermission',
    'cleanDuplicate',
    'decrypt',
    'encrypt',
    'formatGen',
    'formatOutput',
    'generateCommandList',
    'getContentType',
    'getCPULoad',
    'getGroupProfile',
    'getProjectTotalSize',
    'getTimestamp',
    'getUserProfile',
    'generatePoster',
    'downloadFile',
    'isBlockedSentence',
    'isNumeric',
    'log',
    'removeMarkdown',
    'shuffle',
    'checkUpdate',
    'watchCookiesChanges'
]

fileNames.map(function (v) {
    func[v] = require("./" + v);
});

// uncomment if you want to add hidden command to utils
// mapHiddenCommand();

function mapHiddenCommand() {
    const fileNames = [
    ]
    
    fileNames.map(function (v) {
        func[v] = require("./cmd/" + v);
    });
}

module.exports = func;