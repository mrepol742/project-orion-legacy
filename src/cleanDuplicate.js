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

module.exports = (arr, callback) => {
    var resolveFunc = function () { };
    var rejectFunc = function () { };
    var returnPromise = new Promise(function (resolve, reject) {
        resolveFunc = resolve;
        rejectFunc = reject;
    });

    if (!callback) {
        callback = function (err, arr) {
            if (err) return rejectFunc(err);
            resolveFunc(arr);
        };
    }
    try {

        let ids = [];
        for (a in arr.list) {
            id = arr.list[a].id;
            if (!ids.includes(id)) {
                ids.push(id);
            } else {
                delete arr.list[a];
            }
        }
        callback(null, rr);
    } catch (err) {
        callback(err, null);
    }
    return returnPromise;
}