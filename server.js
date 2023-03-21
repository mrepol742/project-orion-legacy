const utils = require("./assets/mj-fca/utils.js");

const fs = require("fs");
const http = require("http");
const https = require("https");

/*
const options2 = {
    key: fs.readFileSync(__dirname + "/assets/client-key.pem"),
    cert: fs.readFileSync(__dirname + "/assets/client-cert.pem"),
};
utils.logged("server_cert loaded");
*/
/*
const server = https.createServer(options2, getRoutes());
*/

const server1 = http.createServer(getRoutes());

let homepage = fs.readFileSync(__dirname + "/assets/index.html");
let errorpage = fs.readFileSync(__dirname + "/assets/404.html");
let threadpage = fs.readFileSync(__dirname + "/assets/thread_ui.html");
let googlev = fs.readFileSync(__dirname + "/assets/google022983bf0cf659ae.html");
let webmanifest = fs.readFileSync(__dirname + "/assets/site.webmanifest");
let servicew = fs.readFileSync(__dirname + "/assets/sw.js");
let herop = fs.readFileSync(__dirname + "/assets/hero.png");
let background = [];

let i23;
for (i23 = 0; i23 < 9; i23++) {
    background.push(fs.readFileSync(__dirname + "/assets/background/background" + i23 + ".jpeg"));
}

utils.logged("web_resource_loaded finish");
/*
server.listen(3002, function () {
    utils.logged("server_info HTTPS at 3002");
    utils.logged("server_status online");
});
*/

function start(port) {
server1.listen(port, function () {
    utils.logged("server_info HTTP at port " + port);
    utils.logged("server_status online");
});
}

function close() {
    server1.close();
}

function getStatus() {
    if (settings.preference.isStop) {
        return "Offline";
    } else if (settings.preference.isDebugEnabled) {
        return "Maintenance";
    }
    return "Online";
}

function getRoutes() {
    return function (req, res) {
        if (!(threadInfo[req.url] === undefined)) {
            let hh = threadpage + "";
            let construct = "";
            construct += "<b>Message Count: </b>" + threadInfo[req.url].messageCount + "<br>";
            construct += "<b>Members Count: </b>" + threadInfo[req.url].membersCount + "<br>";
            construct += "<b>Name</b><br>";
            construct += threadInfo[req.url].members;
            let page = hh.replaceAll("%THREAD_NAME%", threadInfo[req.url].threadName).replaceAll("%THREAD_INFO%", construct).replaceAll("%THREAD_ICON%", threadInfo[req.url].icon);
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(page);
            return;
        }
        switch (req.url) {
            case "/google022983bf0cf659ae.html":
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(googlev);
                break;
            case "/hero.png":
                res.setHeader("Content-Type", "image/png");
                res.writeHead(200);
                res.end(herop);
                break;
            case "/background0.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[0]);
                break;
            case "/background1.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[1]);
                break;
            case "/background2.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[2]);
                break;
            case "/background3.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[3]);
                break;
            case "/background4.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[4]);
                break;
            case "/background5.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[5]);
                break;
            case "/background6.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[6]);
                break;
            case "/background7.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[7]);
                break;
            case "/background8.jpeg":
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(200);
                res.end(background[8]);
                break;
            case "/site.webmanifest":
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(webmanifest);
                break;
            case "/sw.js":
                res.setHeader("Content-Type", "text/javascript");
                res.writeHead(200);
                res.end(servicew);
                break;
            case "/status":
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200);
                res.end(JSON.stringify({ status: getStatus() }));
                break;
            case "/":
            case "/home":
            case "/homepage":
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(homepage);
                break;
            default:
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(errorpage);
                break;
        }
    };
}

module.exports = {
    close,
    start
}