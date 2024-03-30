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

const fsp = require("fs/promises");
const path = require("path");

module.exports = async (dir) => {
    return await getProjectTotalSize(dir);
}

async function getProjectTotalSize(dir) {
    const files = await fsp.readdir(dir, { withFileTypes: true });

    const paths = files.map(async (file) => {
        const path1 = path.join(dir, file.name);

        if (file.isDirectory()) return await getProjectTotalSize(path1);

        if (file.isFile()) {
            const { size } = await fsp.stat(path1);

            return size;
        }

        return 0;
    });

    return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0);
}