"use strict";

const index = require("index.js");
const fs = require("fs");

module.exports = async function (api, event) {
    if (index.isMyId(event.senderID)) {
        if (event.type == "message") {
            return sendMessage(api, event, "You need to reply to a message.");
        }
    if (event.messageReply.body == "" && event.messageReply.attachments.length == 0) {
        sendMessage(api, event, "You need to reply notify to a message which is not empty to notify it to all group chats.");
    } else {
        sendMessage(api, event, "Message are been schedule to send to " + index.groups.list.length + " groups.");
        let message = event.messageReply.body;
        let time = index.getTimestamp();
        let count = 0;
        let accm = [];

        if (event.messageReply.attachments.length != 0) {
            let format = getFormat(event.messageReply.attachments[0].type);
            for (i55 = 0; i55 < event.messageReply.attachments.length; i55++) {
                await sleep(1000);
                let dir = __dirname + "/cache/notify_" + i55 + "_" + time + format;
                index.downloadFile(encodeURI(event.messageReply.attachments[i55].url), dir);
            }
            let i1;
            for (i1 = 0; i1 < count; i1++) {
                accm.push(fs.createReadStream(__dirname + "/cache/notify_" + i1 + "_" + time + format));
            }
        }
        for (gp in index.groups.active) {
            if (!index.groups.blocked.includes(index.groups.active[gp])) {
                await sleep(5000);
                let body = {
                    body: message,
                };
                if (accm.length > 0) {
                    body["attachment"] = accm;
                }
                api.sendMessage(body, index.groups.active[gp], (err, messageInfo) => {
                    if (err) {
                        index.logged(err);
                        index.groups.active.pop(index.groups.active[gp]);
                        return;
                    }
                    count++;
                });
            }
        }
        sendMessage(api, event, "Message successfully send to " + count + " groups.");
    }
}
};
