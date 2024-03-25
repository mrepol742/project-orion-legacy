/*
 *
 * Copyright (c) 2022 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Mrepol742-the-License
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const canvasGif = require("canvas-gif");
const Canvas = require("canvas");
const fs = require("fs");
const utils = require("./utils.js");


function generateWelcomeGif(pictureFile, name, group, member) {
    return new Promise((resolve, reject) => {
        try {
            name = name.normalize("NFKC").replace( /[^a-z0-9\s]/gi, '')
            group = group.normalize("NFKC").replace( /[^a-z0-9\s]/gi, '')

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

                x = width / 2;
                y = height / 3;
                radius = 130;
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

            canvasGif("../assets/welcome/" + (Math.floor(Math.random() * 5) + 1) + ".gif", callBack, options)
                .then((buffer) => {
                    let timesta = utils.getTimestamp();
                    fs.writeFileSync("../cache/welcome_" + timesta + ".gif", buffer);
                    resolve("../cache/welcome_" + timesta + ".gif");
                })
                .catch((error) => {
                    reject(err);
                });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    generateWelcomeGif: generateWelcomeGif
}