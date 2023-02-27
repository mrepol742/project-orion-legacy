
/*const fs = require("fs");

//let data = fs.readFileSync(__dirname + "/cache/images/byebye_1677410993.jpg", "utf8");
let data = fs.readFileSync(__dirname + "/cache/images/createimg_1677329405.png", "utf8");
const latinC = /[^a-z0-9]/gi;

console.log(data);
*/
var request = require('request');

request.post(
    'https://toughsleepyapplicationprogram.mrepol853.repl.co/',
    { json: { lang: 'php', code: 'echo \'hello world\';' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);