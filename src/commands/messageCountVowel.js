"use strict"

const index = require("index.js");

function countVowel(str) {
    return str.match(/[aeiou]/gi).length;
}

module.exports = async function (api, event) {
    if (index.isGoingToFast(api, event)) {
    return;
}
if (event.type == "message") {
    return sendMessage(api, event, "You need to reply to a message.");
}
if (event.messageReply.body == "") {
    sendMessage(api, event, "You need to reply count --vowels to a message.");
} else {
    sendMessage(api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
}
};