"use strict"

const utils = require("../utils.js");

module.exports = function (api) {
    return function wfind(event) {
    if (utils.isGoingToFast(event)) {
    return;
}
if (event.type == "message") {
    return utils.sendMessage(api, event, "You need to reply to a message.");
}
    if (event.messageReply.body == "") {
        utils.sendMessage(api, event, "You need to reply to a message.");
    }
    let input = event.body;
    let query2 = utils.formatQuery(input);
    let query = query2.replace(/\s+/g, "");
    if (query == "wfind") {
       return utils.sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwfind my name");
    }
    if (event.messageReply.body.includes(se)) {
        utils.sendMessage(api, event, 'I found the "' + se + '" on this message ' + (se.split(se).length - 1) + " times.");
    } else {
        utils.sendMessage(api, event, "I cannot found any apperance of your search term on the message.");
    }
}
};