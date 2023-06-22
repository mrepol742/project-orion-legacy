"use strict"

const index = require("index.js");

function countWords(str) {
    return str.split(" ").filter(function (n) {
            return n != "";
    }).length;
}

module.exports = async function (api, event) {
    if (index.isGoingToFast(api, event)) {
    return;
}
if (event.type == "message") {
    return index.sendMessage(api, event, "You need to reply to a message.");
}
if (event.messageReply.body == "") {
    index.sendMessage(api, event, "You need to reply count to a message.");
} else {
    index.sendMessage(api, event, "The words on this message is about " + countWords(event.messageReply.body) + ".");
}
};