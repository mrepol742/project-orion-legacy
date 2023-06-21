"use strict"

const index = require("index.js");
const utils = require("../redfox/utils.js")

module.exports = async function (api, event) {
    if (index.users.admin.includes(event.senderID)) {
        if (event.type == "message") {
            return index.sendMessage(api, event, "You need to reply to a message.");
        }
        if (event.messageReply.senderID == api.getCurrentUserID()) {
            api.unsendMessage(event.messageReply.messageID, (err) => {
                if (err) utils.logged(err);
            });
        }
    }
}