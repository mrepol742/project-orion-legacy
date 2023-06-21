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
    sendMessage(api, event, "You need to reply pin add to a message which is not empty to pin it.");
} else {
    index.settings.pin[event.threadID] = event.messageReply.body;
    sendMessage(api, event, 'Message pinned.. Enter "pin" to show it.');
}
};