"use strict"

const index = require("index.js");

module.exports = async function (api, event) {
    if (index.isGoingToFast(api, event)) {
    return;
}
if (event.type == "message") {
    return sendMessage(api, event, "You need to reply to a message.");
}
    if (event.messageReply.body == "") {
        sendMessage(api, event, "You need to reply to a message.");
    }
    let input = event.body;
    let query2 = index.formatQuery(input);
    let query = query2.replace(/\s+/g, "");
    if (query == "wfind") {
       return sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwfind my name");
    }
    if (event.messageReply.body.includes(se)) {
        sendMessage(api, event, 'I found the "' + se + '" on this message ' + (se.split(se).length - 1) + " times.");
    } else {
        sendMessage(api, event, "I cannot found any apperance of your search term on the message.");
    }
};