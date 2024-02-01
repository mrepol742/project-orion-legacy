/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

const canvasGif = require("canvas-gif");
var Canvas = require("canvas");
const fs = require("fs");
const utils = require("./redfox/utils.js");


async function generateWelcomeGif(pictureFile, name, group, member) {
    name = name.normalize("NFKC");
    group = group.normalize("NFKC");
    
    if (name.length > 26) {
        name = name.substring(0, 26) + "...";
    }
    if (group.length > 26) {
        group = group.substring(0, 26) + "...";
    }
    
    const callBack = async (ctx, width, height, totalFrames, currentFrame) => {
        ctx.fillStyle = "#212121";
        ctx.textAlign = "center";
        ctx.font = 'bold 28px "Operator Mono Bold"';
        ctx.fillText(name, width * 0.5, height * 0.7);
        ctx.font = '18px "Operator Mono"';
        ctx.fillText(group, width * 0.5, height * 0.8);
        ctx.font = '15px "Operator Mono"';
        ctx.fillText(member, width * 0.5, height * 0.9);

        x = width / 2;
        y = height / 3;
        radius = 50;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);

        ctx.strokeStyle = "#212121";
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

    return await canvasGif(__dirname + "/welcome/welcome" + Math.floor(Math.random() * 10) + ".gif", callBack, options)
        .then((buffer) => {
            let timesta = utils.getTimestamp();
            fs.writeFileSync(returnD() + "/welcome_" + timesta + ".gif" , buffer);
            return returnD() + "/welcome_" + timesta + ".gif";
        })
        .catch((error) => {
            return error;
        });
}

function returnD() {
    return __dirname.replace("src", "cache");
}
module.exports = {
    generateWelcomeGif
};