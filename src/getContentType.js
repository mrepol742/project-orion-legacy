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

module.exports = (str) => {
    if (str.endsWith(".png")) return "image/png";
    if (str.endsWith(".jpg")) return "image/jpg"
    if (str.endsWith(".jpeg")) return "image/jpeg"
    if (str.endsWith(".mp4")) return "video/mp4";
    if (str.endsWith(".mp3")) return "audio/mpeg";
    throw new "Unknown mimetype " + str;
}
