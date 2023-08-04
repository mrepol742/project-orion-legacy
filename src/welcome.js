const canvasGif = require("canvas-gif");
var Canvas = require("canvas");
const fs = require("fs");
const utils = require("./redfox/utils.js");

let mathSansMap = {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹",
    1: "𝟣",
    2: "𝟤",
    3: "𝟥",
    4: "𝟦",
    5: "𝟧",
    6: "𝟨",
    7: "𝟩",
    8: "𝟪",
    9: "𝟫",
    0: "𝟢",
};


async function generateWelcomeGif(pictureFile, name, group, member) {
 
    if (name.length > 26) {
        name = name.substring(0, 26) + "...";
    }
    if (group.length > 26) {
        group = group.substring(0, 26) + "...";
    }
    name = toMathSans(name);
    group = toMathSans(group);
    member = toMathSans(member);
    const callBack = async (ctx, width, height, totalFrames, currentFrame) => {
        ctx.fillStyle = "#212121";
        ctx.textAlign = "center";
        ctx.font = 'bold 30px "Operator Mono Bold"';
        ctx.fillText(name, width * 0.5, height * 0.7);
        ctx.font = 'bold 21px "Operator Mono Bold"';
        ctx.fillText(group, width * 0.5, height * 0.8);
        ctx.font = 'bold 17px "Operator Mono Bold"';
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
        ctx.drawImage(img1, x - radius, y - radius, radius * 2, radius * 2);
        ctx.restore();
        ctx.stroke();
    };

    let options = {
        coalesce: false,
        delay: 0,
        repeat: 0,
        algorithm: "neuquant",
        optimiser: true,
        fps: 0,
        quality: 70,
    };

    return await canvasGif(__dirname + "/welcome/welcome" + Math.floor(Math.random() * 10) + ".gif", callBack, options)
        .then((buffer) => {
            let timesta = utils.getTimestamp();
            await fs.writeFileSync(returnD() + "/welcome_" + timesta + ".gif" , buffer);
            return returnD() + "/welcome_" + timesta + ".gif";
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

function returnD() {
    return __dirname.replace("src", "cache");
}

function toMathSans(text) {
    if (typeof text === "string") {
        return text
            .split(" ")
            .map(function (a) {
                return a
                    .split("")
                    .map(function (b) {
                        return mathSansMap[b] ? mathSansMap[b] : b;
                    })
                    .join("");
            })
            .join(" ");
    }
    return text;
}

module.exports = {
    generateWelcomeGif
}