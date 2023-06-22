"use strict"

const index = require("index.js");

function countConsonants(str) {
    let countConsonants = 0;
    let i;
    for (i = 0; i < str.length; i++) {
        if (str[i] !== "a" && str[i] !== "e" && str[i] !== "i" && str[i] !== "o" && str[i] !== "u" && str[i] !== " ") {
            countConsonants++;
        }
    }
    return countConsonants;
}

module.exports = async function (api, event) {
    if (index.isGoingToFast(api, event)) {
    return;
}
if (event.type == "message") {
    return index.sendMessage(api, event, "You need to reply to a message.");
}
if (event.messageReply.body == "") {
    index.sendMessage(api, event, "You need to reply count --vowels to a message.");
} else {
    index.sendMessage(api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
}
};