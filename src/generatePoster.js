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

const canvasGif = require("canvas-gif");
const Canvas = require("canvas");
const fs = require("fs");
const utils = require("./redfox/utils");

module.exports = (pictureFile, name, group, member) => {
    return new Promise((resolve, reject) => {
        try {
            name = name.normalize("NFKC").replace(/[^a-z0-9\s]/gi, '')
            group = group.normalize("NFKC").replace(/[^a-z0-9\s]/gi, '')

            if (name.length > 26) {
                name = name.substring(0, 26) + "...";
            }
            if (group.length > 26) {
                group = group.substring(0, 26) + "...";
            }

            const callBack = (ctx, width, height, totalFrames, currentFrame) => {
                ctx.fillStyle = "#fff";
                ctx.textAlign = "center";
                ctx.font = 'bold 60px "Operator Mono"';
                ctx.fillText(name, width * 0.5, height * 0.7);
                ctx.font = '28px "Operator Mono"';
                ctx.fillText(group, width * 0.5, height * 0.77);
                ctx.font = '25px "Operator Mono"';
                ctx.fillText(member, width * 0.5, height * 0.82);

                let x = width / 2;
                let y = height / 3;
                let radius = 130;
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);

                ctx.strokeStyle = "#fff";
                ctx.stroke();
                ctx.clip();
                let img = fs.readFileSync(pictureFile);
                let img1 = new Canvas.Image();
                img1.src = img;
                ctx.drawImage(img1, x - radius, y - radius, radius * 3, radius * 3);
                ctx.restore();
                ctx.stroke();
            };

            let options = {
                coalesce: false,
                delay: 0,
                repeat: 0,
                algorithm: "neuquant",
                optimiser: true,
                fps: 40,
                quality: 50,
            };

            canvasGif("./assets/welcome/" + (Math.floor(Math.random() * 5) + 1) + ".gif", callBack, options)
                .then((buffer) => {
                    let timesta = utils.getTimestamp();
                    fs.writeFileSync("./cache/welcome_" + timesta + ".gif", buffer);
                    resolve("./cache/welcome_" + timesta + ".gif");
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}