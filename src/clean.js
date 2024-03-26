/*
 * 
 * This file is part of Project Orion.
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

function array(groups) {
    try {

        let ids = [];
        for (a in groups.list) {
            id = groups.list[a].id;
            if (!ids.includes(id)) {
                ids.push(id);
            } else {
                delete groups.list[a];
            }
        }

        return groups;
    } catch (err) {
    }
    return null;
}

module.exports = array;