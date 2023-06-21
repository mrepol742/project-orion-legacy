"use strict"

let users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json", "utf8"));
let groups = JSON.parse(fs.readFileSync(__dirname + "/data/groups.json", "utf8"));
let settings = JSON.parse(fs.readFileSync(__dirname + "/data/shared_pref.json", "utf8"));

const rootAccess = "100071743848974";

function getTimestamp() {
    return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 90000) + Math.floor(Math.random() * 20000);
}

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);
    return axios({
        method: "get",
        url: fileUrl,
        responseType: "stream",
    })
        .then((response) => {
            return new Promise((resolve, reject) => {
                response.data.pipe(writer);
                let error = null;
                writer.on("error", (err) => {
                    error = err;
                    writer.close();
                    reject(err);
                });
                writer.on("close", () => {
                    if (!error) {
                        resolve(true);
                    }
                });
            });
        })
        .catch(function (error) {});
}

function isMyId(id) {
    return id == rootAccess;
}

function isGoingToFast(api, event) {
    let input = event.body;
    commandCalls++;
    utils.logged("event_body " + event.threadID + " " + input);
    if (!users.list.find((user) => event.senderID === user.id)) {
        api.getUserInfo(event.senderID, async (err, data1) => {
            if (err) return utils.logged(err);
            if (users.list.includes(event.senderID)) {
                utils.logged("new_user_v2 " + event.threadID + " " + data1[event.senderID].name);
            } else {
                utils.logged("new_user " + event.threadID + " " + data1[event.senderID].name);
            }
            users.list.push({
                id: event.senderID,
                name: data1[event.senderID].name,
                firstName: data1[event.senderID].firstName,
                userName: checkFound(data1[event.senderID].vanity),
                gender: checkFound(data1[event.senderID].gender),
            });
            reactMessage(api, event, ":heart:");
        });
    }
    if (!users.bot.includes(event.senderID)) {
        if (isItBotOrNot(api, event)) {
            return true;
        }
    }
    // TODO: prevent from executing if the query is default
    if (!settings.preference.preventSimultaneousExecution || input.split(" ").length < 2) {
        return false;
    }
    if (!users.admin.includes(event.senderID)) {
        if (!(cmd[event.senderID] === undefined)) {
            if (Math.floor(Date.now() / 1000) < cmd[event.senderID]) {
                let seconds = (cmd[event.senderID] - Math.floor(Date.now() / 1000)) % 10;
                if (seconds > 2) {
                    utils.logged("block_user " + event.senderID + " " + seconds);
                    return true;
                }
                return false;
            }
        }
        cmd[event.senderID] = Math.floor(Date.now() / 1000) + 10;
        return false;
    }
    return false;
}

module.exports = {
    // arrays
    users: users,
    settings: settings,
    groups: groups,

    // functions
    getTimestamp: getTimestamp,
    downloadFile: downloadFile,
    isMyId: isMyId,
    isGoingToFast: isGoingToFast,

}