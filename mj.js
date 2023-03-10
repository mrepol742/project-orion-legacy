const fca = require("./assets/mj-fca/");
const utils = require("./assets/mj-fca/utils.js");

utils.logged("project_orion online");

/*
 *
 * Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Project-Orion/blob/master/LICENSE
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { FormData, dns, fs, http, https, os, crypto, WeatherJS, Youtubei, GoogleTTS, google, axios, Configuration, OpenAIApi } = require("./require.js");
const { isMyPrefixList, sup, hey, unsendMessage, idknow, funD, mjme, goodev, goodmo, goodni, goodaf, sqq, days, months, happyEE, sadEE, angryEE, loveEE, sizesM, sendEffects, gcolor, gcolorn, qot1, example } = require("./arrays.js");
const { help, help1, help2, help3, help4, help5, help6, help7, help8, helpadmin, helproot } = require("./cmd.js");

const pictographic = /\p{Extended_Pictographic}/gu;
const latinC = /[^a-z0-9\s]/gi;
const normalize = /[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g;
let threadIdMV = {};
let cmd = {};
let thread = {};
let acGG = [];
let cmd1 = {};
let emo = [];
let userPresence = {};
let threadMaintenance = {};
let threadUnsending = {};
let userWhoSendDamnReports = {};
let nwww = {};
let messagesD = "No data";
let fb_stateD = "No data";
let pingD = "No data";
let gitD = "No data";
let threadInfo = {};
let isCalled = true;
let isAppState = true;
let commandCalls = 0;
let oldCPUTime = 0;
let oldCPUIdle = 0;
let crashes = 0;
let currentID;
let bookID = "";
let blockedUserC = 0;
let blockedGroupC = 0;

let settings = JSON.parse(fs.readFileSync(__dirname + "/data/settings.json", "utf8"));
let users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json", "utf8"));
let msgs = JSON.parse(fs.readFileSync(__dirname + "/data/msgs.json", "utf8"));
let unsend_msgs = JSON.parse(fs.readFileSync(__dirname + "/data/unsend_msgs.json", "utf8"));
let groups = JSON.parse(fs.readFileSync(__dirname + "/data/groups.json", "utf8"));
utils.logged("settings_loaded " + JSON.stringify(settings.preference));
utils.logged("data_loaded_users " + JSON.stringify({users: users.list.length, muted: users.muted.length, bot: users.bot.length, admin: users.admin.length, blocked: users.blocked.length}));
utils.logged("data_loaded_groups " + JSON.stringify({groups: Object.keys(groups.list).length, blocked: groups.blocked.length}));
utils.logged("data_message " + JSON.stringify({messages: Object.keys(msgs).length, unsend_messages: Object.keys(unsend_msgs).length}));

const server = http.createServer(getRoutes());
let homepage = fs.readFileSync(__dirname + "/index.html");
let errorpage = fs.readFileSync(__dirname + "/404.html");
let threadpage = fs.readFileSync(__dirname + "/thread_ui.html");
utils.logged("html_resource " + JSON.stringify({hompage: (homepage ? true : false), errorpage: (errorpage ? true : false), threadpage: (threadpage ? true : false)}));

server.listen(3000, function () {
    utils.logged("server_status online");
    utils.logged("server_port 3000");
});

task(function () {
    for (url in settings.url) {
        let surl = settings.url[url];
        if (surl.startsWith("https://")) {
            https.get(surl, function (res) {
                utils.logged("ping_url " + surl);
            });
        } else if (surl.startsWith("http://")) {
            http.get(surl, function (res) {
                utils.logged("ping_url " + surl);
            });
        } else {
            utils.logged("ping_url_unsupported " + surl);
        }
    }
    pingD = utils.getCurrentTime();
}, Math.floor(1800000 * Math.random() + 1200000));

task(function () {
    gitD = utils.getCurrentTime();
}, Math.floor(1800000 * Math.random() + 1200000));

const config = new Configuration({
    apiKey: settings.apikey.ai,
});
const voice = {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
};
const options = {
    listenEvents: true,
    selfListen: settings.preference.selfListen,
    autoMarkRead: settings.preference.autoMarkRead,
    autoMarkDelivery: settings.preference.autoMarkDelivery,
    online: settings.preference.online,
    forceLogin: true,
};
utils.logged("login_options " + JSON.stringify(options));

const options1 = {
    page: 0,
    safe: true,
    parse_ads: false,
    additional_params: {
        hl: "en",
    },
};

const openai = new OpenAIApi(config);
let listen;

process.on("beforeExit", (code) => {
    utils.logged("process_before_exit " + code);
});

process.on('SIGHUP', function () {
    process.exit();
});
process.on("SIGTERM", function() {
    process.exit();
});
process.on("SIGINT", function () {
    process.exit();
});


fca(loadAppState(settings.key[0], settings.key[1]), (err, api) => {
    if (err) {
        if (err.error) {
            process.exit();
        } else {
            utils.logged(err);
        }
        return;
    }

    process.on("uncaughtException", (err, origin) => {
        caughtException(api, err);
    });

    process.on("unhandledRejection", (reason, promise) => {
        caughtException(api, reason);
    });

    process.on("exit", (code) => {
        let currentDate = new Date();
        settings.uptime.server[currentDate.getDay()] = process.uptime();
        settings.uptime.os[currentDate.getDay()] = os.uptime();
        saveState();
        console.log("\n");
        utils.logged("save_state");
        fs.writeFileSync(__dirname + "/data/" + settings.preference.app_state, getAppState(api), "utf8");
        utils.logged("login_state saved")
        listen.stopListening();
        utils.logged("fca_status offline");
        server.close();
        utils.logged("server_status offline");
        utils.logged("project_orion offline");
        utils.logged("process_exit goodbye :( " + code);
    });

    task(function () {
        saveState();
        messagesD = utils.getCurrentTime();
        utils.logged("save_state");
    }, Math.floor(1800000 * Math.random() + 1200000));

    task(function () {
        utils.logged("clear_list User: " + Object.keys(cmd).length + " Group: " + acGG.length + " Command Call: " + commandCalls + " Blocked Group: " + blockedGroupC + " Blocked User: " + blockedGroupC);
        cmd = {};
        acGG = [];
        commandCalls = 0;
        blockedGroupC = 0;
        blockedUserC = 0;
    }, 60 * 10 * 1000);

    task(function () {
        fs.writeFileSync(__dirname + "/data/" + settings.preference.app_state, getAppState(api), "utf8");
        fb_stateD = utils.getCurrentTime();
        utils.logged("login_state refresh");
    }, Math.floor(1800000 * Math.random() + 1200000));

    task(function () {
        let min = 120000;
        for (time in userPresence) {
            if (userPresence[time] != null) {
                let past = new Date(userPresence[time]).getTime();
                let isPast = new Date().getTime() - past < min ? false : true;
                if (isPast) {
                    userPresence[time] = null;
                    utils.logged("user_presence " + time);
                    api.sendMessage("You seem to be quite busy. When you're ready, feel free to say \"Hi\". I'll be honored to help you. Enjoy your day ahead!", time, (err, messageInfo) => {
                        if (err) utils.logged(err);
                    });
                }
            }
        }
    }, 60 * 2 * 1000);

    api.setOptions(options);

    listen = api.listenMqtt((err, event) => {
        /*
        {
ERR! markAsDelivered   __ar: 1,
ERR! markAsDelivered   error: 3252001,
ERR! markAsDelivered   errorSummary: 'You’re Temporarily Blocked',
ERR! markAsDelivered   errorDescription: {
ERR! markAsDelivered     __html: '<ul class="uiList _4kg _6-h _6-j _6-i"><li>It looks like you were misusing this feature by going too fast. You’ve been temporarily blocked from using it.</li><li>If you think this doesn&#039;t go against our Community Standards <a href="https://www.facebook.com/help/contact/571927962827151?additional_content=AegW_3WWpk6vaBQsq_UBokooWYqyU90582X_iBpY4cQ9gbrKMOsfSn2_OqnVp7kBu89cw9jKMVlGjFV4BB12iX0JY-dJWKiBW-so_QIFaRrdPBGnlZxEBzJAvkG50iAZOjeVhjpnSqqGQ7v72J2QzvK93qELn6wVM2eAsAyQIRj2LOV8VnMpRjVDKJRW3FNhqY7LmiCpTU3oi_4HE4rdis3VB6-XR_l64YG5rradN5mEOxDCIKwwNSSFGmF82GpxFC0HnVug1S84cwh9uO0GQH9wCG-4KIKFAGvvQODU8RBzhveXCJpioMLUG6ZumbaIsTzHCUhinKPhHRXBQosNS54o58ZcV6FRu3euHyXIF802AD8Ymgmu9nbvwVvAiuE5_7VYBiGJIqKbwlGfctshnSNcD_kR7Znc7ShJqrGvVsRNBJmyL-EnjR8rQKNq_V1CCzk" target="_blank">let us know</a>.</li></ul>'
ERR! markAsDelivered   },
ERR! markAsDelivered   blockedAction: true,
ERR! markAsDelivered   payload: null,
ERR! markAsDelivered   hsrp: { hblp: { consistency: [Object], rsrcMap: [Object] } },
ERR! markAsDelivered   allResources: [ 'I4hwzeu' ],
ERR! markAsDelivered   lid: '7202019069067064307'
ERR! markAsDelivered }


{"__ar":1,"error":1404078,"errorSummary":"Your account is restricted right now","errorDescription":{"__html":"<ul class=\"uiList _4kg _6-h _6-j _6-i\"><li>You have been temporarily blocked from performing this action.</li><li>If you think this doesn&#039;t go against our Community Standards <a href=\"https://www.facebook.com/help/contact/571927962827151?additional_content=AegrDpc65tip-1QIx_6NvBnJwxw68KAQA0FPxhYe3RYye68dMxeS9Z8cHTsW9YS6PNBzE5ZgX7ruoo5XRRVz1AVBFaK4OV8kKE-KSWNv_5GgsM0IdteMmWzej_-jBTaotGHKqvuEjC5hgAY-FN-D1n3KXouWDRZupa2BJ0SJShAWmiSgqgyICmm_rJ49z0jIFZDeddu7UKR-7RAvTMq7ylC6o_wKizvXRtS3f2zYhasSWR3yYHJh1FweuvdLXS-GmpV7zVR_hBJID42SCHgRUopdvIbd2WubLX3KKoaPu4R2KaWkIl1Mi9qUM6Z88_gox3B4nR9lbxWLUHKVvBvtI7rTr8OXgZpuDVh4g8Vo4uDRSvU2X8Ja4GYso_XlvflvEOx-uIchYmd-G7s2zV0iWn20q4DU0CMuOgNNMUFyB9XbzYGNmSFXWWJB-Vx4F4hl97y16FDN_HhtwD7RyTHNht86cAZq1-pGWFJ1cXEuRFIYxtBeXaA3SDlmQYdHw8YSqSI\" target=\"_blank\">let us know</a>.</li></ul>"},"blockedAction":true,"payload":null,"hsrp":{"hblp":{"consistency":{"rev":1007018665},"rsrcMap":{"nYb9A+M":{"type":"css","src":"https://static.xx.fbcdn.net/rsrc.php/v3/ya/l/0,cross/COhjAZ2NpZA.css?_nc_x=JVgS5K7shf3&_nc_eui2=AeFFGhWaCzBOOdh6D2GReN5WhzmRzMYB4S6HOZHMxgHhLosieADF-0zOfgjPFKHz9emayTtm1yqBDActXo5_wg3v","nc":1}}}},"allResources":["nYb9A+M"],"lid":"7204786603200059020"}
*/
        if (err) {
            if (err.error) {
                process.exit();
            } else {
                utils.logged(err);
            }
            return;
        }

        if (isAppState) {
            currentID = api.getCurrentUserID();
            fs.writeFileSync(__dirname + "/data/" + settings.preference.app_state, getAppState(api), "utf8");
            utils.logged("login_state refresh");
            isAppState = false;
        }

        if (event.type == "message" || event.type == "message_reply") {
            let body = event.body;
            let result = !!body.match(/^[!@#$%&*~|?/_]/);
            if (!result && (isMyId(event.senderID) || (event.type == "message_reply" && isMyId(event.messageReply.senderID)))) {
                return;
            }
            if (result) {
                event.body = body.slice(1);
            }
        }

        if (event.type == "message" || event.type == "message_reply") {
            let mainInput = event.body;
            for (effects in sendEffects) {
                if (mainInput.endsWith(sendEffects[effects])) {
                    event.body = mainInput.replace(sendEffects[effects], "");
                }
            }

            let input = event.body.toLowerCase();

            if (input == "911") {
                if (isGoingToFast(event)) {
                    return;
                }
                sendMessage(api, event, "Have an emergency? Don't wait call 911!");
                return;
            } else if (input == "same") {
                if (isGoingToFast(event)) {
                    return;
                }
                sendMessage(api, event, "(2)");
                return;
            } else if (input == "k" || input == "y") {
                if (isGoingToFast(event)) {
                    return;
                }
                sendMessage(api, event, "women");
                return;
            } else if (input == "wdym") {
                if (isGoingToFast(event)) {
                    return;
                }
                sendMessage(api, event, "what do you mean?");
                return;
            }
            let query2 = formatQuery(input);
            let query = query2.replace(/\s+/g, "");

            if (event.type == "message" || (event.type == "message_reply" && (event.senderID != currentID || event.messageReply.senderID != currentID))) {
                if (query == "unblockgroup") {
                    if (users.admin.includes(event.senderID)) {
                        if (event.isGroup) {
                            unblockGroup(api, event, event.threadID);
                        } else {
                            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    }
                } else if (query == "unmute") {
                    if (isGoingToFast(event)) {
                        return;
                    }
                    if (users.muted.includes(event.senderID)) {
                        users.muted = users.muted.filter((item) => item !== event.senderID);
                        sendMessage(api, event, "You can now use my commands.");
                        fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                    }
                } else if (query == "status") {
                    if (isGoingToFast(event)) {
                        return;
                    }
                    if (settings.preference.error == "3252001") {
                        // bug this can be initiate if api.markAllAsRead is the reason or attachments
                        sendMessage(api, event, "This account is temporarily blocked right now. Please try it again in few hours.");
                    } else if (settings.preference.error == "1404078") {
                        sendMessage(api, event, "This account is restricted right now. Please try it again in few hours.");
                    } else if (users.muted.includes(event.senderID)) {
                        sendMessage(api, event, "You are muted please enter `unmute` for you to use the bot commands");
                    } else if (groups.blocked.includes(event.threadID)) {
                        sendMessage(api, event, "This group is blocked. Contact the bot admins for more info.");
                    } else if (users.blocked.includes(event.senderID) || users.bot.includes(event.senderID)) {
                        sendMessage(api, event, "You are blocked from using the bot commands. Contact the bot admins for more info.");
                    } else if (settings.preference.isStop) {
                        sendMessage(api, event, "The program is currently offline.");
                    } else if (settings.preference.isDebugEnabled) {
                        sendMessage(api, event, "The program is currently under maintenance.");
                    } else {
                        sendMessage(api, event, "PROJECT ORION ONLINE AND WAITING FOR COMMANDS.");
                    }
                } else if (users.blocked.includes(event.senderID) || users.muted.includes(event.senderID) || users.bot.includes(event.senderID)) {
                    saveEvent(event);
                    return;
                }
            }

            if ((event.type == "message" || event.type == "message_reply" || event.type == "message_unsend") && !users.admin.includes(event.senderID)) {
                if (groups.blocked.includes(event.threadID) && event.type != "message_unsend") {
                    saveEvent(event);
                    return;
                }
            }

            if (isMyId(event.senderID)) {
                if (query == "stop") {
                    sendMessage(api, event, "Program stopped its state.");
                    settings.preference.isStop = true;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    return;
                } else if (query == "destroy") {
                    sendMessage(api, event, "Program destroyed its state.");
                    return;
                } else if (query == "resume") {
                    sendMessage(api, event, "Program resumed its state.");
                    settings.preference.isStop = false;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    return;
                } else if (query == "restart") {
                    saveState();
                    fs.writeFileSync(__dirname + "/data/" + settings.preference.app_state, getAppState(api), "utf8");
                    utils.logged("login_state refresh");
                    let rs = [];
                    rs.push(event.threadID);
                    rs.push(event.messageID);
                    settings.restart = rs;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Restarting program...");
                    setTimeout(function () {
                        process.exit(0);
                    }, 3000);
                }
            }

            if (event.senderID != currentID && event.isGroup) {
                if (thread[event.threadID] === undefined) {
                    let messDD = [];
                    messDD.push(event.senderID);
                    thread[event.threadID] = messDD;
                } else if (thread[event.threadID].length < 3) {
                    thread[event.threadID].push(event.senderID);
                } else {
                    thread[event.threadID].shift();
                    thread[event.threadID].push(event.senderID);
                }
            }

            if (groups.list[event.threadID] === undefined && event.isGroup) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (err) return utils.logged(err);
                    if (gc.isGroup && groups.list[event.threadID] === undefined) {
                        groups.list[event.threadID] = gc.threadName;
                        api.muteThread(event.threadID, -1, (err) => {
                            if (err) utils.logged(err);
                        });
                        api.changeNickname("Edogawa Conan", event.threadID, currentID, (err) => {
                            if (err) return utils.logged(err);
                        });
                        utils.logged("new_group " + event.threadID + " group_name " + gc.threadName);
                        sendMessageOnly(api, event, "Hello guys.");
                        reactMessage(api, event, gc.emoji);
                    }
                });
            } else if (!acGG.includes(event.threadID) && !(groups.list[event.threadID] === undefined)) {
                acGG.push(event.threadID);
            }
        } else if (groups.blocked.includes(event.threadID)) {
            if (event.type == "message" || event.type == "message_reply") {
                saveEvent(event);
                blockedGroupC++;
            }
            return;
        } else if ((users.blocked.includes(event.senderID) || users.muted.includes(event.senderID) || users.bot.includes(event.senderID)) && (event.type == "message" || event.type == "message_reply")) {
            blockedUserC++;
            saveEvent(event);
            return;
        }

        if (settings.preference.isDebugEnabled && !isMyId(event.senderID)) {
            if (event.type == "message" || event.type == "message_reply") {
                let input = event.body;
                let query2 = formatQuery(input);
                let query = query2.replace(/\s+/g, "");
                if (myPrefix(query, query2) && (event.type == "message" || event.type == "message_reply")) {Maintenance
                    if (isGoingToFast1(event, threadMaintenance, 15)) {
                        return;
                    }
                    let message = {
                        body: "Hold on a moment this system is currently under maintenance...I will be right back in few moments.",
                        attachment: fs.createReadStream(__dirname + "/assets/maintenance.jpg"),
                    };
                    sendMessage(api, event, message);
                }
                saveEvent(event);
            }
            return;
        }

        if (settings.preference.isStop && !isMyId(event.senderID)) {
            if (event.type == "message" || event.type == "message_reply") {
                saveEvent(event);
            }
            return;
        }

        if (!(settings.restart[0] === undefined && settings.restart[1] === undefined) && isCalled) {
            api.sendMessage("Successfully restarted", settings.restart[0], settings.restart[1]);
            settings.restart = [];
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            isCalled = false;
        }

        switch (event.type) {
            case "message":
            case "message_reply":
                saveEvent(event);
                ai(api, event);
                break;
            case "message_reaction":
                if (!isMyId(event.userID) && !isMyId(event.senderID) && !emo.includes(event.messageID) && !users.bot.includes(event.senderID) && !users.bot.includes(event.userID) && event.senderID != event.userID && !(event.reaction === undefined)) {
                    emo.push(event.messageID);
                    utils.logged("react_message " + event.threadID + " " + event.messageID + " " + event.reaction);
                    reactMessage(api, event, event.reaction);
                }
                break;
            case "message_unsend":
                let d = msgs[event.messageID];
                if (d === undefined || isMyId(event.senderID)) {
                    break;
                }
                unsend_msgs[event.messageID] = d;
                utils.logged("message_unsend " + d[0]);
                if (!settings.preference.onUnsend || users.bot.includes(event.senderID) || users.admin.includes(event.senderID) || groups.blocked.includes(event.threadID)) {
                    break;
                }

                if (d[0] == "photo") {
                    unsendPhoto(api, event, d);
                } else if (d[0] == "animated_images") {
                    unsendGif(api, event, d);
                } else if (d[0] == "share") {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return utils.logged(err);
                        if (groups.list[event.threadID] === undefined) {
                            let message = {
                                body: "You deleted this link.\n\n" + d[1][2],
                                url: d[1][3],
                            };
                            sendMessageOnly(api, event, message);
                            utils.logged("unsend_share " + d[1][0] + " " + message);
                        } else {
                            let message = {
                                body: data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[1][2],
                                url: d[1][3],
                                /*
                                mentions: [{
                                    tag: '@' + data[event.senderID]['firstName'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }]
                                */
                            };
                            sendMessageOnly(api, event, message);
                            utils.logged("unsend_share_group " + d[1][0] + " " + message);
                        }
                    });
                } else if (d[0] == "file") {
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/files/" + d[1][2] + "_" + time;
                    let file = fs.createWriteStream(filename);
                    let fileurl = d[1][3].replace("https://l.facebook.com/l.php?u=", "");
                    let decodeurl = decodeURIComponent(fileurl);
                    let fileRequest = https.get(decodeurl, function (fileResponse) {
                        fileResponse.pipe(file);
                        file.on("finish", function () {
                            api.getUserInfo(event.senderID, (err, data) => {
                                if (err) return utils.logged(err);
                                if (groups.list[event.threadID] === undefined) {
                                    let constructMMM = "You deleted this file.\n";
                                    if (!(d[1][4] === undefined)) {
                                        constructMMM += d[1][4];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_file " + d[1][0] + " " + filename);
                                } else {
                                    let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                    if (!(d[1][4] === undefined)) {
                                        constructMMM += d[1][4];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                        /*
                                        mentions: [{
                                            tag: '@' + data[event.senderID]['firstName'],
                                            id: event.senderID,
                                            fromIndex: 0
                                        }]
                                        */
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_file_group " + d[1][0] + " " + filename);
                                }
                                unLink(filename);
                            });
                        });
                    });
                } else if (d[0] == "location") {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return utils.logged(err);
                        if (groups.list[event.threadID] === undefined) {
                            let constructMMM = "You deleted this location.\n";
                            let message1 = {
                                body: constructMMM + d[1][2],
                                url: d[1][3],
                            };
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_location " + d[1][0] + " " + d[1][2]);
                        } else {
                            let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                            let message1 = {
                                body: constructMMM + d[1][2],
                                url: d[1][3],
                                /*
                                mentions: [{
                                    tag: '@' + data[event.senderID]['firstName'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                                */
                            };
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_location " + d[1][0] + " " + d[1][2]);
                        }
                    });
                } else if (d[0] == "location_sharing") {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return utils.logged(err);
                        if (groups.list[event.threadID] === undefined) {
                            let constructMMM = "You deleted this live location.\n";
                            let message1 = {
                                body: constructMMM + d[1][2],
                                location: {
                                    latitude: d[1][3],
                                    longitude: d[1][4],
                                    current: true,
                                },
                            };
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_location_sharing " + d[1][0] + " " + d[1][2]);
                        } else {
                            let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                            let message1 = {
                                body: constructMMM + d[1][2],
                                location: {
                                    latitude: d[1][3],
                                    longitude: d[1][4],
                                    current: true,
                                },
                                /*
                                mentions: [{
                                    tag: '@' + data[event.senderID]['firstName'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }],
                                */
                            };
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_location_sharing_group " + d[1][0] + " " + d[1][2]);
                        }
                    });
                } else if (d[0] == "sticker") {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return utils.logged(err);
                        if (groups.list[event.threadID] === undefined) {
                            let constructMMM = "You deleted this sticker.\n";
                            let message = {
                                body: constructMMM,
                            };
                            let message1 = {
                                sticker: d[1][2],
                            };
                            sendMessageOnly(api, event, message);
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_sticker " + d[1][0] + " " + d[1][2]);
                        } else {
                            let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                            let message = {
                                body: constructMMM,
                                /*
                                mentions: [{
                                    tag: '@' + data[event.senderID]['firstName'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }]
                                */
                            };
                            let message1 = {
                                sticker: d[1][2],
                            };
                            sendMessageOnly(api, event, message);
                            sendMessageOnly(api, event, message1);
                            utils.logged("unsend_sticker_group " + d[1][0] + " " + d[1][2]);
                        }
                    });
                } else if (d[0] == "video") {
                    let time1 = getTimestamp();
                    let filename = __dirname + "/cache/videos/unsend_video_" + time1 + ".mp4";
                    let file = fs.createWriteStream(filename);
                    let gifRequest = https.get(d[1][2], function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on("finish", function () {
                            api.getUserInfo(event.senderID, (err, data) => {
                                if (err) return utils.logged(err);
                                if (groups.list[event.threadID] === undefined) {
                                    let constructMMM = "You deleted this video.\n";
                                    if (!(d[1][3] === undefined)) {
                                        constructMMM += d[1][3];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_video " + d[1][0] + " " + filename);
                                } else {
                                    let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                    if (!(d[1][3] === undefined)) {
                                        constructMMM += d[1][3];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                        /*
                                        mentions: [{
                                            tag: '@' + data[event.senderID]['firstName'],
                                            id: event.senderID,
                                            fromIndex: 0
                                        }]
                                        */
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_video_group " + d[1][0] + " " + filename);
                                }
                                unLink(filename);
                            });
                        });
                    });
                } else if (d[0] == "audio") {
                    let time2 = getTimestamp();
                    let filename = __dirname + "/cache/audios/unsend_audio_" + time2 + ".mp3";
                    let file = fs.createWriteStream(filename);
                    let gifRequest = https.get(d[1][2], function (gifResponse) {
                        gifResponse.pipe(file);
                        file.on("finish", function () {
                            api.getUserInfo(event.senderID, (err, data) => {
                                if (err) return utils.logged(err);
                                if (groups.list[event.threadID] === undefined) {
                                    let constructMMM = "You deleted this voice message.\n";
                                    if (!(d[1][3] === undefined)) {
                                        constructMMM += d[1][3];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_audio " + d[1][0] + " " + filename);
                                } else {
                                    let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
                                    if (!(d[1][3] === undefined)) {
                                        constructMMM += d[1][3];
                                    }
                                    let message = {
                                        body: constructMMM,
                                        attachment: fs.createReadStream(filename),
                                        /*
                                        mentions: [{
                                            tag: '@' + data[event.senderID]['firstName'],
                                            id: event.senderID,
                                            fromIndex: 0
                                        }]
                                        */
                                    };
                                    sendMessageOnly(api, event, message);
                                    utils.logged("unsend_audio_group " + d[1][0] + " " + filename);
                                }
                                unLink(filename);
                            });
                        });
                    });
                } else {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return utils.logged(err);
                        if (groups.list[event.threadID] === undefined) {
                            let message = "You deleted this message.\n\n" + d[2];
                            sendMessageOnly(api, event, message);
                            utils.logged("unsend_message " + d[0] + " " + message);
                        } else {
                            let message = {
                                body: data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[2],
                                /*
                                mentions: [{
                                    tag: '@' + data[event.senderID]['firstName'],
                                    id: event.senderID,
                                    fromIndex: 0
                                }]
                                */
                            };
                            sendMessageOnly(api, event, message);
                            utils.logged("unsend_message_group " + d[0] + " " + message);
                        }
                    });
                }
                break;
            case "event":
                utils.logged("event_message " + event.threadID + " " + event.logMessageType);
                switch (event.logMessageType) {
                    default:
                        utils.logged("event_error " + JSON.stringify(event));
                        break;
                    case "log:subscribe":
                        if (event.logMessageData.addedParticipants.length == 1 && event.logMessageData.addedParticipants[0].userFbId == currentID) {
                            break;
                        }
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) return utils.logged(err);
                            if (gc.isGroup) {
                                let gname = gc.threadName;
                                let i = 0;
                                let names = [];
                                while (true) {
                                    if (event.logMessageData.addedParticipants[i] === undefined) {
                                        break;
                                    }
                                    if (event.logMessageData.addedParticipants[i].userFbId != currentID) {
                                        names.push([event.logMessageData.addedParticipants[i].userFbId, event.logMessageData.addedParticipants[i].fullName]);
                                        i++;
                                    }
                                }
                                let gret;
                                if (i > 1) {
                                    gret = "Hello ";
                                    let a;
                                    for (a = 0; a < names.length; a++) {
                                        if (a == names.length - 1) {
                                            gret += "and " + names[a][1] + " ";
                                        } else {
                                            gret += names[a][1] + ", ";
                                        }
                                        utils.logged("new_member_multi " + names[a][0] + " " + names[a][1]);
                                    }
                                    gret += ". How are you all doin?";
                                } else {
                                    gret = "How are you " + names[0][1] + "?";
                                    utils.logged("new_member " + names[0][0] + " " + names[0][1]);
                                }
                                let name = event.logMessageData.addedParticipants[0].fullName;
                                let id = event.logMessageData.addedParticipants[0].userFbId;
                                let arr = gc.participantIDs;
                                welcomeUser(api, event, name, gname, arr.length, id, gret);
                            }
                        });
                        break;
                    case "log:unsubscribe":
                        let id = event.logMessageData.leftParticipantFbId;
                        if (id == currentID) {
                            break;
                        }
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) utils.logged(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) return utils.logged(err);
                                for (let prop in data) {
                                    if (data.hasOwnProperty(prop) && data[prop].name) {
                                        let gcn = gc.threadName;
                                        let arr = gc.participantIDs;
                                        if (settings.preference.antiLeave) {
                                            api.addUserToGroup(prop, event.threadID, (err) => {
                                                if (err) utils.logged(err);
                                                utils.logged("add_user " + event.threadID + " " + prop);
                                            });
                                        }
                                        byebyeUser(api, event, data[prop].name, gcn, arr.length, prop);
                                    }
                                }
                            });
                        });
                        break;
                    case "log:thread-name":
                        api.getUserInfo(event.author, (err, data) => {
                            if (err) return utils.logged(err);
                            let constructMMM;
                            if (groups.list[event.threadID] == null || groups.list[event.threadID] === undefined) {
                                groups.list[event.threadID] = event.logMessageData.name;
                                constructMMM = data[event.author]["firstName"] + " set the group name to " + event.logMessageData.name;
                            } else {
                                constructMMM = data[event.author]["firstName"] + " has changed the groupname from \n" + groups.list[event.threadID] + "\nto\n" + event.logMessageData.name;
                            }
                            let message = {
                                body: constructMMM,
                                /*
                                mentions: [{
                                    tag: '@' + data[event.author]['firstName'],
                                    id: event.author,
                                    fromIndex: 0
                                }]
                                */
                            };
                            sendMessage(api, event, message);
                        });
                        fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
                        break;
                    case "log:thread-icon":
                    case "log:thread-color":
                    case "log:user-nickname":
                        sendMessage(api, event, "Feature comming soon\n\n" + JSON.stringify(event.logMessageData));
                        break;
                }
                break;
        }
    });
});

function wait(ms) {
    return new Promise((resolve) => {
        utils.logged("wait_timeout " + ms);
        setTimeout(resolve, ms);
    });
}

async function ai22(api, event, query, query2) {
    if (query == "notify") {
        if (isMyId(event.senderID)) {
            if (event.messageReply.body == "") {
                sendMessage(api, event, "You need to reply notify to a message which is not empty to notify it to all group chats.");
            } else {
                sendMessage(api, event, "Message are been schedule to send to " + Object.keys(groups.list).length + " groups.");
                sendMessageToAll(api, event);
            }
        }
    } else if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
        if (users.admin.includes(event.senderID)) {
            if (event.messageReply.senderID != currentID) {
                sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
            } else {
                api.unsendMessage(event.messageReply.messageID, (err) => {
                    if (err) utils.logged(err);
                });
            }
        }
    } else if (query == "pinadd") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.messageReply.body == "") {
            sendMessage(api, event, "You need to reply pin add to a message which is not empty to pin it.");
        } else {
            settings.pin[event.threadID] = event.messageReply.body;
            sendMessage(api, event, 'Message pinned.. Enter "pin" to show it.');
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
        }
    } else if (query == "count") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.messageReply.body == "") {
            sendMessage(api, event, "You need to reply count to a message.");
        } else {
            sendMessage(api, event, "The words on this message is about " + countWords(event.messageReply.body) + ".");
        }
    } else if (query == "countvowels") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.messageReply.body == "") {
            sendMessage(api, event, "You need to reply count --vowels to a message.");
        } else {
            sendMessage(api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
        }
    } else if (query == "countconsonants") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.messageReply.body == "") {
            sendMessage(api, event, "You need to reply count --consonants to a message.");
        } else {
            sendMessage(api, event, "The consonants on this message is about " + countConsonants(event.messageReply.body) + ".");
        }
    } else if (query.startsWith("wfind")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwfind my name");
        } else {
            data.shift();
            let se = data.join(" ");
            if (event.messageReply.body == "") {
                sendMessage(api, event, "You need to reply wfind text to a message.");
            } else if (event.messageReply.body.includes(se)) {
                sendMessage(api, event, 'I found the "' + se + '" on this message ' + (se.split(se).length - 1) + " times.");
            } else {
                sendMessage(api, event, "I cannot found any apperance of your search term on the message.");
            }
        }
    } else if (query == "totext") {
        if (isGoingToFast(event)) {
            return;
        }
        if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
            if (event.messageReply.attachments.length < 1 || event.messageReply.attachments[0].type != "audio") {
                sendMessage(api, event, "I cannot see an audio. Please reply totext to an audio.");
            } else {
                let url = event.messageReply.attachments[0].url;
                let dir = __dirname + "/cache/audios/totext_" + getTimestamp() + ".mp3";
                downloadFile(encodeURI(url), dir).then((response) => {
                    transcribeAudioFile(dir)
                        .then((transcription) => {
                            sendMessage(api, event, transcription, event.threadID, event.messageReply.messageID, true, false);
                            unLink(dir);
                        })
                        .catch((error) => {
                            sendMessage(api, event, "Unfortunately an error occured. Please try again later.");
                            unLink(dir);
                        });
                });
            }
        } else {
            sendMessage(api, event, "Hold on... There is still a request in progress.");
        }
    } else if (query2.startsWith("decrypt ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let input = event.body;
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using decrypt key1:key2 instead.\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndecrypt fwegerghergerg:gergergergerg");
        } else {
            data.shift();
            let a = data.join(" ").split(":");
            let body = event.messageReply.body;
            body = body.normalize("NFKC");
            try {
                sendMessage(api, event, decrypt(body, a[0], a[1]));
            } catch (err) {
                sendMessage(api, event, "Invalid Key!");
            }
        }
    } else if (query.startsWith("run")) {
        if (isGoingToFast(event)) {
            return;
        }
        let input = event.body;
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using run language instead.\nCategories:\nJava, Python, C, C++,\nJavaScript, PHP and Dragon" + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nrun python");
        } else {
            data.shift();
            let lang = data.join(" ").toLowerCase();
            let body = event.messageReply.body;
            body = body.normalize("NFKC");
            switch (lang) {
                case "dragon":
                    const form_data = new FormData();
                    form_data.append("Code", body);
                    let res = await axios.post("http://146.56.52.226/runner.php", form_data, {
                        headers: form_data.getHeaders(),
                    });

                    let data = res.data + "";
                    if (data == "") {
                        sendMessage(api, event, "Program died. Execution took too long.");
                    } else {
                        api.sendMessage(
                            data,
                            event.threadID,
                            (err, messageInfo) => {
                                if (err) utils.logged(err);
                            },
                            event.messageReply.messageID
                        );
                    }
                    break;
                case "php":
                case "java":
                case "js":
                case "javascript":
                case "c":
                case "c++":
                case "cpp":
                case "python":
                case "cplusplus":
                case "etc":
                    const form_data1 = new FormData();
                    form_data1.append("Code", body);
                    form_data1.append("Lang", lang);
                    let res1 = await axios.post("https://run.mrepol853.repl.co", form_data1, {
                        headers: form_data1.getHeaders(),
                    });

                    let data1 = res1.data + "";
                    if (data1 == "") {
                        sendMessage(api, event, "Program died. Execution took too long.");
                    } else {
                        if (data1.includes("/home/runner/run/")) {
                            data1 = data1.replaceAll("/home/runner/run/", "");
                        }
                        sendMessage(api, event, removeTags(data1), event.threadID, event.messageReply.messageID, true, false);
                    }
                    break;
                case "sh":
                case "bash":
                    sendMessage(api, event, "Permission Unauthorized.");
                    break;
                default:
                    sendMessage(api, event, lang + " is not yet supported.");
                    break;
            }
        }
    } else if (query == "bgremove") {
        if (isGoingToFast(event)) {
            return;
        }
        if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
            if (event.messageReply.attachments.length < 1) {
                sendMessage(api, event, "I cannot see an image. Please reply bgremove to an image.");
            } else {
                bgRemove(api, event);
            }
        } else {
            sendMessage(api, event, "Hold on... There is still a request in progress.");
        }
    } else if (query == "searchimgreverse") {
        if (isGoingToFast(event)) {
            return;
        }
        if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
            if (event.messageReply.attachments.length < 1 || (event.messageReply.attachments[0].type != "photo" && event.messageReply.attachments[0].type != "animated_image" && event.messageReply.attachments[0].type != "sticker")) {
                sendMessage(api, event, "I cannot see an image. Please reply searchimg --reverse to an image.");
            } else {
                let filename = __dirname + "/cache/images/searchimgreverse_" + getTimestamp() + ".png";
                downloadFile(event.messageReply.attachments[0].url, filename).then((response) => {
                    searchimgr(api, event, filename);
                    unLink(filename);
                });
            }
        } else {
            sendMessage(api, event, "Hold on... There is still a request in progress.");
        }
    } else if (query == "gphoto") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.isGroup) {
            if (event.messageReply.attachments.length < 1) {
                sendMessage(api, event, "I cannot see an image. Please reply gphoto to an image.");
            } else if (event.messageReply.attachments.length > 1) {
                sendMessage(api, event, "Opps! I cannot set this all as group photo. Please select only one image.");
            } else if (event.messageReply.attachments.length === 1 && event.messageReply.attachments[0].type == "photo") {
                const url = event.messageReply.attachments[0].url;
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/gphoto_" + time + ".png";
                downloadFile(url, dir).then((response) => {
                    api.changeGroupImage(fs.createReadStream(filename), event.threadID, (err) => {
                        if (err) return utils.logged(err);
                    });
                    unLink(filename);
                });
            }
        } else {
            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
        }
    }
}

async function ai(api, event) {
    let input = event.body;
    let query2 = formatQuery(input);
    let query = query2.replace(/\s+/g, "");

    if (event.type == "message_reply") {
        ai22(api, event, query, query2);
        if (isMyId(event.messageReply.senderID)) {
            someA(api, event, query, input);
        }
    }
    reaction(api, event, query, input);
    if (nsfw(query)) {
        let message = {
            attachment: fs.createReadStream(__dirname + "/assets/fbi/fbi_" + Math.floor(Math.random() * 4) + ".jpg"),
        };
        sendMessage(api, event, message);
        return;
    }
    if (event.type == "message_reply" && event.messageReply.senderID != currentID) {
        return;
    }
    if (event.type == "message") {
        if (query == "totext") {
            sendMessage(api, event, "You need to reply to a message with an audio.");
        } else if (query == "bgremove" || query == "gphoto" || query == "searchimgreverse") {
            sendMessage(api, event, "You need to reply to a message with a photo.");
        } else if (query.startsWith("run") || query2.startsWith("run ")) {
            sendMessage(api, event, "You need to reply to a message which contains the code to run");
        } else if (query == "count") {
            sendMessage(api, event, "You need to reply to a message to count its words.");
        } else if (query == "countvowels") {
            sendMessage(api, event, "You need to reply to a message to count its vowels.");
        } else if (query == "countconsonants") {
            sendMessage(api, event, "You need to reply to a message to count its consonants.");
        } else if (query.startsWith("wfind")) {
            sendMessage(api, event, "You need to reply to a message to find a word from a message.");
        } else if (query == "pinadd") {
            sendMessage(api, event, "You need to reply to a message to pin a message.");
        } else if (users.admin.includes(event.senderID) && (query == "remove" || query == "unsent" || query == "delete" || query == "unsend")) {
            sendMessage(api, event, "You need to reply to my message to unsend it.");
        }
        someA(api, event, query, input);
    }
    if (query.startsWith("searchimg")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using searchimg text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchimg melvin jones repol");
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift();
                let images = await google.image(data.join(" "), {
                    safe: true,
                });
                getImages(api, event, images);
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("searchincog")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using searchincog text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchincog Who is Melvin Jones Repol");
        } else {
            data.shift();
            getResponseData("https://api.duckduckgo.com/?q=" + data.join(" ") + "&format=json&pretty=1").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    utils.logged(JSON.stringify(response));
                    sendMessage(api, event, response.Abstract);
                }
            });
        }
    } else if (isMyPrefix(input, query, query2)) {
        if (isGoingToFast(event)) {
            return;
        }

        if ((settings.preference.prefix != "" && input == settings.preference.prefix) || query == "misaka" || query == "mj" || query == "repol" || query == "mrepol742" || query == "melvinjonesrepol" || query == "melvinjonesgallanorepol" || query == "melvinjones") {
            if (!users.list.includes(event.senderID)) {
                utils.logged("new_user " + event.senderID);
                users.list.push(event.senderID);
                fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                reactMessage(api, event, ":heart:");
            } 
            sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        } else {
            let text = query2;
            if (query.startsWith("repol")) {
                text = input.substring(6);
            } else if (query.startsWith("mrepol742")) {
                text = input.substring(10);
            } else if (query.startsWith("mj")) {
                text = input.substring(3);
            } else if (query.startsWith("melvinjonesrepol")) {
                text = input.substring(19);
            } else if (query.startsWith("melvinjonesgallanorepol")) {
                text = input.substring(28);
            } else if (query.startsWith("melvinjones")) {
                text = input.substring(13);
            } else if (query.startsWith("search") || query.startsWith("misaka")) {
                text = input.substring(7);
            } else if (input.startsWith(settings.preference.prefix)) {
                text = input.substring(settings.preference.prefix.length);
            }
            let text1 = text.replace(/\s+/g, "");
            let text2 = text;
            if (/^[0-9]+$/.test(text1)) {
                sendMessage(api, event, "What do you want me to do with " + input + "?");
            } else if (!/[a-z0-9]/gi.test(text1)) {
                sendMessage(api, event, "Hmmmmm... Seems like i cannot understand what do you mean by that...");
            } else if (nsfw(text1)) {
                sendMessage(api, event, "Shhhhhhh watch your mouth.");
            } else if (text1.startsWith("whatiswebvium")) {
                sendMessage(api, event, "Webvium is a web browser for android and supported devices. It's fast, lightweight and comes with amazing features consider its app size is so low. It was created from scratch without dependencies, a web browser you haven't seen before.");
            } else if (text1.startsWith("whocreatedwebvium")) {
                sendMessage(api, event, "Melvin Jones Repol created the Project Webvium on Oct of 2018.");
            } else if (text1.startsWith("whoareyou") || text1.startsWith("whatisyourname")) {
                sendMessage(api, event, "I'm Mj.");
            } else if (text1.startsWith("whoisactive")) {
                sendMessage(api, event, "Me");
            } else if (text1.includes("pornsite") || text1.startsWith("whatissex") || text1.startsWith("whatssex") || text1.startsWith("fuckyou") || text1.startsWith("curseyou")) {
                blockUser(api, event, event.senderID);
            } else if (text1 == "sim") {
                sendMessage(api, event, "Me? noooo...");
            } else if (text1 == "callme") {
                let id;
                if (event.type == "message_reply" && event.senderID != currentID) {
                    id = event.messageReply.senderID;
                } else if (event.type == "message") {
                    id = event.senderID;
                }
                api.getUserInfo(id, (err, info) => {
                    if (err) return utils.logged(err);
                    let name = info[id]["firstName"];
                    let message = {
                        body: "Yes " + name + "?",
                        /*
                        mentions: [{
                            tag: '@' + name,
                            id: id,
                            fromIndex: 0
                        }]
                        */
                    };
                    sendMessage(api, event, message);
                });
            } else if (text1 == "whoami" || text1 == "whatsmyname" || text1 == "whoiam" || text1 == "iamcalled" || text1 == "theycallme" || text1 == "iamknownas" || text1 == "mynameis" || text1 == "doyouknowme" || text1 == "whatismyname") {
                let id;
                if (event.type == "message_reply" && event.senderID != currentID) {
                    id = event.messageReply.senderID;
                } else if (event.type == "message") {
                    id = event.senderID;
                }
                api.getUserInfo(id, (err, info) => {
                    if (err) return utils.logged(err);
                    let name = info[id]["firstName"];
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/whoiam_" + time + ".png";
                    downloadFile(encodeURI(getProfilePic(id)), filename).then((response) => {
                        let message = {
                            body: "You're " + name,
                            attachment: fs.createReadStream(filename),
                            /*
                            mentions: [{
                                tag: '@' + name,
                                id: id,
                                fromIndex: 0
                            }]
                            */
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                });
            } else if (text1 == "howitwork" || text1 == "howyoufunction") {
                sendMessage(api, event, "We do this by emulating the browser. This means doing the exact same GET/POST requests and tricking Facebook into thinking we're accessing the website normally.");
            } else if (text1 == "whoownyou") {
                sendMessage(api, event, "Melvin Jones Repol.");
            } else if (text1.startsWith("whomadeyou") || text1.startsWith("whocreatedyou") || text1.startsWith("whoisyourowner") || text1.startsWith("whowroteyou") || text1.startsWith("whoisyourmaker") || text1.startsWith("whobuiltyou") || text1.startsWith("whoprogramyou")) {
                sendMessage(api, event, "Melvin Jones Repol created me.");
            } else if (text1.startsWith("howoldareyou") || text1.startsWith("howyoungareyou") || text1.startsWith("whatisyourage") || text1.startsWith("whatsyourage")) {
                sendMessage(api, event, "I'm 20 years old.");
            } else if (text1.startsWith("whereyoufrom") || text1.startsWith("whereareyoufrom") || text1.startsWith("wheredoyoufrom")) {
                sendMessage(api, event, "Somewhere in the place they called the Philippines.");
            } else if (text1.startsWith("areyouhuman") || text1.startsWith("areyoubot") || text1.startsWith("areyouthebot")) {
                sendMessage(api, event, "Scientifically, Programmatically and Technologically Human.");
            } else if (text1 == "dumb" || text1 == "dick" || text1 == "pussy" || text1 == "fuckyou" || text1 == "damnyou" || text1 == "fyou" || text1 == "fckyou") {
                sendMessage(api, event, "I'm far intelligent than you human(s).");
            } else if (text1 == "bot" || text1 == "ai" || text1 == "robot") {
                sendMessage(api, event, "Who are you to call me that!.");
            } else if (text1.startsWith("areyoumj")) {
                sendMessage(api, event, "Yes i am indeed Mj.");
            } else if (text1 == "thank" || text1 == "thankyou" || text1 == "thanksbro" || text1 == "thanks" || text1.startsWith("ilikeyou")) {
                sendMessage(api, event, "You're welcome.");
            } else if (text1 == "whatareyou") {
                sendMessage(api, event, "A human.");
            } else if (text1 == "wascorrect") {
                sendMessage(api, event, "Yeah i knew it.");
            } else if (text1 == "bye" || text1 == "goodbye") {
                sendMessage(api, event, "bye bye.");
            } else if (text1 == "ok" || text1 == "okay" || text1 == "nice" || text1.startsWith("hmmm")) {
                sendMessage(api, event, "Yeahh..");
            } else if (
                text1 == "time" ||
                text1.startsWith("whatsthetime") ||
                text1.startsWith("whatisthetime") ||
                text1 == "todayis" ||
                text1.startsWith("timetoday") ||
                text1.startsWith("whatsthedatetoday") ||
                text1.startsWith("whatisthedatetoday") ||
                text1.startsWith("whatdatetoday") ||
                text1.startsWith("whatisthetimenow") ||
                text1.startsWith("whatsthetimenow") ||
                text1 == "date" ||
                text1.startsWith("whatsthedate") ||
                text1.startsWith("whatisthedate") ||
                text1.startsWith("datetoday") ||
                text1.startsWith("whattimeisitnow") ||
                text1.startsWith("whatdateisitnow")
            ) {
                sendMessage(api, event, "It's " + getMonth(settings.preference.timezone) + " " + getDayN(settings.preference.timezone) + ", " + getDay(settings.preference.timezone) + " " + formateDate(settings.preference.timezone));
            } else if (text1.startsWith("iloveyou") || text1.startsWith("loveme") || text1.startsWith("doyoulikeme") || text1.startsWith("doyouloveme") || text1.startsWith("whydontyouloveme") || text1.startsWith("imissyou") || text1.startsWith("iwantyou")) {
                sendMessage(api, event, "I've already a girl and i love her so much >3.");
            } else if (text1 == "stop" || text1 == "delete" || text1 == "shutdown" || text1 == "shutup") {
                sendMessage(api, event, "huhhhhhhhhh uh.");
            } else if (text1 == "melvinjonesrepol" || text1 == "mrepol742" || text1 == "melvinjones" || text1 == "melvinjonesgallanorepol" || (text1.startsWith("whois") && isMe(text2))) {
                let message = {
                    body: "Melvin Jones 'Mj' Repol\n\nA self taught Software Engineer with experience in Web Development, SEO, Data Analyst and Computer Troubleshooting.\n\nhttps://mrepol742.github.io",
                    url: "https://mrepol742.github.io",
                };
                sendMessage(api, event, message);
            } else if (text1.startsWith("whois") && (text2.includes("pat") || text1.includes("patrickelcano") || text2.includes("0x3ef8") || text1.includes("jaypatrickcano") || text1.includes("patrickcano"))) {
                let mss = {
                    body: "Jay Patrick Cano is a self-taught front-end developer in the Philippines. He also been involved in many back-end projects in the past. He  been learning these things for the last two years, and it feels like learning more is a part of my life.\n\nhttps://0x3ef8.github.io",
                    url: "https://0x3ef8.github.io",
                };
                sendMessage(api, event, mss);
            } else if (text1 == "help" || /^help[0-9]+$/.test(text1)) {
                sendMessage(api, event, "Do you mean cmd? You can call cmd to open my command list.");
            } else if (text1 == "cmd" || /^cmd[0-9]+$/.test(text1)) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using cmd number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncmd 2");
                //} else if (text1.split('').length < 10) {
                //    sendMessage(api, event, idknow[Math.floor(Math.random() * idknow.length)]);
            } else if (someR(api, event, text1) || (someA(api, event, text1, input) && !query.includes("@"))) {
                return;
            } else if (!query.startsWith("search") && (text.split(" ").length < 2 || text.indexOf(" ") == -1) && !/^[0-9]+$/.test(text1)) {
                if (isGoingToFast1(event, nwww, 1)) {
                    return;
                }
                if (text1.startsWith("what")) {
                    sendMessage(api, event, "what is it?");
                } else if (text1.startsWith("when")) {
                    sendMessage(api, event, "when is the?");
                } else if (text1.startsWith("where")) {
                    sendMessage(api, event, "where is it?");
                } else if (text1.startsWith("how")) {
                    sendMessage(api, event, "how what?");
                } else if (text1.startsWith("which")) {
                    sendMessage(api, event, "which of the?");
                } else if (text1.endsWith("?")) {
                    sendMessage(api, event, text);
                } else {
                    sendMessage(api, event, text + "?");
                }
            } else {
                if (!text.endsWith("?") || !text.endsWith(".") || !text.endsWith("!")) {
                    text += ".";
                }

                // initiate results simulatenoesly
                let ss = await aiResponse(settings.preference.text_complextion, text, true);

                if (query.startsWith("misaka")) {
                    ss += " MISAKA MISAKA says.";
                }

                let message = {
                    body: maven(ss),
                };

                let arraySS = ss.split(/\s+/);

                for (sss in arraySS) {
                    if (
                        arraySS[sss].startsWith("https://") ||
                        arraySS[sss].startsWith("http://") ||
                        arraySS[sss].endsWith(".com") ||
                        arraySS[sss].endsWith(".net") ||
                        arraySS[sss].endsWith(".org") ||
                        arraySS[sss].endsWith(".co") ||
                        arraySS[sss].endsWith(".edu") ||
                        arraySS[sss].endsWith(".gov") ||
                        arraySS[sss].endsWith(".info") ||
                        arraySS[sss].endsWith(".xyz") ||
                        arraySS[sss].endsWith(".me")
                    ) {
                        message = {
                            body: maven(ss),
                            url: arraySS[sss],
                        };
                        break;
                    }
                }

                sendMessage(api, event, message);
            }
        }
    } else if (query.startsWith("chatgpt")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using chatgpt text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nchatgpt what is matter?");
        } else {
            data.shift();
            getResponseData("https://api.amosayomide05.cf/gpt/?question=" + data.join(" ") + "&string_id=unique_id").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "ChatGPT3 is at capacity right now. Please try it again later.");
                } else {
                    sendMessage(false, api, event, response.response);
                }
            });
        }
    } else if (query.startsWith("openai")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using openai text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nopenai what is matter?");
        } else {
            data.shift();
            try {
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: data.join(" "),
                    temperature: 0.7,
                    max_tokens: 256,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                sendMessage(api, event, response.data.choices[0].text);
            } catch (err) {
                sendMessage(api, event, "OpenAI is at capacity right now. Please try it again later.");
            }
        }
    } else if (query.startsWith("createcode")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using createcode text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncreatecode hello world in python");
        } else {
            data.shift();
            try {
                const response = await openai.createCompletion({
                    model: "code-davinci-002",
                    prompt: data.join(" "),
                    max_tokens: 2000,
                });
                sendMessage(api, event, response.data.choices[0].text);
            } catch (error) {
                if (!(error.response === undefined)) {
                    if (error.response.status == 500) {
                        sendMessage(api, event, "Mj is currently down. Please try it again later.");
                    } else if (error.response.status == 429) {
                        sendMessage(api, event, "Mj is at capacity right now. Please try it again later.");
                    } else if (error.response.status == 503) {
                        sendMessage(api, event, "It seems like there are problems with the server. Please try it again later.");
                    } else {
                        sendMessage(api, event, idknow[Math.floor(Math.random() * idknow.length)]);
                    }
                }
            }
        }
    } else if (query.startsWith("createimg")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using createimg text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncreateimg a cat");
        } else {
            data.shift();
            try {
                const response = await openai.createImage({
                    prompt: data.join(" "),
                    n: 1,
                    size: "512x512",
                });
                let url = response.data.data[0].url;
                if (url.startsWith("https://") || url.startsWith("http://")) {
                    let dir = __dirname + "/cache/images/createimg_" + getTimestamp() + ".png";
                    downloadFile(url, dir).then((response) => {
                        let message = {
                            attachment: fs.createReadStream(dir),
                        };
                        sendMessage(api, event, message);
                        unLink(dir);
                    });
                }
                sendMessage(api, event, response.data.choices[0].text);
            } catch (error) {
                if (!(error.response === undefined)) {
                    if (error.response.status == 500) {
                        sendMessage(api, event, "Mj is currently down. Please try it again later.");
                    } else if (error.response.status == 429) {
                        sendMessage(api, event, "Mj is at capacity right now. Please try it again later.");
                    } else if (error.response.status == 503) {
                        sendMessage(api, event, "It seems like there are problems with the server. Please try it again later.");
                    } else {
                        sendMessage(api, event, idknow[Math.floor(Math.random() * idknow.length)]);
                    }
                }
            }
        }
    } else if (query == "clearcache") {
        if (users.admin.includes(event.senderID)) {
            let count = 0;
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            fs.readdir(__dirname + "/cache/audios/", function (err, files) {
                if (err) {
                    return utils.logged(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                        count++;
                        unLink(__dirname + "/cache/audios/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/images/", function (err, files) {
                if (err) {
                    return utils.logged(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                        count1++;
                        unLink(__dirname + "/cache/images/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/videos/", function (err, files) {
                if (err) {
                    return utils.logged(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                        count2++;
                        unLink(__dirname + "/cache/videos/" + file);
                    }
                });
            });
            fs.readdir(__dirname + "/cache/files/", function (err, files) {
                if (err) {
                    return utils.logged(err);
                }
                files.forEach(function (file) {
                    if (!file.endsWith(".gitkeep")) {
                        count3++;
                        unLink(__dirname + "/cache/files/" + file);
                    }
                });
            });
            await wait(1000);
            let message =
                `
_______  Cache  _______

   ⦿ Cache 0: ` +
                count +
                ` file(s)
   ⦿ Cache 1: ` +
                count1 +
                ` file(s)
   ⦿ Cache 2: ` +
                count2 +
                ` file(s)
   ⦿ Cache 3: ` +
                count3 +
                ` file(s)
   ⦿ Cache 4: ` +
                (Object.keys(threadIdMV).length + Object.keys(cmd).length) +
                `
_______________________
`;
            sendMessage(api, event, message);
            threadIdMV = {};
            cmd = {};
        }
    } else if (query == "debugon") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.isDebugEnabled = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Debug mode enabled.");
        }
    } else if (query == "debugoff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.isDebugEnabled = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Konnichiwa i am back.");
        }
    } else if (query == "setautomarkreadon") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.autoMarkRead = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Automatically marked read messages enabled.");
        }
    } else if (query == "setautomarkreadoff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.autoMarkRead = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Automatically marked read messages disabled.");
        }
    } else if (query == "setonlineon") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.online = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Account status is set to Online.");
        }
    } else if (query == "setonlineoff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.online = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Account status is set to Offline.");
        }
    } else if (query == "setselfistenon") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.selfListen = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Listening to own account messages is enabled.");
        }
    } else if (query == "setselfistenoff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.selfListen = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Listening to own account messages is disabled.");
        }
    } else if (query == "setautomarkdeliveryon") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.autoMarkDelivery = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Automatically marked messages when delivered enabled.");
        }
    } else if (query == "setautomarkdeliveryoff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.autoMarkDelivery = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Automatically marked messages when delivered disabled.");
        }
    } else if (query == "ssetsendtypingindicatoron") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.sendTypingIndicator = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Send typing indicator when AI sending messages enabled.");
        }
    } else if (query == "setsendtypingindicatoroff") {
        if (users.admin.includes(event.senderID)) {
            settings.preference.sendTypingIndicator = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Send typing indicator when AI sending messages disabled.");
        }
    } else if (query.startsWith("ttsjap") || query.startsWith("sayjap")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using sayjap text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsayjap I am melvin jones repol");
        } else {
            try {
                data.shift();
                let text = data.join(" ").substring(0, 200) + "...";
                let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(text) + "&lang=ja&engine=g1&rate=0.5&key=9zqZlnIm&gender=female&pitch=0.5&volume=1";
                let time = getTimestamp();
                var file = fs.createWriteStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                var gifRequest = https.get(responses, function (gifResponse) {
                    gifResponse.pipe(file);
                    file.on("finish", function () {
                        var message = {
                            attachment: fs.createReadStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3").on("end", async () => {
                                if (fs.existsSync(__dirname + "/cache/audios/ttsjap_" + time + ".mp3")) {
                                    unLink(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                                }
                            }),
                        };
                        sendMessage(api, event, message);
                    });
                });
            } catch {
                sendMessage(api, event, "Unfortunately an error occured,");
            }
        }
    } else if (query2.startsWith("tts ") || query2.startsWith("say ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using say text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsay I am melvin jones repol");
        } else {
            data.shift();
            let text = data.join(" ").substring(0, 200) + "...";
            const url = GoogleTTS.getAudioUrl(text, voice);
            let time = getTimestamp();
            let filename = __dirname + "/cache/audios/tts_" + time + ".mp3";
            downloadFile(url, filename).then((response) => {
                let message = {
                    attachment: fs.createReadStream(filename),
                };
                sendMessage(api, event, message);
                unLink(filename);
            });
        }
    } else if (query2.startsWith("encrypt ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using encrypt text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nencrypt Hello World");
        } else {
            data.shift();
            const key = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);
            sendMessage(api, event, encrypt(data.join(" "), key, iv) + "\n\nKey1: " + key.toString("hex") + "\nKey2: " + iv.toString("hex"));
        }
    } else if (query == "stats") {
        if (isGoingToFast(event)) {
            return;
        }
        let count = 0;
        let count1 = 0;
        for (msg in msgs) {
            if (msgs[msg][1] == event.senderID) {
                count++;
            }
        }
        for (umsg in unsend_msgs) {
            if (unsend_msgs[umsg][1] == event.senderID) {
                count1++;
            }
        }
        let message =
            `
_______  Statistics  _______

   ⦿ Server Date: ` +
            new Date().toLocaleString() +
            `
   ⦿ Your Messages: ` +
            numberWithCommas(count) +
            `
   ⦿ Your Unsend Messages: ` +
            numberWithCommas(count1) +
            `
   ⦿ Total Messages: ` +
            numberWithCommas(Object.keys(msgs).length) +
            `
   ⦿ Toal Unsend Messages: ` +
            numberWithCommas(Object.keys(unsend_msgs).length) +
            `
   ⦿ Users: ` +
            numberWithCommas(Object.keys(cmd).length) +
            `/` +
            numberWithCommas(users.list.length) +
            `
   ⦿ Groups: ` +
            acGG.length +
            `/` +
            numberWithCommas(Object.keys(groups.list).length) +
            `
   ⦿ Block Users: ` +
            blockedUserC +
            "/" +
            (users.blocked.length + users.bot.length) +
            `
   ⦿ Block Groups: ` +
            blockedGroupC +
            "/" +
            groups.blocked.length +
            `
   ⦿ Command Call: ` +
            commandCalls +
            `
   ⦿ Total Tokens: ` +
            settings.token.total_tokens +
            `
___________________________
`;
        sendMessage(api, event, message);
    } else if (query == "uptime") {
        if (isGoingToFast(event)) {
            return;
        }
        let serverAverage = 0;
        let osAverage = 0;
        for (time in settings.uptime.server) {
            serverAverage += settings.uptime.server[time];
        }
        for (time1 in settings.uptime.os) {
            osAverage += settings.uptime.os[time1];
        }
        serverAverage += process.uptime();
        osAverage += os.uptime();
        let message =
            `
_______  Uptime  _______

   ⦿ Server: ` +
            secondsToTime(process.uptime()) +
            `
   ⦿ Server (Average): ` +
            secondsToTime(serverAverage / 7) +
            `
   ⦿ OS: ` +
            secondsToTime(os.uptime()) +
            `
   ⦿ OS (Average): ` +
            secondsToTime(osAverage / 7) +
            `
_______________________
`;
        sendMessage(api, event, message);
    } else if (query == "sysinfo") {
        if (isGoingToFast(event)) {
            return;
        }
        let avg_load = os.loadavg();
        let rom = process.memoryUsage().rss + process.memoryUsage().heapUsed + process.memoryUsage().external + process.memoryUsage().arrayBuffers;
        let message =
            `
_______  System Info  _______

   ⦿ Server Date: ` +
             new Date().toLocaleString() +
            `
   ⦿ Server Uptime: ` +
            secondsToTime(process.uptime()) +
            `
   ⦿ Server Location: ` +
            getCountryOrigin(os.cpus()[0].model) +
            `
   ⦿ CPU: ` +
            os.cpus()[0].model +
            " x" +
            os.cpus().length +
            `
   ⦿ CPU Usage: ` +
            getLoad() +
            `%
   ⦿ OS: ` +
            os.type() +
            " " +
            os.arch() +
            " v" +
            os.release() +
            `
   ⦿ OS Uptime: ` +
            secondsToTime(os.uptime()) +
            `
   ⦿ RAM: ` +
            convertBytes(os.freemem()) +
            `/` +
            convertBytes(os.totalmem()) +
            `
   ⦿ ROM: ` +
            convertBytes(rom) +
            "/32GB" +
            `
   ⦿ RSS: ` +
            convertBytes(process.memoryUsage().rss) +
            `
   ⦿ Heap: ` +
            convertBytes(process.memoryUsage().heapUsed) +
            `/` +
            convertBytes(process.memoryUsage().heapTotal) +
            `
   ⦿ External: ` +
            convertBytes(process.memoryUsage().external) +
            `
   ⦿ Array Buffers: ` +
            convertBytes(process.memoryUsage().arrayBuffers) +
            `
   ⦿ Average Load: ` +
            Math.floor((avg_load[0] + avg_load[1] + avg_load[2]) / 3) +
            `%
   ⦿ Save State: ` +
            messagesD +
            `
   ⦿ Fb State: ` +
            fb_stateD +
            `
   ⦿ Ping State: ` +
            pingD +
            `
   ⦿ Git State: ` +
            gitD +
            `
   ⦿ Blocked: ` +
            "False" +
            `
   ⦿ Crash: ` +
            crashes +
            ` crash caught
_____________________________
`;
        sendMessage(api, event, message);
    } else if (query.startsWith("dns4")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using dns4 url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndns4 google.com");
        } else {
            data.shift();
            dns.resolve4(data.join(" "), (err, addresses) => {
                if (err) {
                    utils.logged(err);
                    sendMessage(api, event, "Houston! An error occured. Please try it again later.");
                    return;
                }
                sendMessage(api, event, addresses[0]);
            });
        }
    } else if (query.startsWith("dns6")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using dns6 url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndns6 google.com");
        } else {
            data.shift();
            dns.resolve6(data.join(" "), (err, addresses) => {
                if (err) {
                    utils.logged(err);
                    sendMessage(api, event, "Houston! An error occured. Please try it again later.");
                    return;
                }
                sendMessage(api, event, addresses[0]);
            });
        }
    } else if (query.startsWith("ping")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using ping url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nping google.com");
        } else {
            try {
                data.shift();
                let hosts = ["google.com"];

                hosts.forEach(function (host) {
                    ping.promise.probe(host).then(function (res) {
                        console.utils.logged(res);
                    });
                });
            } catch (a) {
                sendMessage(api, event, "Unfortunately an error occured please check your parameters for errors.");
            }
        }
    } else if (query2.startsWith("mean ")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using mean numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmean 4 5 6 3 6 7 3 5");
        } else {
            if (!/^\d+$/.test(query.substring(4))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(5).split(" ").map(Number);
            let total = 0;
            let i;
            for (i = 0; i < arr.length; i++) {
                total += arr[i];
            }
            sendMessage(api, event, "The mean value is " + total / arr.length);
        }
    } else if (query.startsWith("median")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using median numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmedian 4 5 6 3 6 7 3 5");
        } else {
            if (!/^\d+$/.test(query.substring(6))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(7).split(" ").map(Number);
            let length = arr.length;
            arr.sort((a, b) => a - b);
            if (length % 2 === 0) {
                sendMessage(api, event, "The median value is " + (arr[length / 2 - 1] + arr[length / 2]) / 2);
                return;
            }
            sendMessage(api, event, "The median value is " + arr[(length - 1) / 2]);
        }
    } else if (query2.startsWith("mode ")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using mode numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmode 4 5 6 3 6 7 3 5");
        } else {
            if (!/^\d+$/.test(query.substring(4))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(5).split(" ").map(Number);

            const mode = {};
            let max = 0;
            let count = 0;
            let i;
            for (i = 0; i < arr.length; i++) {
                const item = arr[i];
                if (mode[item]) {
                    mode[item]++;
                } else {
                    mode[item] = 1;
                }
                if (count < mode[item]) {
                    max = item;
                    count = mode[item];
                }
            }

            sendMessage(api, event, "The mode value is " + max);
        }
    } else if (query.startsWith("range")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using range numbers instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nrange 4 5 6 3 6 7 3 5");
        } else {
            if (!/^\d+$/.test(query.substring(5))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(6).split(" ").map(Number);
            arr.sort((a, b) => a - b);
            sendMessage(api, event, "The range value is " + [arr[0], arr[arr.length - 1]]);
        }
    } else if (query.startsWith("divisible")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using divisible number number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndivisible 5 8");
        } else {
            if (!/^\d+$/.test(query.substring(9))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let arr = input.substring(10).split(" ").map(Number);
            if (arr[0] % arr[1] == 0) {
                sendMessage(api, event, arr[0] + " is divisible by " + arr[1]);
            } else {
                sendMessage(api, event, arr[0] + " is not divisible by " + arr[1]);
            }
        }
    } else if (query.startsWith("factorial")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using factorial number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfactorial 5");
        } else {
            if (!/^\d+$/.test(query.substring(9))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let num = parseInt(input.substring(10));
            sendMessage(api, event, "The factorial of " + num + " is " + factorial(num));
        }
    } else if (query.startsWith("findgcd")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using findGCD number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfindGCD 5");
        } else {
            if (!/^\d+$/.test(query.substring(7))) {
                sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                return;
            }
            let num = parseInt(input.substring(8));
            sendMessage(api, event, "The GCD of " + num + " is " + findGCD(num));
        }
    } else if (query2.startsWith("roi ")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using roi revenue cost instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nroi 23000 6000");
        } else {
            let revenue = input.split(" ")[1];
            let cost = input.split(" ")[2];
            let calcu = (revenue - cost) / cost;
            sendMessage(api, event, "The return of investment is " + calcu);
        }
    } else if (query.startsWith("problem")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (input.split(" ").length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using problem equation instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nproblem 5*5/9");
        } else {
            let text = input;
            text = text.substring(8);
            if (text.includes("√")) {
                let res;
                try {
                    res = await Math.sqrt(text.replace(/√/gi, ""));
                } catch (err) {
                    res = "You enter an invalid token in the equation. Please try it again.";
                }
                sendMessage(api, event, res + "");
            } else {
                let res;
                try {
                    res = await eval(text);
                } catch (err) {
                    res = "You enter an invalid token in the equation. Please try it again.";
                }
                sendMessage(api, event, res + "");
            }
        }
    } else if (query == "covid") {
        if (isGoingToFast(event)) {
            return;
        }
        const options = {
            method: "GET",
            url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
            headers: {
                "X-RapidAPI-Key": "1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74",
                "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            },
        };
        axios
            .request(options)
            .then(function (data) {
                let message = {
                    body: "⦿ Deaths " + numberWithCommas(data.data.data["deaths"]) + "\n⦿ Confirmed: " + numberWithCommas(data.data.data["confirmed"]) + "\n⦿ Location: " + data.data.data["location"],
                };
                sendMessage(api, event, message);
            })
            .catch(function (error) {
                utils.logged(error);
                sendMessage(api, event, "An unknown error as been occured. Please try again later.");
            });
    } else if (query.startsWith("covid")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using covid country instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncovid Philippines");
        } else {
            data.shift();
            let country = data.join(" ");
            let fixCountry = country.charAt(0).toUpperCase() + country.slice(1);
            const options = {
                method: "GET",
                url: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total",
                params: {
                    country: fixCountry,
                },
                headers: {
                    "X-RapidAPI-Key": "1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74",
                    "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                },
            };
            axios
                .request(options)
                .then(function (data) {
                    if (data.data.message == "OK") {
                        let message = {
                            body: "⦿ Deaths " + numberWithCommas(data.data.data["deaths"]) + "\n⦿ Confirmed: " + numberWithCommas(data.data.data["confirmed"]),
                        };
                        sendMessage(api, event, message);
                    } else {
                        sendMessage(api, event, "Country not found.");
                    }
                })
                .catch(function (error) {
                    utils.logged(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
        }
    } else if (query2.startsWith("nba ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using nba name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnba Stephen Curry");
        } else {
            data.shift();
            let name = data.join(" ");

            const options = {
                method: "GET",
                url: "https://free-nba.p.rapidapi.com/players",
                params: {
                    page: "0",
                    per_page: "1",
                    search: name,
                },
                headers: {
                    "X-RapidAPI-Key": "1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74",
                    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
                },
            };

            axios
                .request(options)
                .then(function (data) {
                    let message =
                        data.data.data[0].first_name +
                        " " +
                        data.data.data[0].last_name +
                        "\n\n" +
                        "⦿ Height: " +
                        data.data.data[0].height_feet +
                        " Feet\n" +
                        "⦿ Position: " +
                        data.data.data[0].position +
                        "\n" +
                        "⦿ Team: " +
                        data.data.data[0].team.full_name +
                        "\n" +
                        "⦿ Division: " +
                        data.data.data[0].team.division +
                        "\n";

                    sendMessage(api, event, message);
                })
                .catch(function (error) {
                    utils.logged(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
        }
    } else if (query.startsWith("urlshort")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            let message = {
                body: "Opps! I didnt get it. You should try using linkshort url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlink https://mrepol742.github.io",
                url: "https://mrepol742.github.io",
            };
            sendMessage(api, event, message);
        } else {
            data.shift();
            let encodedParams = new URLSearchParams();
            encodedParams.append("url", data.join(" "));
            let options = {
                method: "POST",
                url: "https://url-shortener-service.p.rapidapi.com/shorten",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
                    "X-RapidAPI-Key": "1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74",
                },
                data: encodedParams,
            };
            axios
                .request(options)
                .then(function ({ data }) {
                    let message = {
                        body: data.result_url,
                        url: data.result_url,
                    };
                    sendMessage(api, event, message);
                })
                .catch(function (error) {
                    utils.logged(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
        }
    } else if (query.startsWith("phub") || query.startsWith("pornhub")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (true) {
            sendMessage(api, event, "Maintenance");
            return;
        }
        let id;
        if (event.type == "message") {
            id = event.senderID;
        } else {
            if (isMyId(event.messageReply.senderID)) {
                id = event.senderID;
            } else {
                id = event.messageReply.senderID;
            }
        }
        api.getUserInfo(id, (err, info) => {
            if (err) return utils.logged(err);
            let name = info[id]["firstName"];
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using phub text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nphub why i am here again.");
            } else {
                data.shift();
                let phublink = "https://manhict.tech/api/phubcmt?text=" + data.join(" ") + "&uid=" + id + "&name=" + name + "&apikey=" + settings.apikey.manhict;
                parseImage(api, event, phublink, __dirname + "/cache/images/phubmeme_" + getTimestamp() + ".jpg");
            }
        });
    } else if (query.startsWith("videolyric")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using videolyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideolyric In The End by Linkin Park");
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift();
                let vdName = data.join(" ");
                const youtube = await new Youtubei();
                const search = await youtube.search(vdName);
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using videolyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideolyric In The End by Linkin Park");
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function () {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: "mp4",
                        quality: "480p",
                        type: "videoandaudio",
                        bitrate: "2500",
                        audioQuality: "highest",
                        loudnessDB: "20",
                        audioBitrate: "550",
                        fps: "30",
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + "/cache/videos/video_" + time + ".mp4"));

                    stream.on("start", () => {
                        threadIdMV[event.threadID] = false;
                    });
                    stream.on("info", (info) => {
                        threadIdMV[event.threadID] = false;
                        utils.logged("downloading_file " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on("end", () => {
                        let limit = 50 * 1024 * 1024;
                        fs.readFile(__dirname + "/cache/videos/video_" + time + ".mp4", function (err, data) {
                            if (err) utils.logged(err);
                            if (data.length > limit) {
                                utils.logged("upload_error Unable to upload the video to the file limit. The file size is " + data.length / 1024 / 1024);
                                sendMessage(api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + "/cache/videos/video_" + time + ".mp4");
                            } else {
                                getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + vdName).then((response) => {
                                    if (response == null) {
                                        sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                                    } else {
                                        let title = response.result.s_title;
                                        let image = response.result.s_image;
                                        let artist = response.result.s_artist;
                                        let lyrics = response.result.s_lyrics;
                                        let message = {
                                            body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, "").replaceAll("\n\n", "\n"),
                                            attachment: fs.createReadStream(__dirname + "/cache/videos/video_" + time + ".mp4"),
                                        };
                                        sendMessage(api, event, message);
                                    }
                                    threadIdMV[event.threadID] = true;
                                    unLink(__dirname + "/cache/videos/video_" + time + ".mp4");
                                });
                            }
                        });
                    });
                    stream.on("error", (err) => utils.logged(err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("video")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideo In The End by Linkin Park");
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift();
                const youtube = await new Youtubei();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nvideo In The End by Linkin Park");
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function () {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: "mp4",
                        quality: "480p",
                        type: "videoandaudio",
                        bitrate: "2500",
                        audioQuality: "highest",
                        loudnessDB: "20",
                        audioBitrate: "550",
                        fps: "30",
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + "/cache/videos/video_" + time + ".mp4"));

                    stream.on("start", () => {
                        threadIdMV[event.threadID] = false;
                    });
                    stream.on("info", (info) => {
                        threadIdMV[event.threadID] = false;
                        utils.logged("downloading_file " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on("end", () => {
                        let limit = 50 * 1024 * 1024;
                        fs.readFile(__dirname + "/cache/videos/video_" + time + ".mp4", function (err, data) {
                            if (err) utils.logged(err);
                            if (data.length > limit) {
                                utils.logged("upload_error Unable to upload the video to the file limit. The file size is " + data.length / 1024 / 1024);
                                sendMessage(api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                            } else {
                                let message = {
                                    body: search.videos[0].title,
                                    attachment: fs.createReadStream(__dirname + "/cache/videos/video_" + time + ".mp4"),
                                };
                                sendMessage(api, event, message);
                            }
                            threadIdMV[event.threadID] = true;
                            unLink(__dirname + "/cache/videos/video_" + time + ".mp4");
                        });
                    });
                    stream.on("error", (err) => utils.logged(err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("musiclyric")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using musiclyric text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusiclyric In The End by Linkin Park");
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift();
                let vdName = data.join(" ");
                const youtube = await new Youtubei();
                const search = await youtube.search(vdName);
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusiclyric In The End by Linkin Park");
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function () {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: "mp3",
                        bitrate: "2500",
                        audioQuality: "highest",
                        loudnessDB: "20",
                        audioBitrate: "550",
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + "/cache/audios/music_" + time + ".mp3"));

                    stream.on("start", () => {
                        threadIdMV[event.threadID] = false;
                    });
                    stream.on("info", (info) => {
                        threadIdMV[event.threadID] = false;
                        utils.logged("downloading_file " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on("end", () => {
                        let limit = 50 * 1024 * 1024;
                        fs.readFile(__dirname + "/cache/audios/music_" + time + ".mp3", function (err, data) {
                            if (err) utils.logged(err);
                            if (data.length > limit) {
                                utils.logged("upload_error Unable to upload the music to the file limit. The file size is " + data.length / 1024 / 1024);
                                sendMessage(api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + "/cache/audios/music_" + time + ".mp3");
                            } else {
                                getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + vdName).then((response) => {
                                    if (response == null) {
                                        sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                                    } else {
                                        let title = response.result.s_title;
                                        let image = response.result.s_image;
                                        let artist = response.result.s_artist;
                                        let lyrics = response.result.s_lyrics;
                                        let message = {
                                            body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, "").replaceAll("\n\n", "\n"),
                                            attachment: fs.createReadStream(__dirname + "/cache/audios/music_" + time + ".mp3"),
                                        };
                                        sendMessage(api, event, message);
                                    }
                                    threadIdMV[event.threadID] = true;
                                    unLink(__dirname + "/cache/audios/music_" + time + ".mp3");
                                });
                            }
                        });
                    });
                    stream.on("error", (err) => utils.logged(err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("music")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusic In The End by Linkin Park");
        } else {
            if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift();
                const youtube = await new Youtubei();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmusic In The End by Linkin Park");
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function () {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: "mp3",
                        bitrate: "2500",
                        audioQuality: "highest",
                        loudnessDB: "20",
                        audioBitrate: "550",
                    });
                    let time = getTimestamp();

                    stream.pipe(fs.createWriteStream(__dirname + "/cache/audios/music_" + time + ".mp3"));

                    stream.on("start", () => {
                        threadIdMV[event.threadID] = false;
                    });
                    stream.on("info", (info) => {
                        threadIdMV[event.threadID] = false;
                        utils.logged("downloading_file " + info.video_details.title);
                        reactMessage(api, event, ":heart:");
                    });
                    stream.on("end", () => {
                        let limit = 50 * 1024 * 1024;
                        fs.readFile(__dirname + "/cache/audios/music_" + time + ".mp3", function (err, data) {
                            if (err) utils.logged(err);
                            if (data.length > limit) {
                                utils.logged("upload_error Unable to upload the music to the file limit. The file size is " + data.length / 1024 / 1024);
                                sendMessage(api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                            } else {
                                let message = {
                                    body: search.videos[0].title,
                                    attachment: fs.createReadStream(__dirname + "/cache/audios/music_" + time + ".mp3"),
                                };
                                sendMessage(api, event, message);
                            }
                            threadIdMV[event.threadID] = true;
                            unLink(__dirname + "/cache/audios/music_" + time + ".mp3");
                        });
                    });
                    stream.on("error", (err) => utils.logged(err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
            }
        }
    } else if (query.startsWith("lyrics")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using lyrics text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlyrics In The End by Linkin Park");
        } else {
            data.shift();
            let text = data.join(" ");
            getResponseData("https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=" + text).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    let title = response.result.s_title;
                    let image = response.result.s_image;
                    let artist = response.result.s_artist;
                    let lyrics = response.result.s_lyrics;
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/lyrics_" + time + ".png";
                    downloadFile(encodeURI(image), filename).then((response) => {
                        let message = {
                            body: title + " by " + artist + "\n\n" + lyrics.replace(/ *\[[^\]]*] */g, "").replaceAll("\n\n", "\n"),
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (input.startsWith("encodebinary")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using encodeBinary text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nencodeBinary fundamentals in engineering");
        } else {
            data.shift();
            let Input = data.join(" ");
            let output = "";
            let i;
            for (i = 0; i < Input.length; i++) {
                output += Input[i].charCodeAt(0).toString(2) + " ";
            }
            sendMessage(api, event, output);
        }
    } else if (input.startsWith("decodebinary")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using decodeBinary text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndecodeBinary 01100001 01100010 01100011");
        } else {
            data.shift();
            let binary = data.join(" ");
            const binaryString = binary.split(" ");
            let stringOutput = "";
            let i;
            for (i = 0; i < binaryString.length; i++) {
                stringOutput += String.fromCharCode(parseInt(binaryString[i], 2));
            }
            sendMessage(api, event, stringOutput);
        }
    } else if (query.startsWith("encode64")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using encode64 text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nencode64 fundamentals in engineering");
        } else {
            data.shift();
            let buff = Buffer.from(data.join(" "));
            let base64data = buff.toString("base64");
            sendMessage(api, event, base64data);
        }
    } else if (query.startsWith("decode64")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using decode64 text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndecode64 ZnVuZGFtZW50YWxzIGluIGVuZ2luZWVyaW5n");
        } else {
            data.shift();
            let buff = Buffer.from(data.join(" "), "base64");
            let base642text = buff.toString("ascii");
            sendMessage(api, event, base642text);
        }
    } else if (query.startsWith("reverse")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using reverse text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nreverse fundamentals in engineering");
        } else {
            data.shift();
            let splitString = data.join(" ").split("");
            let reverseArray = splitString.reverse();
            let joinArray = reverseArray.join("");
            sendMessage(api, event, joinArray);
        }
    } else if (query == "pinremove") {
        if (isGoingToFast(event)) {
            return;
        }
        settings.pin[event.threadID] = undefined;
        sendMessage(api, event, "Pinned message removed.");
        fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
    } else if (query == "pin") {
        if (isGoingToFast(event)) {
            return;
        }
        if (settings.pin[event.threadID] == undefined) {
            if (event.isGroup) {
                sendMessage(api, event, "There is no pinned message on this group chat.");
            } else {
                sendMessage(api, event, "There is no pinned message on this chat.");
            }
        } else {
            sendMessage(api, event, settings.pin[event.threadID]);
        }
    } else if (query.startsWith("dictionary")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using dictionary text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndictionary computer");
        } else {
            try {
                let response = await google.search(input, options1);
                let dir = __dirname + "/cache/audios/dictionary_" + getTimestamp() + ".mp3";
                let content = response.dictionary.word + " " + response.dictionary.phonetic + "\n\n⦿ Definitions: \n" + response.dictionary.definitions.join("\n") + "\n⦿ Examples: \n" + response.dictionary.examples.join("\n").replaceAll('"', "");
                downloadFile(response.dictionary.audio, dir).then((response) => {
                    let message = {
                        body: content,
                        attachment: fs.createReadStream(dir),
                    };
                    sendMessage(api, event, message);
                    unLink(dir);
                });
            } catch (error) {
                sendMessage(api, event, "Unfortunately, i cannot find any relevant results to your query.");
            }
        }
    } else if (query == "everyone" || query == "all") {
        api.getThreadInfo(event.threadID, (err, info) => {
            if (err) return utils.logged(err);

            const a = "\u200E";
            let message = {
                body: a + "everyone",
                mentions: [],
            };
            let i;
            for (i = 0; i < info.participantIDs.length; i++) {
                message.mentions.push({
                    tag: "everyone",
                    id: info.participantIDs[i],
                });
            }
            sendMessage(api, event, message, event.threadID, event.messageID, true, false);
        });
      /*  const a = "\u200E";
        let message = {
            body: "@everyone",
            mentions: {
                '5819745318103902': '@everyone'
            }
        }
        sendMessage(api, event, message);*/
    } else if (query.startsWith("summarize") || query2.startsWith("summ ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using summ text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsumm this sentence meant to be summarized.");
        } else {
            let ss = await aiResponse(settings.preference.text_complextion, input, true);
            sendMessage(api, event, ss);
        }
    } else if (query.startsWith("baybayin")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using baybayin text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nbaybayin ako ay filipino");
        } else {
            data.shift();
            getResponseData("https://api-baybayin-transliterator.vercel.app/?text=" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    sendMessage(api, event, response.baybay);
                }
            });
        }
    } else if (query.startsWith("doublestruck")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using doublestruck text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndoublestruck Hello World");
        } else {
            data.shift();
            getResponseData("https://api.popcat.xyz/doublestruck?text=" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    sendMessage(api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("translate")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using translate text to language instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntranslate Hello to Tagalog");
        } else {
            try {
                let response = await google.search(input, options1);
                sendMessage(api, event, response.translation.target_text + " (" + response.translation.target_language + ") ");
            } catch (error) {
                sendMessage(api, event, "Unfortunately, i cannot find any relevant results to your query.");
            }
        }
    } else if (query.startsWith("weather")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using weather location instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nweather caloocan city");
        } else {
            data.shift();
            WeatherJS.find(
                {
                    search: data.join(" "),
                    degreeType: "C",
                },
                (err, r) => {
                    if (err) return utils.logged(err);
                    let d = r[0];
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/weather_" + time + ".png";
                    downloadFile(d.current.imageUrl, filename).then((response) => {
                        let m =
                            d.location.name +
                            " " +
                            d.location.lat +
                            " " +
                            d.location.long +
                            "\n\n" +
                            "⦿ Temperature: " +
                            d.current.temperature +
                            "°C / " +
                            ((d.current.temperature * 9) / 5 + 32) +
                            "°F\n" +
                            "⦿ Sky: " +
                            d.current.skytext +
                            "\n" +
                            "⦿ Feelslike: " +
                            d.current.feelslike +
                            "\n" +
                            "⦿ Humidity: " +
                            d.current.humidity +
                            "\n" +
                            "⦿ Wind Speed: " +
                            d.current.winddisplay +
                            "\n" +
                            "\nForecast\n" +
                            "⦿ Mon: " +
                            d.forecast[0].skytextday +
                            "\n" +
                            "⦿ Tue: " +
                            d.forecast[1].skytextday +
                            "\n" +
                            "⦿ Wed: " +
                            d.forecast[2].skytextday +
                            "\n" +
                            "⦿ Thu: " +
                            d.forecast[3].skytextday +
                            "\n" +
                            "⦿ Fri: " +
                            d.forecast[4].skytextday +
                            "\n";
                        let message = {
                            body: m,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            );
        }
    } else if (query.startsWith("facts")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using facts text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfacts computer");
        } else {
            data.shift();
            let url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
            parseImage(api, event, url, __dirname + "/cache/images/facts_" + getTimestamp() + ".png");
        }
    } else if (query == "wyr" || query == "wouldyourather") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/wyr").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, "Would you rather " + response.ops1 + " or " + response.ops2);
            }
        });
    } else if (query == "meowfacts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://meowfacts.herokuapp.com/").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response.data[0]);
            }
        });
    } else if (query == "mathfacts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("http://numbersapi.com/random/math").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response);
            }
        });
    } else if (query == "datefacts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("http://numbersapi.com/random/date").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response);
            }
        });
    } else if (query == "triviafacts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("http://numbersapi.com/random/trivia").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response);
            }
        });
    } else if (query == "yearfacts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("http://numbersapi.com/random/year").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response);
            }
        });
    } else if (query == "8ball") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/8ball").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response.answer);
            }
        });
    } else if (query.startsWith("instagram") || query2.startsWith("ig ")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (true) {
            sendMessage(api, event, "Maintenance");
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ninstagram melvinjonesrepol");
        } else {
            data.shift();
            let userN = data.join(" ");
            if (userN.startsWith("@")) {
                userN = userN.slice(1);
            }
            getResponseData("https://manhict.tech/api/igInfo?query=" + userN + "&apikey=" + settings.apikey.manhict).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately instagram user "' + userN + '" was not found.');
                } else {
                    let username = response.result.username;
                    let fullname = response.result.fullname;
                    let biography = response.result.biography;
                    let reels = new Intl.NumberFormat().format(response.result.reels);
                    let followers = new Intl.NumberFormat().format(response.result.followers);
                    let following = new Intl.NumberFormat().format(response.result.following);
                    let private = response.result.private ? "Yes" : "No";
                    let verified = response.result.verified ? "Yes" : "No";
                    let profilepic = response.result.profilePicture;
                    let time = getTimestamp();

                    let dir = __dirname + "/cache/images/instaprofile_" + time + ".png";
                    downloadFile(encodeURI(url), dir).then((response) => {
                        let message = {
                            body: fullname + " @" + username + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified + "\n\n" + biography,
                            attachment: fs.createReadStream(dir),
                        };
                        sendMessage(api, event, message);
                        unLink(dir);
                    });
                }
            });
        }
    } else if (query.startsWith("profilepic")) {
        if (isGoingToFast(event)) {
            return;
        }
        let id;
        if (event.type == "message_reply" && event.senderID != currentID) {
            id = event.messageReply.senderID;
        } else {
            id = event.senderID;
        }
        parseImage(api, event, getProfilePic(id), __dirname + "/cache/images/profilepic_" + getTimestamp() + ".png");
    } else if (query.startsWith("tiktok")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (true) {
            sendMessage(api, event, "Maintenance");
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using tiktok username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntiktok mrepol742");
        } else {
            data.shift();
            let userN = data.join(" ");
            getResponseData("https://manhict.tech/api/tikInfo?query=" + userN + "&apikey=" + settings.apikey.manhict).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately tiktok user "' + userN + '" was not found.');
                } else {
                    let username = response.result.uniqueId;
                    let name = response.result.nickname;
                    let bio = response.result.signature;
                    let followers = response.result.followerCount;
                    let following = response.result.followingCount;
                    let heart = response.result.heartCount;
                    let video = response.result.videoCount;
                    let digg = response.result.diggCount;
                    let avatar = response.result.avatar;
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/tiktok_avatar_" + time + ".png";
                    downloadFile(encodeURI(avatar), filename).then((response) => {
                        let message = {
                            body: name + " @" + username + "\n⦿ Hearts: " + heart + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Videos: " + video + "\n⦿ Digg: " + digg + "\n\n" + bio,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("soundcloud")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (true) {
            sendMessage(api, event, "Maintenance");
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using soundcloud username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsoundcloud Denvau");
        } else {
            data.shift();
            let userN = data.join(" ");
            getResponseData("https://manhict.tech/api/scInfo?query=" + encodeURI(userN) + "&apikey=" + settings.apikey.manhict).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately soundcloud user "' + userN + '" was not found.');
                } else {
                    let name = response.result["full_name"];
                    let username = response.result["username"];
                    let bio = response.result["description"];
                    let location = response.result["city"] + " " + response.result["country_code"];
                    let followers = response.result["followers_count"];
                    let following = response.result["followings_count"];
                    let likes = response.result["likes_count"];
                    let playlist = response.result["playlist_count"];
                    let playlistLikes = response.result["playlist_likes_count"];
                    let trackCount = response.result["track_count"];
                    let permalinkUrl = response.result["permalink_url"];
                    let avatar = response.result["avatar_url"];
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/soundcloud_avatar_" + time + ".png";
                    downloadFile(encodeURI(avatar), filename).then((response) => {
                        let message = {
                            body:
                                name +
                                " @" +
                                username +
                                "\n⦿ Location: " +
                                location +
                                "\n⦿ Likes: " +
                                likes +
                                "\n⦿ Playlist: " +
                                playlist +
                                "\n⦿ Playlist Likes: " +
                                playlistLikes +
                                "\n⦿ Tracks: " +
                                trackCount +
                                "\n⦿ Followers: " +
                                followers +
                                "\n⦿ Following: " +
                                following +
                                "\n\n" +
                                bio +
                                "\n" +
                                permalinkUrl,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("github")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using github username instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngithub mrepol742");
        } else {
            data.shift();
            let userN = data.join(" ");
            if (userN.startsWith("@")) {
                userN = userN.slice(1);
            }
            getResponseData("https://api.github.com/users/" + userN).then((response) => {
                if (response == null || response.message == "Not Found") {
                    sendMessage(api, event, 'Unfortunately github user "' + userN + '" was not found.');
                } else {
                    let name = response.name;
                    let email = response.email;
                    let bio = response.bio;
                    let company = response.company;
                    let location = response.location;
                    let url = response.blog;
                    let followers = response.followers;
                    let following = response.following;
                    let public_repos = response.public_repos;
                    let public_gists = response.public_gists;
                    let avatar = response.avatar_url;
                    let time = getTimestamp();

                    if (bio == "No Bio") {
                        bio = "";
                    }

                    let filename = __dirname + "/cache/images/github_avatar_" + time + ".png";
                    downloadFile(encodeURI(avatar), filename).then((response) => {
                        let message = {
                            body:
                                "⦿ Name: " +
                                name +
                                "\n⦿ Email: " +
                                email +
                                "\n⦿ Location: " +
                                location +
                                "\n⦿ Company: " +
                                company +
                                "\n⦿ Website: " +
                                url +
                                "\n⦿ Followers: " +
                                followers +
                                "\n⦿ Following: " +
                                following +
                                "\n⦿ Public Repository: " +
                                public_repos +
                                "\n⦿ Public Gists: " +
                                public_gists +
                                "\n\n" +
                                bio +
                                "\nhttps://github.com/" +
                                userN,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("element")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using element name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nelement hydrogen");
        } else {
            data.shift();
            let symbol = data.join(" ");
            getResponseData("https://api.popcat.xyz/periodic-table?element=" + symbol).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately element "' + symbol + '" was not found.');
                } else {
                    let name = response.name;
                    let symbol = response.symbol;
                    let atomic_number = response.atomic_number;
                    let atomic_mass = response.atomic_mass;
                    let period = response.period;
                    let phase = response.phase;
                    let discovered_by = response.discovered_by;
                    let image = response.image;
                    let summary = response.summary;
                    let time = getTimestamp();

                    let filename = __dirname + "/cache/images/element_" + time + ".png";
                    downloadFile(encodeURI(image), filename).then((response) => {
                        let message = {
                            body: "⦿ Name: " + name + "\n⦿ Symbol: " + symbol + "\n⦿ Atomic Number: " + atomic_number + "\n⦿ Atomic Mass: " + atomic_mass + "\n⦿ Peroid: " + period + "\n⦿ Phase: " + phase + "\n⦿ Discovered by: " + discovered_by + "\n\n" + summary,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("npm")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using npm name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnpm mrepol742");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://api.popcat.xyz/npm?q=" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately npm "' + name + '" was not found.');
                } else {
                    let name = response.name;
                    let version = response.version;
                    let description = response.description;
                    let author = response.author;
                    let last_published = response.last_published;
                    let downloads_this_year = response.downloads_this_year;
                    let repository = response.repository;
                    let author_email = response.author_email;
                    let message = {
                        body: "⦿ Name: " + name + " v" + version + "\n⦿ Author: " + author + "\n⦿ Email: " + author_email + "\n⦿ Updated on: " + last_published + "\n⦿ Repository: " + repository + "\n\n" + description,
                    };
                    if (repository != "None") {
                        message["url"] = repository;
                    }
                    sendMessage(api, event, message);
                }
            });
        }
    } else if (query.startsWith("steam")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using steam name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsteam minecraft");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://api.popcat.xyz/steam?q=" + name).then((response) => {
                if (response == null) {
                    utils.logged(JSON.stringify(response));
                    sendMessage(api, event, 'Unfortunately the "' + name + '" was not found on steam.');
                } else {
                    let name = response.name;
                    let developers = response.developers;
                    let website = response.website;
                    let description = response.description;
                    let banner = response.banner;
                    let price = response.price;
                    let time = getTimestamp();

                    let filename = __dirname + "/cache/images/steam_" + time + ".png";
                    downloadFile(encodeURI(banner), filename).then((response) => {
                        let message = {
                            body: "⦿ Name: " + name + "\n⦿ Price: " + price + "\n⦿ Developers: " + developers + "\n⦿ Website: " + website + "\n\n" + description,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("imdb")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using imdb name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nimdb iron man");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://api.popcat.xyz/imdb?q=" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately imdb "' + name + '" was not found.');
                } else {
                    let title = response.title;
                    let year = response.year;
                    let runtime = response.runtime;
                    let actors = response.actors;
                    let poster = response.poster;
                    let genres = response.genres;
                    let plot = response.plot;
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/imdb_" + time + ".png";
                    downloadFile(encodeURI(poster), filename).then((response) => {
                        let message = {
                            body: "⦿ Title: " + title + " " + year + "\n⦿ Genres: " + genres + "\n⦿ Runtime: " + runtime + "\n⦿ Actors: " + actors + "\n\n" + plot,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("itunes")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using itunes title instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nitunes in the end");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://api.popcat.xyz/itunes?q=" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately the "' + name + '" was not found in itunes music.');
                } else {
                    let name = response.name;
                    let artist = response.artist;
                    let album = response.album;
                    let genre = response.genre;
                    let length = response.length.replace("s", "");
                    let lenghtM = (Math.round((length / 60) * 100) / 100).toFixed(2);
                    let thumbnail = response.thumbnail;
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/itunes_" + time + ".png";
                    downloadFile(encodeURI(thumbnail), filename).then((response) => {
                        let message = {
                            body: "⦿ Name: " + name + " by " + artist + "\n⦿ Album: " + album + "\n⦿ Genre: " + genre + "\n⦿ Length: " + lenghtM + " minutes",
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query == "car") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/car").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately car run away.");
            } else {
                let image = response.image;
                let title = response.title;
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/car_" + time + ".png";
                downloadFile(encodeURI(thumbnail), filename).then((response) => {
                    let message = {
                        body: title,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query == "color") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/randomcolor").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately color fades away.");
            } else {
                let hex = response.hex;
                let name = response.name;
                let url = response.image;
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/color_" + time + ".png";
                downloadFile(encodeURI(url), filename).then((response) => {
                    let message = {
                        body: name + " #" + hex,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query == "pickup") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/pickuplines").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately i forgot the line.");
            } else {
                sendMessage(api, event, response.pickupline);
            }
        });
    } else if (query == "fbi") {
        let message = {
            attachment: fs.createReadStream(__dirname + "/assets/fbi/fbi_" + Math.floor(Math.random() * 4) + ".jpg"),
        };
        sendMessage(api, event, message);
    } else if (query.startsWith("gemoji")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using gemoji emoji instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngemoji 😂");
        } else {
            data.shift();
            if (!pictographic.test(data.join(" "))) {
                sendMessage(api, event, "Unable to set the chat quick reaction. Invalid emoji.");
            }
            api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                if (err) return utils.logged(err);
            });
        }
    } else if (query.startsWith("sendreport")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (isGoingToFast1(event, userWhoSendDamnReports, 30)) {
            sendMessage(api, event, "Please wait a while. Before sending another report.");
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using sendReport text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsendReport There is a problem in ______ that cause ______.");
        } else {
            data.shift();
            let report = "report " + event.senderID + " " + data.join(" ");
            utils.logged(report);
            api.sendMessage(report, currentID, (err, messageInfo) => {
                if (err) utils.logged(err);
            });
            sendMessage(api, event, "The engineers have been notified.");
        }
    } else if (query.startsWith("acceptmessagerequest")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using acceptmessagerequest [threadid] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nacceptmessagerequest 0000000000000");
            } else {
                data.shift();
                let num = data.join(" ");
                api.handleMessageRequest(data.join(" "), true, (err) => {
                    if (err) utils.logged(err);
                });
                sendMessage(api, event, "Message Request Accepted!");
            }
        }
    } else if (query.startsWith("changebio")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using changebio [text] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nchangebio Hello There");
            } else {
                data.shift();
                let num = data.join(" ");
                api.changeBio(data.join(" "), true, (err) => {
                    if (err) utils.logged(err);
                });
                sendMessage(api, event, "Bio Message is now set to `" + data.join(" ") + "`");
            }
        }
    } else if (query.startsWith("acceptfriendrequest")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using acceptfriendrequest [uid] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nacceptfriendrequest 0000000000000");
            } else {
                data.shift();
                let num = data.join(" ");
                api.handleFriendRequest(data.join(" "), true, (err) => {
                    if (err) utils.logged(err);
                });
                sendMessage(api, event, "Friend Request Accepted!");
            }
        }
    } else if (query.startsWith("setmaxtokens")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setMaxTokens [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetMaxTokens 1000.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 4000) {
                    sendMessage(api, event, "Opps! the limit is 4000.");
                } else if (num < 10) {
                    sendMessage(api, event, "Opps! the minimum value 10");
                } else {
                    settings.preference.max_tokens = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Max Tokens is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settemperature")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setTemperature [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetTemperature 0.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 1) {
                    sendMessage(api, event, "Opps! the limit is 1.");
                } else if (num < -0) {
                    sendMessage(api, event, "Opps! the minimum value 0.1");
                } else {
                    settings.preference.temperature = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Temperature is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setfrequencypenalty")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setFrequencyPenalty [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetFrequencyPenalty 1.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 2) {
                    sendMessage(api, event, "Opps! the limit is 2.");
                } else if (num < -2) {
                    sendMessage(api, event, "Opps! the minimum value -2");
                } else {
                    settings.preference.frequency_penalty = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Frequency Penalty is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setpresencepenalty")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setPresencePenalty [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetPresencePenalty 1.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 2) {
                    sendMessage(api, event, "Opps! the limit is 2.");
                } else if (num < -2) {
                    sendMessage(api, event, "Opps! the minimum value -2");
                } else {
                    settings.preference.presence_penalty = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Presence Penalty is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settextcomplextion")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it.");
            } else {
                data.shift();
                let num = data.join(" ");
                settings.preference.text_complextion = num;
                fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                sendMessage(api, event, "Text Complextion is now set to " + num);
            }
        }
    } else if (query.startsWith("setmaximage")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 25) {
                    sendMessage(api, event, "Opps! the limit is 25.");
                } else if (num < 1) {
                    sendMessage(api, event, "Opps! the minimum value is 1.");
                } else {
                    settings.preference.max_image = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Max Image is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("setprobabilitymass")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setProbabilityMass [integer] instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetProbabilityMass 0.1.");
            } else {
                data.shift();
                let num = data.join(" ");
                if (num > 1) {
                    sendMessage(api, event, "Opps! the limit is 1.");
                } else if (num < -0) {
                    sendMessage(api, event, "Opps! the minimum value is 0.");
                } else {
                    settings.preference.probability_mass = num;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Probability Mass is now set to " + num);
                }
            }
        }
    } else if (query.startsWith("settimezone")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setTimezone timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetTimezone Asia/Manila");
            } else {
                data.shift();
                let pref = data.join(" ");
                if (isValidTimeZone(pref)) {
                    settings.preference.timezone = pref;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Timezone is now set to " + pref);
                    sendMessage(api, event, "It's " + getMonth(settings.preference.timezone) + " " + getDayN(settings.preference.timezone) + ", " + getDay(settings.preference.timezone) + " " + formateDate(settings.preference.timezone));
                } else {
                    sendMessage(api, event, "Timezone " + pref + " is invalid. Please input valid timezones.");
                }
            }
        }
    } else if (query.startsWith("setprefix")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setPrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetPrefix $");
            } else {
                data.shift();
                let pref = data.join(" ");
                let first = pref.split("");
                if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(first)) {
                    settings.preference.prefix = pref;
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "Prefix is now set to " + pref);
                } else {
                    sendMessage(api, event, "Unable to set prefix to " + first + " due to some reasons. Please use only symbols such as ! @ # $ etc..");
                }
            }
        }
    } else if (query == "remprefix") {
        if (users.admin.includes(event.senderID)) {
            if (settings.preference.prefix != "null" || settings.preference.prefix != undefined) {
                settings.preference.prefix = "null";
                fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                sendMessage(api, event, "Prefix reset to default values.");
            }
        }
    } else if (query.startsWith("ignoreprefix")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ignorePrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nignorePrefix alexa");
            } else {
                let pre = data.shift();
                let pre2 = formatQuery(pre.replace(/\s+/g, ""));
                if (pre2.startsWith("mj") || pre2.startsWith("melvinjones") || pre2.startsWith("melvinjonesgallanorepol") || pre2.startsWith("repol") || pre2.startsWith("melvinjonesrepol") || pre2.startsWith("mrepol742") || pre.startsWith(settings.preference.prefix)) {
                    sendMessage(api, event, "Unable to do such an action.");
                } else if (!settings.ignored_prefixes.includes(pre)) {
                    settings.ignored_prefixes.push(pre);
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "`" + pre + "` is now ignored.");
                } else {
                    sendMessage(api, event, "It's already ignored.");
                }
            }
        }
    } else if (query.startsWith("unignoredprefix")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using unignorePrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nunignorePrefix alexa");
            } else {
                let pre = data.shift();
                if (settings.ignored_prefixes.includes(pre)) {
                    settings.ignored_prefixes = settings.ignored_prefixes.filter((item) => item !== pre);
                    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                    sendMessage(api, event, "`" + pre + "` is now unignored.");
                } else {
                    sendMessage(api, event, "It is not in ignored list.");
                }
            }
        }
    } else if (query.startsWith("addping")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using addPing url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddPing https://google.com");
            } else {
                data.shift();
                settings.url.push(data.join(" "));
                sendMessage(api, event, "Noted.");
                fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            }
        }
    } else if (query.startsWith("remping")) {
        if (isMyId(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using remPing url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nremPing https://google.com");
            } else {
                data.shift();
                let url = data.join(" ");
                if (settings.url.includes(url)) {
                    settings.url.pop(url);
                    sendMessage(api, event, "The url has been removed from the list.");
                } else {
                    sendMessage(api, event, "The url is not on the list.");
                }
                fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            }
        }
    } else if (query.startsWith("adduser")) {
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
        } else {
            data.shift();
            let pref = data.join(" ");
            if (pref.split("").length >= 15) {
                if (/^\d+$/.test(pref)) {
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return utils.logged(err);
                        if (gc.isGroup) {
                            if (!JSON.stringify(gc.adminIDs).includes(currentID) && gc.approvalMode) {
                                sendMessage("The user " + pref + " has been added and its on member approval lists.");
                            }
                            api.addUserToGroup(pref, event.threadID, (err) => {
                                if (err) utils.logged(err);
                                utils.logged("add_user " + event.threadID + " " + pref);
                            });
                        } else {
                            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
                }
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddUser 100024563636366");
            }
        }
    } else if (query.startsWith("gcolor")) {
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(
                api,
                event,
                "Opps! I didnt get it. You should try using gcolor theme instead.\n\nTheme:\nDefaultBlue, HotPink, AquaBlue, BrightPurple\nCoralPink, Orange, Green, LavenderPurple\nRed, Yellow, TealBlue, Aqua\nMango, Berry, Citrus, Candy" +
                    "\n\n" +
                    example[Math.floor(Math.random() * example.length)] +
                    "\ngcolor DefaultBlue"
            );
        } else {
            data.shift();
            let pref = data.join(" ").toLowerCase();
            if (gcolorn.includes(pref)) {
                api.changeThreadColor(gcolor[pref], event.threadID, (err) => {
                    if (err) return utils.logged(err);
                });
                utils.logged("change_color " + event.threadID + " " + gcolor[pref]);
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gcolor theme instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngcolor DefaultBlue");
            }
        }
    } else if (query.startsWith("welcomeuser")) {
        if (users.admin.includes(event.senderID)) {
            if (event.isGroup) {
                let arr = gc.participantIDs;
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using welcomeuser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwelcomeuser @Zero Two");
                } else {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        data.shift();
                        let user = data.join(" ");
                        let attem = getIdFromUrl(user);
                        if (/^[0-9]+$/.test(attem)) {
                            id = attem;
                        } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                            id = user;
                        } else if (event.type == "message_reply") {
                            id = event.messageReply.senderID;
                        } else {
                            api.getUserID(user.replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                api.getUserInfo(data[0].userID, (err, data1) => {
                                    if (err) return utils.logged(err);
                                    welcomeUser(api, event, data1.name, gc.threadName, arr.length, data[0].userID, "How are you @" + data1.name + "?");
                                });
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        return;
                    }
                    api.getUserInfo(id, (err, data1) => {
                        if (err) return utils.logged(err);
                        welcomeUser(api, event, data1.name, gc.threadName, arr.length, id, "How are you @" + data1.name + "?");
                    });
                }
            } else {
                sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        }
    } else if (query.startsWith("kickuser")) {
        if (users.admin.includes(event.senderID)) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return utils.logged(err);
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    if (!JSON.stringify(gc.adminIDs).includes(currentID)) {
                        sendMessage("Unfortunately i am not an admin on this group. I have no rights to kick any members.");
                        return;
                    }
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using kickUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nkickUser @Zero Two");
                    } else {
                        let id = Object.keys(event.mentions)[0];
                        if (id === undefined) {
                            data.shift();
                            let user = data.join(" ");
                            let attem = getIdFromUrl(user);
                            if (/^[0-9]+$/.test(attem)) {
                                id = attem;
                            } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                                id = user;
                            } else if (event.type == "message_reply") {
                                id = event.messageReply.senderID;
                            } else {
                                api.getUserID(user.replace("@", ""), (err, data) => {
                                    if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                    removeUser(api, event, data[0].userID);
                                    api.getUserInfo(data[0].userID, (err, data1) => {
                                        if (err) return utils.logged(err);
                                        byebyeUser(api, event, data1.name, gc.threadName, arr.length, data[0].userID);
                                    });
                                });
                                return;
                            }
                        } else if (isMyId(id)) {
                            return;
                        }
                        removeUser(api, event, id);
                        api.getUserInfo(id, (err, data1) => {
                            if (err) return utils.logged(err);
                            byebyeUser(api, event, data1.name, gc.threadName, arr.length, id);
                        });
                    }
                } else {
                    sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            });
        }
    } else if (query.startsWith("isbot")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using isBot @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nisBot @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return utils.logged(err);
                            if (users.bot.includes(data[0].userID)) {
                                sendMessage(api, event, "I already knew it.");
                            } else {
                                users.bot.push(data[0].userID);
                                fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                                sendMessage(api, event, "Noted.");
                            }
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    return;
                }
                if (users.bot.includes(id)) {
                    sendMessage(api, event, "I already knew it.");
                } else {
                    users.bot.push(id);
                    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                    sendMessage(api, event, "Noted.");
                }
            }
        }
    } else if (query.startsWith("isnotbot")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using isNotBot @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nisNotBot @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return utils.logged(err);
                            if (!users.bot.includes(data[0].userID)) {
                                sendMessage(api, event, "It seems like that account is not a bot.");
                            } else {
                                users.bot = users.bot.filter((item) => item !== data[0].userID);
                                fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                                sendMessage(api, event, "Noted.");
                            }
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    return;
                }
                if (!users.bot.includes(id)) {
                    sendMessage(api, event, "It seems like that account is not a bot.");
                } else {
                    users.bot = users.bot.filter((item) => item !== id);
                    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
                    sendMessage(api, event, "Noted.");
                }
            }
        }
    } else if (query.startsWith("blockuser")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using blockUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nblockUser @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return utils.logged(err);
                            blockUser(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    return;
                }
                blockUser(api, event, id);
            }
        }
    } else if (query == "mute") {
        users.muted.push(event.senderID);
        userPresence[event.threadID] = null;
        sendMessage(api, event, "You have been muted. Enter `unmute` for you to use my commands again.");
        fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
    } else if (query.startsWith("blockgroup")) {
        if (users.admin.includes(event.senderID)) {
            if (event.isGroup) {
                blockGroup(api, event, event.threadID);
            } else {
                sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        }
    } else if (query.startsWith("smartreplyon")) {
        enableSmartReply(api, event, event.threadID);
    } else if (query.startsWith("smartreplyoff")) {
        disableSmartReply(api, event, event.threadID);
    } else if (query.startsWith("texttospeechon")) {
        enableTTS(api, event, event.threadID);
    } else if (query.startsWith("texttospeechoff")) {
        disableTTS(api, event, event.threadID);
    } else if (query.startsWith("unblockuser")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using unblockUser @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nunblockUser @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            unblockUser(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    return;
                }
                unblockUser(api, event, id);
            }
        }
    } else if (query.startsWith("setkey")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2 && !data[1].includes(":")) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using setKey name:key instead.");
            } else {
                let inp = data[1].split(":");
                keys[inp[0]] = inp[1];
                fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
                sendMessage(api, event, "Successfully saved " + inp[0] + ".");
            }
        }
    } else if (query.startsWith("fontignore")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using fontignore @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nfontignore @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            fontIgnore(api, event, data[0].userID);
                        });
                        return;
                    }
                }
                fontIgnore(api, event, id);
            }
        }
    } else if (query.startsWith("addadmin")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using addAdmin @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\naddAdmin @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            addAdmin(api, event, data[0].userID);
                        });
                        return;
                    }
                }
                addAdmin(api, event, id);
            }
        }
    } else if (query.startsWith("remadmin")) {
        if (users.admin.includes(event.senderID)) {
            let data = input.split(" ");
            if (data.lenght < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using remAdmin @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nremAdmin @Zero Two");
            } else {
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    data.shift();
                    let user = data.join(" ");
                    let attem = getIdFromUrl(user);
                    if (/^[0-9]+$/.test(attem)) {
                        id = attem;
                    } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                        id = user;
                    } else if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else {
                        api.getUserID(user.replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            remAdmin(api, event, data[0].userID);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    return;
                }
                remAdmin(api, event, id);
            }
        }
    } else if (query == "unsendon" && !settings.preference.onUnsend) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onUnsend = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Resending of unsend messages and attachments are now enabled.");
        }
    } else if (query == "unsendoff" && settings.preference.onUnsend) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onUnsend = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Resending of unsend messages and attachments is been disabled.");
        }
    } else if (query == "antileaveon" && !settings.preference.antiLeave) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.antiLeave = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Readding of user who left is now enabled.");
        }
    } else if (query == "antileaveoff" && settings.preference.antiLeave) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.antiLeave = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Readding of user who left is been disabled.");
        }
    } else if (query == "tagalogsupporton" && !settings.preference.tagalog) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.tagalog = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Tagalog Support is now enabled.");
        }
    } else if (query == "tagalogsupportoff" && settings.preference.tagalog) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.tagalog = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Tagalog Support is been disabled.");
        }
    } else if (query == "delayon" && !settings.preference.onDelay) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onDelay = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Delay on messages, replies and reaction are now enabled.");
        }
    } else if (query == "delayoff" && settings.preference.onDelay) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onDelay = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Delay on messages, replies and reaction is been disabled.");
        }
    } else if (query == "nsfwon" && !settings.preference.onNsfw) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onNsfw = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Not Safe For Work are now enabled.");
        }
    } else if (query == "nsfwoff" && settings.preference.onNsfw) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.onNsfw = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Not Safe For Work is been disabled.");
        }
    } else if (query == "simultaneousexecutionon" && !settings.preference.preventSimultaneousExecution) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.preventSimultaneousExecution = true;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Prevention of simulataneous execution are now enabled.");
        }
    } else if (query == "simultaneousexecutionoff" && settings.preference.preventSimultaneousExecution) {
        if (users.admin.includes(event.senderID)) {
            settings.preference.preventSimultaneousExecution = false;
            fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
            sendMessage(api, event, "Prevention of simulataneous execution is now disabled.");
        }
    } else if (query == "gmember") {
        if (isGoingToFast(event)) {
            return;
        }
        api.getThreadInfo(event.threadID, (err, gc) => {
            if (err) return utils.logged(err);
            if (gc.isGroup) {
                let arr = gc.participantIDs;
                sendMessage(api, event, "This group has about " + arr.length + " members.");
            } else {
                sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
            }
        });
    } else if (query.startsWith("ginfo")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.isGroup) {
            api.getThreadInfo(event.threadID, (err, a) => {
                if (err) utils.logged(err);
                let construct = "";
                let usern = a.userInfo.length;
                for (b in a.userInfo) {
                    construct += a.userInfo[b].name + "<br>";
                }
                threadInfo["/" + a.threadID] = {
                    threadName: a.threadName,
                    messageCount: a.messageCount,
                    membersCount: usern,
                    members: construct,
                    icon: a.imageSrc,
                };
                sendMessage(api, event, "This group information can be see at http://0.0.0.0:3000/" + a.threadID);
            });
        } else {
            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
        }
    } else if (query.startsWith("gname")) {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.isGroup) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gname text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngname Darling in the Franxx >3");
            } else {
                data.shift();
                api.setTitle(data.join(" "), event.threadID, (err, obj) => {
                    if (err) return utils.logged(err);
                });
            }
        } else {
            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
        }
    } else if (query == "gname") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.isGroup) {
            sendMessage(api, event, gc.threadName);
        } else {
            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
        }
    } else if (query == "groupid" || query == "guid" || query == "uid") {
        if (isGoingToFast(event)) {
            return;
        }
        if (event.type == "message" && !(groups.list[event.threadID] === undefined) && (query == "guid" || query == "groupid")) {
            sendMessage(api, event, "The " + groups.list[event.threadID] + " guid is " + event.threadID);
        } else if (event.type == "message_reply") {
            let id1;
            if (isMyId(id1)) {
                id1 = event.senderID;
            } else {
                id1 = event.messageReply.senderID;
            }
            api.getUserInfo(id1, (err, info) => {
                if (err) return utils.logged(err);
                let message = {
                    body: info[id1]["firstName"] + " uid is " + id1,
                    /*
                    mentions: [{
                        tag: '@' + info[id1]['firstName'],
                        id: id1,
                        fromIndex: 0
                    }]
                    */
                };
                sendMessage(api, event, message);
            });
        } else {
            sendMessage(api, event, "Your uid is " + event.senderID);
        }
    } else if (query == "cmd" || query == "cmd1" || query == "cmd0") {
        if (isGoingToFast(event)) {
            return;
        }
        sendMessage(api, event, help);
    } else if (query.startsWith("cmd") && /^\d+$/.test(query.substring(3))) {
        if (isGoingToFast(event)) {
            return;
        }
        let num = query.substring(3);
        switch (num) {
            case "2":
                sendMessage(api, event, help1);
                break;
            case "3":
                sendMessage(api, event, help2);
                break;
            case "4":
                sendMessage(api, event, help3);
                break;
            case "5":
                sendMessage(api, event, help4);
                break;
            case "6":
                sendMessage(api, event, help5);
                break;
            case "7":
                sendMessage(api, event, help6);
                break;
            case "8":
                sendMessage(api, event, help7);
                break;
            case "9":
                sendMessage(api, event, help8);
                break;
            default:
                sendMessage(api, event, "Seem's like that's too far from the command list pages.");
                break;
        }
    } else if (query == "cmdadmin") {
        if (isGoingToFast(event)) {
            return;
        }
        sendMessage(api, event, helpadmin);
    } else if (query == "cmdroot") {
        if (isGoingToFast(event)) {
            return;
        }
        sendMessage(api, event, helproot);
    } else if (query == "cmdall") {
        if (isGoingToFast(event)) {
            return;
        }
        let message = {
            body: "Due to the limitations on messenger platform.\nAll command list are now moved to: https://mrepol742.github.io/project-orion/#cmdall",
            url: "https://mrepol742.github.io/project-orion/#cmdall",
        };
        sendMessage(api, event, message);
    } else if (query.startsWith("cmd") && /^\d+$/.test(query.substring(3))) {
        if (isGoingToFast(event)) {
            return;
        }
        sendMessage(api, event, "Oops! Seems like you already reach the end of the commands list. Developers are still cooking new features for this awesome project.");
    } else if (query.startsWith("wiki")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using wiki text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwiki Google");
        } else {
            data.shift();
            getResponseData("https://en.wikipedia.org/api/rest_v1/page/summary/" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately the wiki " + txt + " was not found.");
                } else {
                    sendMessage(api, event, response.extract);
                }
            });
        }
    } else if (query.startsWith("lovetest")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using lovetest name:name instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlovetest Edogawa Conan: Ran Mouri");
        } else {
            data.shift();
            let text = data.join(" ").split(":");
            const options = {
                method: "GET",
                url: "https://love-calculator.p.rapidapi.com/getPercentage",
                params: {
                    sname: text[0],
                    fname: text[1],
                },
                headers: {
                    "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
                    "X-RapidAPI-Key": "1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74",
                },
            };
            axios
                .request(options)
                .then(function ({ data }) {
                    var name1 = data.fname;
                    var name2 = data.sname;
                    var percent = data.percentage + "%";
                    var result = data.result;
                    sendMessage(api, event, name1 + " ❤️ " + name2 + "\n\n⦿ Percentage: " + percent + "\n" + result);
                })
                .catch(function (error) {
                    utils.logged(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
        }
    } else if (query.startsWith("kiss")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using kiss @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nkiss @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        kiss(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            kiss(api, event, id);
        }
    } else if (query.startsWith("gun")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using gun @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngun @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        gun(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            gun(api, event, id);
        }
    } else if (query.startsWith("wanted")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using wanted @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwanted @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        wanted(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            wanted(api, event, id);
        }
    } else if (query.startsWith("clown")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using clown @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nclown @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        clown(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            clown(api, event, id);
        }
    } else if (query.startsWith("drip")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using drip @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndrip @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        drip(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            drip(api, event, id);
        }
    } else if (query.startsWith("communist")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using communist @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncommunist @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        communist(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            communist(api, event, id);
        }
    } else if (query.startsWith("advert")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using advert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nadvert @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        advert(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            advert(api, event, id);
        }
    } else if (query.startsWith("uncover")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using uncover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nuncover @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        uncover(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            uncover(api, event, id);
        }
    } else if (query.startsWith("jail")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using jail @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njail @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        jail(api, event, (id = data[0].userID));
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            jail(api, event, id);
        }
    } else if (query.startsWith("invert")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using invert @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ninvert @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        invert(api, event, data[0].userID);
                    });
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            invert(api, event, id);
        }
    } else if (query.startsWith("ship")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri");
        } else {
            if (input.split("@").length - 1 >= 2) {
                let id1 = Object.keys(event.mentions)[0];
                let id2 = Object.keys(event.mentions)[1];
                if (id1 === undefined || id2 === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri");
                    return;
                }
                if (isMyId(id1)) {
                    id1 = event.senderID;
                } else if (isMyId(id2)) {
                    id2 = event.senderID;
                }
                axios
                    .get(getProfilePic(id1))
                    .then(function (response) {
                        let aaa = encodeURIComponent(response.request.res.responseUrl);
                        axios
                            .get(getProfilePic(id2))
                            .then(function (response) {
                                let url = "https://api.popcat.xyz/ship?user1=" + aaa + "&user2=" + encodeURIComponent(response.request.res.responseUrl);
                                let dir = __dirname + "/cache/images/ship_" + getTimestamp() + ".png";
                                utils.logged("parse_image " + url);
                                downloadFile(url, dir).then((response) => {
                                    let image = {
                                        body: "New Lovers >3",
                                        attachment: fs.createReadStream(dir),
                                    };
                                    sendMessage(api, event, image);
                                    unLink(dir);
                                });
                            })
                            .catch(function (err) {
                                utils.logged(err);
                            });
                    })
                    .catch(function (err) {
                        utils.logged(err);
                    });
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nship @Edogawa Conan @Ran Mouri");
            }
        }
    } else if (query.startsWith("www")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri");
        } else {
            if (input.split("@").length - 1 >= 2) {
                let id1 = Object.keys(event.mentions)[0];
                let id2 = Object.keys(event.mentions)[1];
                if (id1 === undefined || id2 === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri");
                    return;
                }
                if (isMyId(id1)) {
                    id1 = event.senderID;
                } else if (isMyId(id2)) {
                    id2 = event.senderID;
                }
                axios
                    .get(getProfilePic(id1))
                    .then(function (response) {
                        let aaa = encodeURIComponent(response.request.res.responseUrl);
                        axios
                            .get(getProfilePic(id2))
                            .then(function (response) {
                                let url = "https://api.popcat.xyz/whowouldwin?image1=" + aaa + "&image2=" + encodeURIComponent(response.request.res.responseUrl);
                                let dir = __dirname + "/cache/images/www_" + getTimestamp() + ".png";
                                utils.logged("parse_image " + url);
                                downloadFile(url, dir).then((response) => {
                                    let image = {
                                        body: "Hmmmm.. Who?",
                                        attachment: fs.createReadStream(dir),
                                    };
                                    sendMessage(api, event, image);
                                    unLink(dir);
                                });
                            })
                            .catch(function (err) {
                                utils.logged(err);
                            });
                    })
                    .catch(function (err) {
                        utils.logged(err);
                    });
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwww @Edogawa Conan @Ran Mouri");
            }
        }
    } else if (query.startsWith("pet")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using pet @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npet @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        pet(api, event, id);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            pet(api, event, id);
        }
    } else if (query.startsWith("formatnumbers")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using formatnumbers number instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nformatnumbers 326346436");
        } else {
            data.shift();
            sendMessage(api, event, numberWithCommas(data.join(" ")));
        }
    } else if (query.startsWith("mnm")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using mnm @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmnm @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        mnm(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            mnm(api, event, id);
        }
    } else if (query.startsWith("greyscale")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using greyscale @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngreyscale @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        greyscale(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            greyscale(api, event, id);
        }
    } else if (query.startsWith("jokeover")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using jokeover @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\njokeover @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        jokeover(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            jokeover(api, event, id);
        }
    } else if (query.startsWith("blur")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using blur @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nblur @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        blur(api, event, data[0].userID);
                    });
                    return;
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            blur(api, event, id);
        }
    } else if (query.startsWith("parsefacebook")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using parseFacebook @mention instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nparseFacebook @Zero Two");
        } else {
            let id = Object.keys(event.mentions)[0];
            if (id === undefined) {
                data.shift();
                let user = data.join(" ");
                let attem = getIdFromUrl(user);
                if (/^[0-9]+$/.test(attem)) {
                    id = attem;
                } else if (/^[0-9]+$/.test(user) && user.length == 15) {
                    id = user;
                } else if (input.includes("@me")) {
                    id = event.senderID;
                } else if (event.type == "message_reply") {
                    id = event.messageReply.senderID;
                } else {
                    api.getUserID(user.replace("@", ""), (err, data) => {
                        if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                        id = data[0].userID;
                    });
                }
            } else if (isMyId(id)) {
                id = event.senderID;
            }
            api.getUserInfo(id, async (err, ret) => {
                if (err) return utils.logged(err);
                utils.logged(JSON.stringify(ret));
                let name = ret[id].name;
                let vanity = ret[id].vanity;
                if (vanity == "") {
                    vanity = id;
                } else {
                    vanit = "@" + vanity;
                }
                let gender = ret[id].gender;
                let isBirthday = ret[id].isBirthday;
                let isFriend = ret[id].isFriend;
                let type = ret[id].type;
                let count = 0;
                let count1 = 0;
                for (msg in msgs) {
                    if (msgs[msg][1] == id) {
                        count++;
                    }
                }
                for (umsg in unsend_msgs) {
                    if (unsend_msgs[umsg][1] == id) {
                        count1++;
                    }
                }
                let url = encodeURI("https://graph.facebook.com/" + id + "/picture?height=720&width=720&access_token=" + settings.apikey.facebook);
                let filename = __dirname + "/cache/images/facebook_" + getTimestamp() + ".jpg";
                let cons = checkFound(name) + " @" + vanity;
                cons += "\n⦿ Gender: " + (gender == 1 ? "female" : "male");
                cons += "\n⦿ Birthday: " + checkFound(isBirthday);
                cons += "\n⦿ Messages: " + numberWithCommas(count);
                cons += "\n⦿ Unsend Messages: " + numberWithCommas(count1);
                downloadFile(url, filename).then((response) => {
                    let image = {
                        body: cons,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, image);
                    unLink(filename);
                });
            });
        }
    } else if (query.startsWith("morse")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using morse text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmorse .... . .-.. .-.. ---");
        } else {
            data.shift();
            getResponseData("https://api.popcat.xyz/texttomorse?text=" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    sendMessage(api, event, response.morse);
                }
            });
        }
    } else if (query.startsWith("lulcat")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using lulcat text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlulcat meowww");
        } else {
            data.shift();
            getResponseData("https://api.popcat.xyz/lulcat?text=" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    sendMessage(api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("mock")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using mock text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nmock i have no idea");
        } else {
            data.shift();
            getResponseData("https://api.popcat.xyz/mock?text=" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
                } else {
                    sendMessage(api, event, response.text);
                }
            });
        }
    } else if (query.startsWith("coding")) {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://eager-meitner-f8adb8.netlify.app/.netlify/functions/random").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately the code throws an exception.");
            } else {
                let url = response.url;
                let title = response.title;
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/coding_" + time + ".png";
                downloadFile(encodeURI(url), filename).then((response) => {
                    let message = {
                        body: title,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query == "joke") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/joke").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately the joke is me.");
            } else {
                sendMessage(api, event, response.joke);
            }
        });
    } else if (query == "barrier") {
        if (isGoingToFast(event)) {
            return;
        }
        let message = {
            body: "Anti horny barrier activated.",
            attachment: fs.createReadStream(__dirname + "/assets/barrier.jpg"),
        };
        sendMessage(api, event, message);
    } else if (query == "fact") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/fact").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately the fact is not true.");
            } else {
                sendMessage(api, event, response.fact);
            }
        });
    } else if (query == "thoughts") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/showerthoughts").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately i never had any shower thoughts anymore.");
            } else {
                sendMessage(api, event, response.result);
            }
        });
    } else if (query.startsWith("nickname")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention:nickname instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnickname @Zero Two:Darling");
        } else {
            if (input.includes("@")) {
                data.shift();
                let name = data.join(" ").split(":");
                let id = Object.keys(event.mentions)[0];
                if (id === undefined) {
                    if (name[0] == "@me") {
                        id = event.senderID;
                    } else {
                        api.getUserID(name[0].replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            changeNickname(api, event, data[0].userID, name[1]);
                        });
                        return;
                    }
                } else if (isMyId(id)) {
                    id = event.senderID;
                }
                changeNickname(api, event, id, name[1]);
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nnickname @Zero Two Darling");
            }
        }
    } else if (query.startsWith("drake")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using drake text1: text2 instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ndrake error: bug");
        } else {
            data.shift();
            let text = data.join(" ").split(":");
            parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + "/cache/images/drake_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("pika")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using pika text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npika hayssss");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/pikachu?text=" + data.join(" "), __dirname + "/cache/images/pika_" + getTimestamp() + ".png");
        }
    } else if (query == "meme") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://api.popcat.xyz/meme").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                parseImage(api, event, response.image, __dirname + "/cache/images/meme.png");
            }
        });
    } else if (query.startsWith("conan")) {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://mrepol742-gif-randomizer.vercel.app/api", __dirname + "/cache/images/conan_" + getTimestamp() + ".png");
    } else if (query.startsWith("oogway")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using oogway text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\noogway bug is not an error");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/oogway?text=" + data.join(" "), __dirname + "/cache/images/oogway_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("hanime")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using hanime category instead.\n\nCategories: \nwaifu, neko, trap, blowjob" + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nhanime waifu");
        } else {
            data.shift();
            getResponseData("https://api.waifu.pics/nsfw/" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "It seem like i cannot find any relavant result about " + text);
                } else {
                    parseImage(api, event, response.url, __dirname + "/cache/images/animensfw_" + getTimestamp() + ".png");
                }
            });
        }
    } else if (query == "hololive") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://zenzapis.xyz/randomanime/hololive?apikey=9c4c44db3725").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/hololive_" + time + ".png";
                downloadFile(encodeURI(response.result.image), filename).then((response) => {
                    let message = {
                        body: response.result.caption,
                        attachment: [fs.createReadStream(filename)],
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query == "animecouples") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://zenzapis.xyz/randomanime/couples?apikey=9c4c44db3725").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let time = getTimestamp();
                let fmmale = __dirname + "/cache/images/animecouple_male_" + time + ".png";
                let fmfemale = __dirname + "/cache/images/animecouple_female_" + time + ".png";
                downloadFile(encodeURI(response.result.male), fmmale).then((response) => {
                    downloadFile(encodeURI(response.result.female), fmfemale).then((response) => {
                        let message = {
                            attachment: [fs.createReadStream(fmmale), fs.createReadStream(fmfemale)],
                        };
                        sendMessage(api, event, message);
                        unLink(fmmale);
                        unLink(fmfemale);
                    });
                });
            }
        });
    } else if (query == "animetopmovie") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://gogoanime.consumet.stream/anime-movies").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately an error occured.");
            } else {
                let list = "";
                let i;
                let img;
                let isRep = true;
                for (i = 0; i < response.length; i++) {
                    list += "\n" + (i + 1) + ". " + response[i].animeTitle + " " + response[i].releasedDate;
                    if (isRep) {
                        img = response[i].animeImg;
                        isRep = false;
                    }
                }
                let filename = __dirname + "/cache/images/animetopmovie_" + getTimestamp() + ".png";
                downloadFile(encodeURI(img), filename).then((response) => {
                    let message = {
                        body: "Top Popular Anime Movies\n" + list,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query == "animetop") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://gogoanime.consumet.stream/top-airing").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately an error occured.");
            } else {
                let list = "";
                let i;
                let img;
                let isRep = true;
                for (i = 0; i < response.length; i++) {
                    list += "\n" + (i + 1) + ". " + response[i].animeTitle;
                    if (isRep) {
                        img = response[i].animeImg;
                        isRep = false;
                    }
                }
                let filename = __dirname + "/cache/images/animetop_" + getTimestamp() + ".png";
                downloadFile(encodeURI(img), filename).then((response) => {
                    let message = {
                        body: "Top Popular Anime Series\n" + list,
                        attachment: fs.createReadStream(filename),
                    };
                    sendMessage(api, event, message);
                    unLink(filename);
                });
            }
        });
    } else if (query.startsWith("animegenre")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using animegenre genre instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nanimegenre action");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://gogoanime.consumet.stream/genre/" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Invalid genre "' + name + '".');
                } else {
                    let list = "";
                    let i;
                    let img;
                    let isRep = true;
                    for (i = 0; i < response.length; i++) {
                        list += "\n" + (i + 1) + ". " + response[i].animeTitle + " " + response[i].releasedDate;
                        if (isRep) {
                            img = response[i].animeImg;
                            isRep = false;
                        }
                    }
                    let filename = __dirname + "/cache/images/animegenre_" + getTimestamp() + ".png";
                    downloadFile(encodeURI(img), filename).then((response) => {
                        let message = {
                            body: list,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("animesearch")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using animesearch text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nanimesearch Detective Conan");
        } else {
            data.shift();
            let name = data.join(" ");
            getResponseData("https://gogoanime.consumet.stream/search?keyw=" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately there was no search output found for "' + name + '".');
                } else {
                    let list = "";
                    let i;
                    let img;
                    let isRep = true;
                    for (i = 0; i < response.length; i++) {
                        list += "\n" + (i + 1) + ". " + response[i].animeTitle;
                        if (isRep) {
                            img = response[i].animeImg;
                            isRep = false;
                        }
                    }
                    let filename = __dirname + "/cache/images/animesearch_" + getTimestamp() + ".png";
                    downloadFile(encodeURI(img), filename).then((response) => {
                        let message = {
                            body: "Here are the results:\n" + list,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query.startsWith("animeinfo")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using animeinfo text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nanimeinfo Detective Conan");
        } else {
            data.shift();
            let name = data.join(" ").replaceAll(" ", "-");
            getResponseData("https://gogoanime.consumet.stream/anime-details/" + name).then((response) => {
                if (response == null) {
                    sendMessage(api, event, 'Unfortunately anime "' + name + '" was not found.');
                } else {
                    let title = response.animeTitle;
                    let otherT = response.otherNames;
                    let year = response.releasedDate;
                    let type = response.type;
                    let status = response.status;
                    let animeImg = response.animeImg;
                    let genres = response.genres;
                    let synopsis = response.synopsis;
                    let ep = response.totalEpisodes;
                    let time = getTimestamp();
                    let filename = __dirname + "/cache/images/animeinfo_" + time + ".png";
                    downloadFile(encodeURI(animeImg), filename).then((response) => {
                        let message = {
                            body: "⦿ Title: " + title + " (" + otherT + ") " + year + "\n⦿ Genres: " + genres + "\n⦿ Type: " + type + "\n⦿ Status: " + status + "\n⦿ Episodes: " + ep + "\n\n" + synopsis,
                            attachment: fs.createReadStream(filename),
                        };
                        sendMessage(api, event, message);
                        unLink(filename);
                    });
                }
            });
        }
    } else if (query2.startsWith("anime ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(
                api,
                event,
                "Opps! I didnt get it. You should try using anime category instead.\n\nCategories: \nwaifu, neko, shinobu, megumin,\nbully, cuddle, cry, hug,\nawoo, kiss, lick, pat,\nsmug, bonk, yeet, blush,\nsmile, wave, highfive, handhold,\nnom, bite, glomp, slap,\nkill, kick, happy, wink,\npoke, dance and cringe" +
                    "\n\n" +
                    example[Math.floor(Math.random() * example.length)] +
                    "\nanime waifu"
            );
        } else {
            data.shift();
            getResponseData("https://api.waifu.pics/sfw/" + data.join(" ")).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "I cannot find any relavant result about " + text);
                } else {
                    parseImage(api, event, response.url, __dirname + "/cache/images/anime_" + getTimestamp() + ".png");
                }
            });
        }
    } else if (query.startsWith("trump")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using trump text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntrump bug is not an error");
        } else {
            data.shift();
            let text = data.join(" ").substring(0, 57) + "...";
            parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" + text, __dirname + "/cache/images/trump_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("parseimage")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using parseImage url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nparseImage https://mrepol742.github.io/favicon.ico");
        } else {
            data.shift();
            let url = data.join(" ");
            if (url.startsWith("https://") || url.startsWith("http://")) {
                parseImage(api, event, url, __dirname + "/cache/images/parseImage_" + getTimestamp() + ".png");
            } else {
                sendMessage(api, event, "It looks like you send invalid url. Does it have https or http scheme?");
            }
        }
    } else if (query.startsWith("qrcode")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            let message = {
                body: "Opps! I didnt get it. You should try using qrcode text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nqrcode https://mrepol742.github.io",
                url: "https://mrepol742.github.io",
            };
            sendMessage(api, event, message);
        } else {
            data.shift();
            parseImage(api, event, "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + data.join(" "), __dirname + "/cache/images/qrcode_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("alert")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using alert text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nalert hello world");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/alert?text=" + data.join(" "), __dirname + "/cache/images/alert_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("caution")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using caution text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ncaution bug is not an error");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/caution?text=" + data.join(" "), __dirname + "/cache/images/caution_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("trump")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using trump text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntrump i am leaving twitter");
        } else {
            data.shift();
            parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" + data.join(" "), __dirname + "/cache/images/trump_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("biden")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using biden text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nbiden i am leaving twitter");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/biden?text=" + data.join(" "), __dirname + "/cache/images/biden_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("website")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            let messaage = {
                body: "Opps! I didnt get it. You should try using website url instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwebsite https://mrepol742.github.io",
                url: "https://mrepol742.github.io",
            };
            sendMessage(api, event, message);
        } else {
            data.shift();
            let text = data.join(" ");
            if (text.startsWith("https://") || text.startsWith("http://")) {
                parseImage(api, event, "https://api.popcat.xyz/screenshot?url=" + text, __dirname + "/cache/images/website_" + getTimestamp() + ".png");
            } else {
                sendMessage(api, event, "It looks like you send invalid url. Does it have https or http scheme?");
            }
        }
    } else if (query2.startsWith("god ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using god text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ngod explicit content");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" + data.join(" "), __dirname + "/cache/images/god_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("sadcat")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using sadcat text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsadcat meoww");
        } else {
            data.shift();
            parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" + data.join(" "), __dirname + "/cache/images/sadcat_" + getTimestamp() + ".png");
        }
    } else if (query2.startsWith("sim ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        } else {
            data.shift();
            let txt = data.join(" ").substring(0, 996) + "...";
            getResponseData("https://api.simsimi.net/v2/?text=" + txt + "&lc=ph&cf=false&name=" + mjme[Math.floor(Math.random() * mjme.length)]).then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately i am not simp anymore.");
                } else {
                    sendMessage(api, event, response["success"]);
                }
            });
        }
    } else if (query2.startsWith("pooh ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 3) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using pooh text1: text2 instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\npooh color: colour");
        } else {
            data.shift();
            let text = data.join(" ").split(":");
            parseImage(api, event, "https://api.popcat.xyz/pooh?text1=" + text[0] + "&text2=" + text[1], __dirname + "/cache/images/pooh_" + getTimestamp() + ".png");
        }
    } else if (query == "landscape") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://source.unsplash.com/1600x900/?landscape", __dirname + "/cache/images/landscape_" + getTimestamp() + ".png");
    } else if (query == "portrait") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://source.unsplash.com/900x1600/?portrait", __dirname + "/cache/images/portrait_" + getTimestamp() + ".png");
    } else if (query.startsWith("landscape")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using landscape text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nlandscape night");
        } else {
            data.shift();
            parseImage(api, event, "https://source.unsplash.com/1600x900/?" + data.join(" "), __dirname + "/cache/images/landscape_" + getTimestamp() + ".png");
        }
    } else if (query == "cosplay") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/cosplay?apikey=9c4c44db3725", __dirname + "/cache/images/costplay_" + getTimestamp() + ".png");
    } else if (query == "darkjoke") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/darkjoke?apikey=9c4c44db3725", __dirname + "/cache/images/darkjoke_" + getTimestamp() + ".png");
    } else if (query == "blackpink") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/blackpink?apikey=9c4c44db3725", __dirname + "/cache/images/blackpink_" + getTimestamp() + ".png");
    } else if (query == "motor") {
        if (isGoingToFast(event)) {
            return;
        }
        parseImage(api, event, "https://zenzapis.xyz/randomimage/motor?apikey=9c4c44db3725", __dirname + "/cache/images/motor_" + getTimestamp() + ".png");
    } else if (query.startsWith("portrait")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using portrait text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nportrait rgb");
        } else {
            data.shift();
            parseImage(api, event, "https://source.unsplash.com/900x1600/?" + data.join(" "), __dirname + "/cache/images/portrait_" + getTimestamp() + ".png");
        }
    } else if (query.startsWith("animequote")) {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://animechan.vercel.app/api/random").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                sendMessage(api, event, response.quote + "\n\nby " + response.character + " of " + response.anime);
            }
        });
    } else if (query == "advice") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let result;
                let i;
                for (i = 0; i < response.length; i++) {
                    result = response[i].q;
                }
                sendMessage(api, event, result);
            }
        });
    } else if (query2.startsWith("time ")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntime Asia/Manila");
        } else {
            data.shift();
            if (isValidTimeZone(data.join(" "))) {
                sendMessage(api, event, "It's " + getMonth(body) + " " + getDayN(body) + ", " + getDay(body) + " " + formateDate(body));
            } else {
                sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\ntime Asia/Manila");
            }
        }
    } else if (query == "time") {
        sendMessage(api, event, "It's " + getMonth(settings.preference.timezone) + " " + getDayN(settings.preference.timezone) + ", " + getDay(settings.preference.timezone) + " " + formateDate(settings.preference.timezone));
    } else if (query.startsWith("inspiration")) {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let result;
                let i;
                for (i = 0; i < response.length; i++) {
                    result = response[i].a + " says\n" + response[i].q;
                }
                sendMessage(api, event, result);
            }
        });
    } else if (query.startsWith("motivation") || query.startsWith("motivate")) {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://zenquotes.io/api/random").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let result;
                let i;
                for (i = 0; i < response.length; i++) {
                    result = response[i].q + "\n\nby " + response[i].a;
                }
                sendMessage(api, event, result);
            }
        });
    } else if (query == "newyear") {
        if (isGoingToFast(event)) {
            return;
        }
        let yr = new Date().getFullYear() + 1;
        let future = new Date("Jan 1, " + yr + " 00:00:00").getTime();
        let now = new Date().getTime();
        let count = future - now;
        let days = Math.floor(count / (1000 * 60 * 60 * 24));
        let hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((count % (1000 * 60)) / 1000);
        let message = {
            body: "There's " + days + "days " + hours + "hours " + minutes + "minutes and " + seconds + "seconds before New Year.",
        };
        sendMessage(api, event, message);
    } else if (query == "christmas") {
        if (isGoingToFast(event)) {
            return;
        }
        let yr = new Date().getFullYear();
        let future = new Date("Dec 25, " + yr + " 00:00:00").getTime();
        let now = new Date().getTime();
        let count = future - now;
        let days = Math.floor(count / (1000 * 60 * 60 * 24));
        let hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((count % (1000 * 60)) / 1000);
        let message = {
            body: "There's " + days + "days " + hours + "hours " + minutes + "minutes and " + seconds + "seconds before Christmas.",
        };
        sendMessage(api, event, message);
    } else if (query == "verserandom") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let result;
                let i;
                for (i = 0; i < response.length; i++) {
                    result = response[i].text + "\n\n" + response[i].bookname + " " + response[i].chapter + ":" + response[i].verse;
                }
                sendMessage(api, event, result);
            }
        });
    } else if (query == "versetoday") {
        if (isGoingToFast(event)) {
            return;
        }
        getResponseData("https://labs.bible.org/api/?passage=votd&type=json").then((response) => {
            if (response == null) {
                sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
            } else {
                let result;
                let i;
                for (i = 0; i < response.length; i++) {
                    result = response[i].text + "\n\n" + response[i].bookname + " " + response[i].chapter + ":" + response[i].verse;
                }
                sendMessage(api, event, result);
            }
        });
    } else if (query.startsWith("verse")) {
        if (isGoingToFast(event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nverse Job 4:9");
        } else {
            data.shift();
            let body = data.join(" ");
            getResponseData("http://labs.bible.org/api/?passage=" + body + "&type=json").then((r) => {
                if (r == null) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nverse Job 4:9");
                } else {
                    let result = "";
                    let total = r.length;
                    let i;
                    for (i = 0; i < total; i++) {
                        result += r[i].text + "\n\n" + r[i].bookname + " " + r[i].chapter + ":" + r[i].verse;
                    }
                    sendMessage(api, event, result);
                }
            });
        }
    } else if (query == "refreshstate") {
        if (users.admin.includes(event.senderID)) {
            fs.writeFileSync(__dirname + "/data/" + settings.preference.app_state, getAppState(api), "utf8");
            utils.logged("login_state refresh");
            sendMessage(api, event, "The AppState refreshed.");
            fb_stateD = utils.getCurrentTime();
        }
    } else if (query == "savestate") {
        if (users.admin.includes(event.senderID)) {
            saveState();
            sendMessage(api, event, "The state have saved successfully.");
            messagesD = utils.getCurrentTime();
        }
    } else if (query == "test" || query == "hello world" || query == "hi world") {
        sendMessage(api, event, "Hello World");
    } else if (query == "about") {
        let message = {
            body: qot1[Math.floor(Math.random() * qot1.length)] + "\n\nhttps://mrepol742.github.io/project-orion/",
            url: "https://mrepol742.github.io/project-orion/",
        };
        sendMessage(api, event, message);
    } else if (query == "copyright") {
        let message = {
            body: "Melvin Jones Repol Ⓒ 2023. All Rights Reserved. The Project Orion is a Closed Source Project.\nMelvin Jones Repol Ⓒ 2018-2023. All Rights Reserved. The Project Webvium is a Closed Source Project.\n\n⦿ cmd\n⦿ about\n⦿ uptime\n⦿ license\n\nhttps://mrepol742.github.io/project-orion/",
            url: "https://mrepol742.github.io/project-orion/",
        };
        sendMessage(api, event, message);
    } else if (query == "license") {
        let message = {
            body:
                "/*\n* Copyright Ⓒ MREPOL742 - All Rights Reserved\n" +
                "* Unauthorized copying of this file, via any medium is strictly prohibited\n" +
                "* Proprietary and confidential\n" +
                "* Written by Melvin Jones Repol <mrepol742@gmail.com>, November 2022\n" +
                "*/\n\nUNDER PRIVACY POLICY OF THE WEBVIUM PROJECT 2023.\nhttps://mrepol742.github.io/webvium/privacypolicy/\n\n⦿ cmd\n⦿ copyright\n⦿ uptime\n⦿ about\n\nhttps://project-orion.mrepol742.repl.co",
            url: "https://mrepol742.github.io/webvium/privacypolicy/",
        };
        sendMessage(api, event, message);
    } else {
        if (event.isGroup) {
            if (event.type == "message_reply" && event.senderID != currentID) {
                if (event.messageReply.senderID == currentID) {
                    someR(api, event, query);
                }
            } else {
                if (isMyId(Object.keys(event.mentions)[0]) || (query.includes("@") && isMe(query2)) || !query.includes("@")) {
                    someR(api, event, query);
                }
            }
        } else {
            someR(api, event, query);
        }
    }
}

function someA(api, event, query, input) {
    if (query == "sup" || query == "wassup") {
        sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        return true;
    } else if (query == "hi" || query == "hello" || query == "hey" || query == "hwfar" || query == "yo") {
        sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        return true;
    } else if (query.startsWith("okay")) {
        sendMessage(api, event, "Yup");
        return true;
    } else if (query == "idk") {
        sendMessage(api, event, "I dont know too...");
        return true;
    }
    return false;
}

function reaction(api, event, query, input) {
    if (containsAny(query, happyEE) || input.includes("😂") || input.includes("🤣") || input.includes("😆")) {
        reactMessage(api, event, ":laughing:");
        if (query.includes("hahahaha") || query.includes("hahhaha") || query.includes("ahhahahh")) {
            sendMessage(api, event, funD[Math.floor(Math.random() * funD.length)]);
        }
    } else if (containsAny(input.toLowerCase(), sadEE)) {
        reactMessage(api, event, ":sad:");
    } else if (containsAny(input.toLowerCase(), angryEE)) {
        reactMessage(api, event, ":angry:");
    } else if (containsAny(query, loveEE) || query == "bot" || query == "good") {
        reactMessage(api, event, ":love:");
    } else if (query == "tsk") {
        reactMessage(api, event, ":like:");
    } else if (query == "nice" || query == "uwu") {
        reactMessage(api, event, ":heart:");
    }
}

function someR(api, event, query) {
    if (query.startsWith("goodeve") || query.startsWith("evening")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, goodev[Math.floor(Math.random() * goodev.length)]);
        if (!isEvening(settings.preference.timezone)) {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.preference.timezone) + " in the " + getDayNightTime(settings.preference.timezone) + " over here.");
        }
        return true;
        json;
    } else if (query.startsWith("goodmorn") || query.startsWith("morning")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, goodmo[Math.floor(Math.random() * goodmo.length)]);
        if (!isMorning(settings.preference.timezone)) {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.preference.timezone) + " in the " + getDayNightTime(settings.preference.timezone) + " over here.");
        }
        return true;
    } else if (query.startsWith("goodnight") || query.startsWith("night")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, goodni[Math.floor(Math.random() * goodni.length)]);
        if (!isNight(settings.preference.timezone)) {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.preference.timezone) + " in the " + getDayNightTime(settings.preference.timezone) + " over here.");
        }
        return true;
    } else if (query.startsWith("goodafter") || query.startsWith("afternoon")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, goodaf[Math.floor(Math.random() * goodaf.length)]);
        if (!isAfternoon(settings.preference.timezone)) {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.preference.timezone) + " in the " + getDayNightTime(settings.preference.timezone) + " over here.");
        }
        return true;
    }
    return false;
}

function parseImage(api, event, url, dir) {
    utils.logged("parse_image " + url);
    downloadFile(url, dir).then((response) => {
        let image = {
            attachment: fs.createReadStream(dir),
        };
        sendMessage(api, event, image);
        unLink(dir);
    });
}

async function sendMessage(api, event, message, thread_id, message_id, bn, voice) {
    if (bn === undefined) {
        bn = true;
    }
    if (voice === undefined) {
        voice = true;
    }
    if (thread_id === undefined) {
        thread_id = event.threadID;
    }
    if (message_id === undefined) {
        message_id = event.messageID;
    }
    if (!users.admin.includes(event.senderID) && settings.preference.onDelay && bn) {
        await wait(2000);
    }
    if (groups.list[event.threadID] === undefined && event.senderID != currentID) {
        userPresence[event.threadID] = new Date();
    }
    if (message == "" || (!(message.body == undefined) && message.body == "")) {
        sendMMMS(api, event, "It appears the AI sends a blank message. Please try again.");
    } else if (event.isGroup && event.senderID != currentID) {
        if (thread[event.threadID] === undefined || thread[event.threadID].length == 0 || thread[event.threadID][0] != thread[event.threadID][1]) {
            utils.logged("send_message_reply " + event.threadID + " " + JSON.stringify(message));
            if (voice && typeof message === "string" && message.length < 200 && groups.tts.includes(event.threadID)) {
                const url = GoogleTTS.getAudioUrl(message, voice);
                let time = getTimestamp();
                let dir = __dirname + "/cache/audios/tts_" + time + ".mp3";
                downloadFile(url, dir).then((response) => {
                    let message = {
                        attachment: fs.createReadStream(dir),
                    };
                    api.sendMessage(
                        message,
                        thread_id,
                        (err, messageInfo) => {
                            if (err) {
                                utils.logged(err);
                                api.sendMessage(
                                    updateFont("Unable to send message. Please try it again later.", event.senderID),
                                    thread_id,
                                    (err, messageInfo) => {
                                        if (err) utils.logged(err);
                                    },
                                    message_id
                                );
                            }
                        },
                        message_id
                    );
                    unLink(dir);
                });
            } else {
                api.sendMessage(
                    updateFont(message, event.senderID),
                    thread_id,
                    (err, messageInfo) => {
                        sendMessageErr(api, thread_id, message_id, event.senderID, err);
                    },
                    message_id
                );
            }
        } else {
            utils.logged("send_message " + event.threadID + " " + JSON.stringify(message));
            sendMMMS(api, message, thread_id, message_id, event.senderID, voice);
        }
    } else {
        utils.logged("send_message " + event.threadID + " " + JSON.stringify(message));
        sendMMMS(api, message, thread_id, message_id, event.senderID, voice);
    }
}

async function sendMessageOnly(api, event, message, thread_id, message_id, bn, voice) {
    if (bn === undefined) {
        bn = true;
    }
    if (voice === undefined) {
        voice = true;
    }
    if (thread_id === undefined) {
        thread_id = event.threadID;
    }
    if (message_id === undefined) {
        message_id = event.messageID;
    }
    if (!users.admin.includes(event.senderID) && settings.preference.onDelay && bn) {
        await wait(2000);
    }
    if (groups.list[event.threadID] === undefined && event.senderID != currentID) {
        userPresence[event.threadID] = new Date();
    }
    if (message == "" || (!(message.body == undefined) && message.body == "")) {
        sendMMMS(api, "It appears the AI sends a blank message. Please try again.", thread_id, message_id, event.senderID, voice);
    } else {
        utils.logged("send_message " + event.threadID + " " + JSON.stringify(message));
        sendMMMS(api, message, thread_id, message_id, event.senderID, voice);
    }
}

async function sendMMMS(api, message, thread_id, message_id, id, voiceE) {
    if (voiceE && typeof message === "string" && message.length < 200 && groups.tts.includes(thread_id)) {
        const url = GoogleTTS.getAudioUrl(message, voice);
        let time = getTimestamp();
        let dir = __dirname + "/cache/audios/tts_" + time + ".mp3";
        downloadFile(url, dir).then((response) => {
            let message = {
                attachment: fs.createReadStream(dir),
            };
            api.sendMessage(
                message,
                thread_id,
                (err, messageInfo) => {
                    if (err) {
                        utils.logged(err);
                        api.sendMessage(
                            updateFont("Unable to send message. Please try it again later.", id),
                            thread_id,
                            (err, messageInfo) => {
                                if (err) utils.logged(err);
                            },
                            message_id
                        );
                    }
                },
                message_id
            );
            unLink(dir);
        });
    } else {
        api.sendMessage(updateFont(message, id), thread_id, (err, messageInfo) => {
            sendMessageErr(api, thread_id, message_id, id, err);
        });
    }
}

function sendMessageErr(api, thread_id, message_id, id, err) {
    if (err) {
        utils.logged(err);
        if (err.error == 1545049) {
            api.sendMessage(
                updateFont("Message is too long to be sent.", id),
                thread_id,
                (err, messageInfo) => {
                    if (err) utils.logged(err);
                },
                message_id
            );
        } else if (err.error == 1545051) {
            api.sendMessage(
                updateFont("Failure to send the response due to an invalid image.", id),
                thread_id,
                (err, messageInfo) => {
                    if (err) utils.logged(err);
                },
                message_id
            );
        } else if (err.error == 1404102) {
            api.sendMessage(
                updateFont("Failure to send message because the reponse contains url in which prohibited in Facebook.", id),
                thread_id,
                (err, messageInfo) => {
                    if (err) utils.logged(err);
                },
                message_id
            );
        } else if (err.error == 1545023) {
            api.sendMessage(
                updateFont("The AI response seems empty. No idea why thought.", id),
                thread_id,
                (err, messageInfo) => {
                    if (err) utils.logged(err);
                },
                message_id
            );
        } else {
            api.sendMessage(
                updateFont("Unable to send message. Please try it again later.", id),
                thread_id,
                (err, messageInfo) => {
                    if (err) utils.logged(err);
                },
                message_id
            );
        }
    }
}

async function reactMessage(api, event, reaction) {
    if (isMyId(event.senderID)) {
        return;
    }
    await wait(4000);
    if (reaction === undefined) {
        utils.logged("react_message undefined " + event.messageID);
        return;
    }
    utils.logged("react_message " + event.threadID + " " + event.messageID + " " + reaction);
    api.setMessageReaction(reaction, event.messageID, (err) => {
        if (err) utils.logged(err);
    }, true);
}

function formatQuery(string) {
    let str = string.replace(pictographic, "");
    let normal = str.normalize("NFKC");
    let specialCharacters = normal.replace(normalize, "");
    let latin = specialCharacters.replace(latinC, "");
    return latin.toLowerCase();
}

function getFormattedDate() {
    return new Date()
        .toLocaleString("en-US", {
            timeZone: "Asia/Manila",
        })
        .replace(",", "");
}

function containsAny(str, substrings) {
    let i;
    for (i = 0; i != substrings.length; i++) {
        let substring = substrings[i];
        if (str.indexOf(substring) != -1) {
            return true;
        }
    }
    return false;
}

function isGoingToFast(event) {
    let input = event.body;
    commandCalls = commandCalls + 1;
    utils.logged("event_body " + event.senderID + " " + input);
    if (!settings.preference.preventSimultaneousExecution) {
        return false;
    }
    if (!users.admin.includes(event.senderID)) {
        if (!(cmd[event.senderID] === undefined)) {
            if (Math.floor(Date.now() / 1000) < cmd[event.senderID]) {
                let seconds = (cmd[event.senderID] - Math.floor(Date.now() / 1000)) % 20;
                if (seconds > 3) {
                    utils.logged("block_user " + event.senderID + " " + seconds);
                    return true;
                }
                return false;
            }
        }
        cmd[event.senderID] = Math.floor(Date.now() / 1000) + 20;
        return false;
    }
    return false;
}

function isGoingToFast1(event, list, time) {
    if (!(list[event.threadID] === undefined)) {
        if (Math.floor(Date.now() / 1000) < list[event.threadID]) {
            utils.logged("going_to_fast " + event.threadID + " " + ((list[event.threadID] - Math.floor(Date.now() / 1000)) % (60 * time)));
            return true;
        }
    }
    list[event.threadID] = Math.floor(Date.now() / 1000) + 60 * time;
    return false;
}

const checkFound = (text) => {
    return text ? text : "No data";
};

async function getResponseData(url) {
    utils.logged("response_data " + url);
    let data = await axios
        .get(encodeURI(url))
        .then((response) => {
            if (response.data.error === undefined) {
                return response.data;
            } else {
                utils.logged("response_null " + url);
                return null;
            }
        })
        .catch((err) => {
            utils.logged("response_data_err " + err);
            return null;
        });
    return data;
}

function countWords(str) {
    try {
        return str.split(" ").filter(function (n) {
            return n != "";
        }).length;
    } catch (err) {
        return 5;
    }
}

function countVowel(str) {
    const count = str.match(/[aeiou]/gi).length;
    return count;
}

function countConsonants(str) {
    var countConsonants = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] !== "a" && str[i] !== "e" && str[i] !== "i" && str[i] !== "o" && str[i] !== "u" && str[i] !== " ") {
            countConsonants++;
        }
    }
    return countConsonants;
}

function nsfw(text) {
    return (
        (text.includes("jabol") ||
            text.includes("nude") ||
            text.includes("hentai") ||
            text.includes("milf") ||
            text.includes("masturbate") ||
            text.includes("pussy") ||
            text.includes("dick") ||
            text.includes("horny") ||
            text.includes("blowjob") ||
            text.includes("lolli ") ||
            text.includes("sex ") ||
            text.includes("jakol ") ||
            text.includes("kantot ") ||
            text.includes("jabol ") ||
            text.includes("porn ") ||
            text.includes("sex ")) &&
        !settings.preference.onNsfw
    );
}

function getProfilePic(id) {
    return "https://graph.facebook.com/" + id + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
}

function isMe(query) {
    return query.includes("melvin jones repol") || query.includes("melvin jones") || query.includes("melvin jones gallano repol") || query.includes("mj") || query.includes("mrepol742");
}

function isMorning(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 3 && curHr <= 11;
}

function isAfternoon(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 12 && curHr <= 17;
}

function isEvening(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 18 && curHr <= 21;
}

function isNight(tz) {
    var curHr = getTimeDate(tz).getHours();
    return curHr >= 22;
}

function getDayNightTime(tz) {
    if (isMorning(tz)) {
        return "morning";
    } else if (isEvening(tz)) {
        return "evening";
    } else if (isAfternoon(tz)) {
        return "afternoon";
    }
    return "night";
}

function formateDate(tz) {
    var hours = getTimeDate(tz).getHours();
    var minutes = getTimeDate(tz).getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
}

function getDay(tz) {
    return days[getTimeDate(tz).getDay()];
}

function getDayN(tz) {
    return getTimeDate(tz).getDate();
}

function getMonth(tz) {
    return months[getTimeDate(tz).getMonth()];
}

function getTimeDate(tz) {
    return new Date(
        new Date().toLocaleString("en-US", {
            timeZone: tz,
        })
    );
}

function getSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function isMyId(id) {
    return id == "100090779792636" || id == "100071743848974" || id == "100090779792636";
}

function getWelcomeImage(name, gname, Tmem, id) {
    return "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + encodeURI(name) + "&text2=" + encodeURI(gname) + "&text3=" + getSuffix(Tmem) + " member&avatar=";
}

async function getImages(api, event, images) {
    reactMessage(api, event, ":heart:");
    let time = getTimestamp();
    let name = [];
    let i;
    for (i = 0; i < parseInt(settings.preference.max_image) && i < images.length; i++) {
        let url = images[i].url;
        if (!url.startsWith("https://upload.wikimedia.org") && !url.startsWith("https://lookaside.fbsbx.com")) {
            await wait(1000);
            let fname = __dirname + "/cache/images/findimg_" + i + "_" + time + ".png";
            downloadFile(encodeURI(url), fname).then((response) => {
                name.push(fname);
                utils.logged(url);
            });
        }
    }
    await wait(1000);
    let accm = [];
    let i1;
    for (i1 = 0; i1 < name.length; i1++) {
        accm.push(fs.createReadStream(name[i1]));
    }
    let message = {
        body: "",
        attachment: accm,
    };
    sendMessage(api, event, message);
    await wait(2000);
    let i2;
    for (i2 = 0; i2 < name.length; i2++) {
        unLink(name[i2]);
    }
}

async function unsendPhoto(api, event, d) {
    let time = getTimestamp();
    let arr = d[1][2];
    let images = [];
    let i;
    for (i = 0; i < arr.length; i++) {
        await wait(1000);
        let fname = __dirname + "/cache/images/unsend_photo_" + i + "_" + time + ".png";
        downloadFile(d[1][2][i], fname);
        images.push(fname);
    }
    await wait(1000);
    let accm = [];
    let i1;
    for (i1 = 0; i1 < images.length; i1++) {
        accm.push(fs.createReadStream(images[i1]));
    }
    api.getUserInfo(event.senderID, (err, data) => {
        if (err) return utils.logged(err);
        if (groups.list[event.threadID] === undefined) {
            let constructMMM = "You deleted this";
            if (images.length > 1) {
                constructMMM += " photos. \n";
            } else {
                constructMMM += " photo. \n";
            }
            if (!(d[1][3] === undefined)) {
                constructMMM += d[1][3];
            }
            let message1 = {
                body: constructMMM,
                attachment: accm,
            };
            sendMessageOnly(api, event, message1);
            let i3;
            for (i3 = 0; i3 < images.length; i3++) {
                unLink(images[i3]);
            }
            utils.logged("unsend_photo " + d[1][0]);
        } else {
            let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
            if (!(d[1][3] === undefined)) {
                constructMMM += d[1][3];
            }
            let message1 = {
                body: constructMMM,
                attachment: accm,
                /*
                mentions: [{
                    tag: '@' + data[event.senderID]['firstName'],
                    id: event.senderID,
                    fromIndex: 0
                }]
                */
            };
            sendMessageOnly(api, event, message1);
            let i2;
            for (i2 = 0; i2 < images.length; i2++) {
                unLink(images[i2]);
            }
            utils.logged("unsend_photo_group " + d[1][0]);
        }
    });
}

async function unsendGif(api, event, d) {
    let time = getTimestamp();
    let arr = d[1][2];
    let images = [];
    let i;
    for (i = 0; i < arr.length; i++) {
        await wait(1000);
        let fname = __dirname + "/cache/images/unsend_gif_" + i + "_" + time + ".png";
        downloadFile(d[1][2][i], fname);
        images.push(fname);
    }
    await wait(1000);
    let accm = [];
    let i1;
    for (i1 = 0; i1 < images.length; i1++) {
        accm.push(fs.createReadStream(images[i1]));
    }
    api.getUserInfo(event.senderID, (err, data) => {
        if (err) return utils.logged(err);
        if (groups.list[event.threadID] === undefined) {
            let constructMMM = "You deleted this";
            if (images.length > 1) {
                constructMMM += " gifs. \n";
            } else {
                constructMMM += " gif. \n";
            }
            if (!(d[1][3] === undefined)) {
                constructMMM += d[1][3];
            }
            let message1 = {
                body: constructMMM,
                attachment: accm,
            };
            sendMessageOnly(api, event, message1);
            let i3;
            for (i3 = 0; i3 < images.length; i3++) {
                unLink(images[i3]);
            }
            utils.logged("unsend_gif " + d[1][0]);
        } else {
            let constructMMM = data[event.senderID]["firstName"] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n";
            if (!(d[1][3] === undefined)) {
                constructMMM += d[1][3];
            }
            let message1 = {
                body: constructMMM,
                attachment: accm,
                /*
                mentions: [{
                    tag: '@' + data[event.senderID]['firstName'],
                    id: event.senderID,
                    fromIndex: 0
                }]
                */
            };
            sendMessageOnly(api, event, message1);
            let i2;
            for (i2 = 0; i2 < images.length; i2++) {
                unLink(images[i2]);
            }
            utils.logged("unsend_gif_group " + d[1][0]);
        }
    });
}

async function bgRemove(api, event) {
    let time = getTimestamp();
    let url = [];
    let i55;
    for (i55 = 0; i55 < event.messageReply.attachments.length; i55++) {
        url.push(event.messageReply.attachments[i55].url);
    }

    let i66;
    for (i66 = 0; i66 < url.length; i66++) {
        await wait(1000);
        let name = "removebg_" + i66 + "_" + time + ".png";
        let dataUrl = __dirname + "/cache/images/" + name;
        downloadFile(encodeURI(url[i66]), dataUrl).then((response) => {
            const formData = new FormData();
            formData.append("size", "auto");
            formData.append("image_file", fs.createReadStream(dataUrl), name);

            axios({
                method: "post",
                url: "https://api.remove.bg/v1.0/removebg",
                data: formData,
                responseType: "arraybuffer",
                headers: {
                    ...formData.getHeaders(),
                    "X-Api-Key": "UB8WrY6YRzeeZDTsxv9NYQ9C",
                },
                encoding: null,
            })
                .then((res) => {
                    utils.logged(res.status);
                    if (res.status == 200) {
                        fs.writeFileSync(dataUrl, res.data);
                        utils.logged("done " + dataUrl);
                    }
                })
                .catch((error) => {
                    return utils.logged(error);
                });
        });
    }

    await wait(2000);

    let accm = [];
    let i1;
    for (i1 = 0; i1 < url.length; i1++) {
        accm.push(fs.createReadStream(__dirname + "/cache/images/removebg_" + i1 + "_" + time + ".png"));
    }
    let message1 = {
        attachment: accm,
    };
    sendMessage(api, event, message1);
    await wait(2000);
    let i22;
    for (i22 = 0; i22 < url.length; i22++) {
        unLink(__dirname + "/cache/images/removebg_" + i22 + "_" + time + ".png");
    }
}

async function unLink(dir) {
    await wait(1000 * 120);
    fs.unlink(dir, (err) => {
        if (err) utils.logged(err);
        utils.logged("un_link " + dir);
    });
}

const convertBytes = function (bytes) {
    if (bytes == 0) {
        return "n/a";
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) {
        return bytes + " " + sizesM[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizesM[i];
};

function secondsToTime(e) {
    let h = parseInt(
        Math.floor(e / 3600)
            .toString()
            .padStart(2, "0"),
        10
    );
    let m = parseInt(
        Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
        10
    );
    let s = parseInt(
        Math.floor(e % 60)
            .toString()
            .padStart(2, "0"),
        10
    );
    let constructTime = "";
    if (h >= 1) {
        if (h == 1) {
            constructTime += h + " hour ";
        } else {
            constructTime += h + " hours ";
        }
    }
    if (m >= 1) {
        if (m == 1) {
            constructTime += m + " minute ";
        } else {
            constructTime += m + " minutes ";
        }
    }
    if (s >= 1) {
        if (s == 1) {
            constructTime += s + " second";
        } else {
            constructTime += s + " seconds";
        }
    }
    constructTime += ".";
    let test = constructTime.split(" ");
    if (test.length > 5) {
        return constructTime.replaceAll("hour ", "hour, ").replaceAll("hours ", "hours, ").replaceAll("minute ", "minute and ").replaceAll("minutes ", "minutes and ");
    }
    return constructTime.replaceAll("minute ", "minute and ").replaceAll("minutes ", "minutes and ");
}

function removeUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    api.removeUserFromGroup(id, event.threadID, (err) => {
        if (err) utils.logged(err);
        utils.logged("user_remove " + event.threadID + " " + id);
    });
}

function blockUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (users.blocked.includes(id)) {
        sendMessage(api, event, "It's already blocked.");
        return;
    }
    users.blocked.push(id);
    if (users.admin.includes(id)) {
        users.admin = users.admin.filter((item) => item !== id);
        sendMessage(api, event, "The user " + id + " is blocked and it's admin status is being revoked.");
    } else {
        sendMessage(api, event, "The user " + id + " is blocked.");
    }
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function blockGroup(api, event, id) {
    if (groups.blocked.includes(id)) {
        sendMessage(api, event, "Group is already blocked.");
        return;
    }
    groups.blocked.push(id);
    sendMessage(api, event, "The group " + id + " is blocked.");
    fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
}

function unblockGroup(api, event, id) {
    if (!groups.blocked.includes(id)) {
        sendMessage(api, event, "The group is not blocked.");
        return;
    }
    groups.blocked = groups.blocked.filter((item) => item !== id);
    sendMessage(api, event, "The group " + id + " can now use my commands.");
    fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
}

function enableTTS(api, event, id) {
    groups.tts.push(id);
    sendMessage(api, event, "Speech Synthesis is turn on for thread " + id);
    fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
}

function disableTTS(api, event, id) {
    groups.tts = groups.tts.filter((item) => item != id);
    sendMessage(api, event, "Speech Synthesis is turn off for thread " + id);
    fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
}

function enableSmartReply(api, event, id) {
    users.smart_reply.push(id);
    sendMessage(api, event, "Smart Reply is turn on for thread " + id);
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function disableSmartReply(api, event, id) {
    users.smart_reply = users.smart_reply.filter((item) => item !== id);
    sendMessage(api, event, "Smart Reply is turn off for thread " + id);
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function unblockUser(api, event, id) {
    if (!users.blocked.includes(id)) {
        sendMessage(api, event, "The user is not blocked.");
        return;
    }
    users.blocked = users.blocked.filter((item) => item !== id);
    sendMessage(api, event, "The user " + id + " can now use my commands.");
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function fontIgnore(api, event, id) {
    if (users.font_ignore.includes(id)) {
        sendMessage(api, event, "I already got it!");
        return;
    }
    users.font_ignore.push(id);
    sendMessage(api, event, "Custom font deactive for user " + id);
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function addAdmin(api, event, id) {
    if (users.blocked.includes(id)) {
        sendMessage(api, event, "I am unable to grand admin permission on a blocked user.");
        return;
    }
    if (users.admin.includes(id)) {
        sendMessage(api, event, "It's already an admin!");
        return;
    }
    users.admin.push(id);
    sendMessage(api, event, "Admin permission granted.");
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function remAdmin(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (!users.admin.includes(id)) {
        sendMessage(api, event, "The user has no admin rights to take away.");
        return;
    }
    users.admin = users.admin.filter((item) => item !== id);
    sendMessage(api, event, "Admin permission removed.");
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
}

function changeNickname(api, event, id, text) {
    if (isMyId(id)) {
        return;
    }
    api.getUserInfo(id, (err, info) => {
        if (err) return utils.logged(err);
        let name = info[id]["name"];
        let inp;
        if (text.startsWith("@me")) {
            inp = text.substring(4);
        } else {
            text.substring(name.length + 2);
        }
        api.changeNickname(inp, event.threadID, id, (err) => {
            if (err) return sendMessage(api, event, 'Unfortunately there was an error occured while changing "' + name + '" nickname.');
        });
    });
}

function kiss(api, event, id) {
    getResponseData("https://api.satou-chan.xyz/api/endpoint/kiss").then((response) => {
        if (response == null) {
            sendMessage(api, event, "Unfortunately, There is a problem processing your request.");
        } else {
            api.getUserInfo(id, (err, info) => {
                if (err) return utils.logged(err);
                let name = info[id]["firstName"];
                let time = getTimestamp();
                let filename = __dirname + "/cache/images/kiss_" + time + ".png";
                downloadFile(encodeURI(response.url), filename).then((response) => {
                    let image = {
                        body: name,
                        attachment: fs.createReadStream(filename),
                        /*
                        mentions: [{
                            tag: '@' + name,
                            id: id,
                            fromIndex: 0
                        }]
                        */
                    };
                    sendMessage(api, event, image);
                    unLink(filename);
                });
            });
        }
    });
}

async function gun(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/gun?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/gun_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function wanted(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/wanted?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/wanted_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function clown(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/clown?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/clown_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function drip(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/drip?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/drip_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function communist(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/communist?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/communist_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function advert(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/ad?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/advert_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function uncover(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/uncover?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/uncover_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function jail(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/jail?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/jail_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function invert(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/invert?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/invert_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function pet(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/pet?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/pet_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function mnm(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/mnm?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/mnm_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function greyscale(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/greyscale?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/greyscale_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function jokeover(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/jokeoverhead?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/jokeover_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function blur(api, event, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            parseImage(api, event, "https://api.popcat.xyz/blur?image=" + encodeURIComponent(response.request.res.responseUrl), __dirname + "/cache/images/blur_" + getTimestamp() + ".png");
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 90000) + Math.floor(Math.random() * 20000);
}

async function welcomeUser(api, event, name, gname, Tmem, id, message1) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            let filename = __dirname + "/cache/images/welcome_img_" + getTimestamp() + ".png";
            downloadFile(getWelcomeImage(name, gname, Tmem, id) + encodeURIComponent(response.request.res.responseUrl), filename).then((response) => {
                let message = {
                    body: message1,
                    attachment: fs.createReadStream(filename),
                    /*
                mentions: [{
                    tag: name,
                    id: id
                }]
                */
                };
                sendMessageOnly(api, event, message, event.threadID, event.messageID, false, false);
                unLink(filename);
            });
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

async function byebyeUser(api, event, name, gname, Tmem, id) {
    await axios
        .get(getProfilePic(id))
        .then(function (response) {
            let filename = __dirname + "/cache/images/byebye_" + getTimestamp() + ".jpg";
            let url =
                "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" +
                Math.floor(Math.random() * 9) +
                ".jpeg&text1=" +
                encodeURI(name) +
                "&text2=" +
                encodeURI(gname) +
                "&text3=" +
                getSuffix(Tmem) +
                " Member&avatar=" +
                encodeURIComponent(response.request.res.responseUrl);
            downloadFile(url, filename).then((response) => {
                let message = {
                    body: "Thank you for joining " + name + " but now you're leaving us.",
                    attachment: fs.createReadStream(filename),
                    /*
                mentions: [{
                    tag: name,
                    id: id
                }]
                */
                };
                sendMessageOnly(api, event, message, event.threadID, event.messageID, false, false);
                utils.logged("leave_member " + name);
                unLink(filename);
            });
        })
        .catch(function (err) {
            utils.logged(err);
        });
}

function factorial(num) {
    if (num == 0 || num == 1) {
        return 1;
    }
    return num * factorial(num - 1);
}

function findGCD(i, i2) {
    if (i2 == 0) {
        return i;
    }
    return findGCD(i2, i % i2);
}

function voiceR(api, event) {
    if (event.attachments.length != 0 && event.attachments[0].type == "audio") {
        let url = event.attachments[0].url;
        let dir = __dirname + "/cache/audios/voicer_" + getTimestamp() + ".mp3";
        downloadFile(encodeURI(url), dir).then((response) => {
            transcribeAudioFile(dir)
                .then((transcription) => {
                    event.body = transcription;
                    ai(api, event);
                    unLink(dir);
                })
                .catch((error) => {
                    unLink(dir);
                });
        });
    }
}

function saveEvent(event) {
    if (isMyId(event.senderID)) {
        return;
    }
    if (event.attachments.length != 0) {
        utils.logged("attachments_type " + event.threadID + " " + event.attachments[0].type);
        switch (event.attachments[0].type) {
            case "error":
                utils.logged("attachments_error " + JSON.stringify(event.attachments));
                break;
            case "photo":
                let photo = [];
                let i;
                for (i = 0; i < event.attachments.length; i++) {
                    photo.push(event.attachments[i].url);
                }
                let data = [getFormattedDate(), event.senderID, photo];
                if (event.body != "" && typeof event.body === "string") {
                    data.push(event.body);
                }

                msgs[event.messageID] = ["photo", data];
                break;
            case "animated_image":
                let animated_images = [];
                let i1;
                for (i1 = 0; i1 < event.attachments.length; i1++) {
                    animated_images.push(event.attachments[i1].url);
                }
                let data1 = [getFormattedDate(), event.senderID, animated_images];
                if (event.body != "" && typeof event.body === "string") {
                    data1.push(event.body);
                }
                msgs[event.messageID] = ["animated_images", data1];
                break;
            case "sticker":
                let data2 = [getFormattedDate(), event.senderID, event.attachments[0].ID];
                msgs[event.messageID] = ["sticker", data2];
                break;
            case "video":
                let data3 = [getFormattedDate(), event.senderID, event.attachments[0].url];
                if (event.body != "" && typeof event.body === "string") {
                    data3.push(event.body);
                }
                msgs[event.messageID] = ["video", data3];
                break;
            case "audio":
                let data4 = [getFormattedDate(), event.senderID, event.attachments[0].url];
                if (event.body != "" && typeof event.body === "string") {
                    data4.push(event.body);
                }
                msgs[event.messageID] = ["audio", data4];
                break;
            case "file":
                let data5 = [getFormattedDate(), event.senderID, event.attachments[0].filename, event.attachments[0].url];
                if (event.body != "" && typeof event.body === "string") {
                    data5.push(event.body);
                }
                msgs[event.messageID] = ["file", data5];
                break;
            case "location":
                msgs[event.messageID] = ["location", [getFormattedDate(), event.senderID, event.attachments[0].address, event.attachments[0].facebookUrl]];
                break;
            case "share":
                try {
                    msgs[event.messageID] = ["location_sharing", [getFormattedDate(), event.senderID, event.attachments[0].title, event.attachments[0].target.coordinate["latitude"], event.attachments[0].target.coordinate["longitude"]]];
                } catch (err) {
                    msgs[event.messageID] = ["share", [getFormattedDate(), event.senderID, event.body, event.attachments[0].url]];
                }
                break;
        }
    } else {
        msgs[event.messageID] = [getFormattedDate(), event.senderID, event.body];
    }
}

async function aiResponse(complextion, text, repeat) {
    try {
        const ai = await openai.createCompletion(generateParamaters(complextion, text));
        let text1 = ai.data.choices[0].text;
        settings.token.prompt_tokens = settings.token.prompt_tokens + ai.data.usage.prompt_tokens;
        settings.token.completion_tokens = settings.token.completion_tokens + ai.data.usage.completion_tokens;
        settings.token.total_tokens = settings.token.total_tokens + ai.data.usage.total_tokens;

        if (ai.data.choices[0].finish_reason == "length") {
            if (!text1.endsWith(".")) {
                return "The response is not complete and canceled due to its length and time required to evaluate. \nPlease try it again. Ask questions briefly, in this platform AI are so limited on words it can send.";
            }
            text1 = "This is what i only know.\n" + text1;
        }

        let text2 = text1.replace(/\n\s*\n/g, "\n");
        if (text2.startsWith("?") || text2.startsWith("!") || text2.startsWith(".") || text2.startsWith("-")) {
            text2 = text2.slice(1);
        }

        return text2;
    } catch (error) {
        if (repeat) {
            utils.logged("attempt_initiated");
            return await aiResponse(getNewComplextion(settings.preference.text_complextion), text, false);
        }
        if (!(error.response === undefined)) {
            utils.logged(error.response.status);
            if (error.response.status == 500) {
                return "Mj is currently down. Please try it again later.";
            } else if (error.response.status == 429 || error.response.status == 401) {
                return "Mj is at capacity right now. Please try it again later.";
            } else if (error.response.status == 503) {
                return "It seems like there are problems with the server. Please try it again later.";
            } else {
                return idknow[Math.floor(Math.random() * idknow.length)];
            }
        }
        return "It seems like there are problems with the server. Please try it again later.";
    }
}

function generateParamaters(complextion, text) {
    return {
        model: complextion,
        prompt: text,
        temperature: parseInt(settings.preference.temperature),
        max_tokens: parseInt(settings.preference.max_tokens),
        top_p: parseInt(settings.preference.probability_mass),
        frequency_penalty: parseInt(settings.preference.frequency_penalty),
        presence_penalty: parseInt(settings.preference.presence_penalty),
    };
}

function getNewComplextion(complextion) {
    if (complextion.includes("002")) {
        return complextion.replace("002", "003");
    }
    return complextion.replace("003", "002");
}

async function sendMessageToAll(api, event) {
    let message = event.messageReply.body;
    let time = getTimestamp();
    let count = 0;
    let format = getFormat(event.messageReply.attachments[0].type);

    if (event.messageReply.attachments.length != 0) {
        for (i55 = 0; i55 < event.messageReply.attachments.length; i55++) {
            await wait(1000);
            let dir = __dirname + "/cache/files/notify_" + i55 + "_" + time + format;
            downloadFile(encodeURI(event.messageReply.attachments[i55].url), dir);
            count++;
        }
    }
    let accm = [];
    let i1;
    for (i1 = 0; i1 < count; i1++) {
        accm.push(fs.createReadStream(__dirname + "/cache/files/notify_" + i1 + "_" + time + format));
    }
    for (gp in group) {
        if (!groups.blocked.includes(gp)) {
            await wait(20000);
            let body = {
                body: message + "\n\n" + "\n> Notification From The Developer",
                attachment: accm,
            };
            api.sendMessage(body, gp);
        }
    }
    sendMessage(api, event, "Message successfully send to " + count + " groups.");
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function otherQ(query) {
    let i;
    for (i = 0; i < sqq.length; i++) {
        if (query.startsWith(sqq[i] + " ") && query.split(" ").length > 2) {
            return true;
        }
    }
    return false;
}

function myPrefix(query, query2) {
    let i;
    for (i = 0; i < isMyPrefixList.length; i++) {
        if (query.startsWith(isMyPrefixList[i]) || (query.endsWith(isMyPrefixList[i]) && (query2.endsWith("?") || query2.endsWith(".") || query2.endsWith("!")))) {
            return true;
        }
    }
    return false;
}

function isMyPrefix(input, query, query2) {
    return (
        (settings.preference.prefix != "" && input.startsWith(settings.preference.prefix)) ||
        myPrefix(query, query2) ||
        query2.startsWith("what ") ||
        query2.startsWith("when ") ||
        query2.startsWith("who ") ||
        query2.startsWith("where ") ||
        query2.startsWith("how ") ||
        query2.startsWith("why ") ||
        query2.startsWith("which ") ||
        otherQ(query2) ||
        (settings.preference.tagalog && (query2.startsWith("ano ") || query2.startsWith("bakit ") || query2.startsWith("saan ") || query2.startsWith("sino ") || query2.startsWith("kailan ") || query2.startsWith("paano ")))
    );
}

function saveState() {
    fs.writeFileSync(__dirname + "/data/users.json", JSON.stringify(users), "utf8");
    fs.writeFileSync(__dirname + "/data/msgs.json", JSON.stringify(msgs), "utf8");
    fs.writeFileSync(__dirname + "/data/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
    fs.writeFileSync(__dirname + "/data/groups.json", JSON.stringify(groups), "utf8");
    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
}

function getIdFromUrl(url) {
    try {
        return url.match(/id=(\d+)/)[1];
    } catch (err) {}
    return "";
}

function isValidTimeZone(tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error("Time zones are not available in this environment");
    }
    try {
        Intl.DateTimeFormat(undefined, {
            timeZone: tz,
        });
        return true;
    } catch (ex) {
        return false;
    }
}

function getFormat(attach) {
    if (attach == "photo") {
        return ".png";
    } else if (attach == "animated_image") {
        return ".gif";
    } else if (attach == "video") {
        return ".mp4";
    } else if (attach == "audio") {
        return ".mp3";
    }
    return "";
}

function isValidDate(date) {
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
}

let normalMap = {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹",
};

function maven(text) {
    return text
        .split("")
        .map(function (a) {
            return normalMap[a] ? normalMap[a] : a;
        })
        .join("");
}

function updateFont(message, id) {
    if (users.font_ignore.includes(id)) {
        return message;
    }
    if (typeof message === "string") {
        if (message == "\u200Eeveryone") {
            return message;
        }
        return maven(message);
    }
    let body = message.body;
    if (body == "" || body === undefined || body == "\u200Eeveryone") {
        return message;
    }
    message.body = maven(body);
    return message;
}

function removeTags(str) {
    if (str === null || str === "") {
        return false;
    } else {
        str = str.toString();
    }
    if (str.includes("<br>")) {
        str = str.replaceAll("<br>", "\n");
    }
    return str.replace(/(<([^>]+)>)/gi, "");
}

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
        method: "get",
        url: fileUrl,
        responseType: "stream",
    }).then((response) => {
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
    });
}

function getLoad() {
    let cpus = os.cpus();
    let totalTime = -oldCPUTime;
    let totalIdle = -oldCPUIdle;
    let i;
    for (i = 0; i < cpus.length; i++) {
        let cpu = cpus[i];
        for (let type in cpu.times) {
            totalTime += cpu.times[type];
            if (type == "idle") {
                totalIdle += cpu.times[type];
            }
        }
    }
    let load = 100 - Math.round((totalIdle / totalTime) * 100);
    oldCPUTime = totalTime;
    oldCPUIdle = totalIdle;
    return load;
}

async function searchimgr(api, event, filename) {
    let img = fs.readFileSync(filename);
    let reverse = await google.search(img, {
        ris: true,
    });
    try {
        let message = {
            body: checkFound(reverse.results[0].title) + "\n\n" + reverse.results[0].url,
            url: reverse.results[0].url,
        };
        sendMessage(api, event, message, event.threadID, event.messageID, false, false);
    } catch (err) {
        sendMessage(api, event, "Unable to find any relevant results on this image.", event.threadID, event.messageID, false, false);
    }
}

async function transcribeAudioFile(filePath) {
    const formData = new FormData();
    formData.append("audio_file", fs.createReadStream(filePath), {
        contentType: "audio/mpeg",
    });
    formData.append("task", "transcribe");
    formData.append("output", "txt");

    try {
        const api_url = "http://stt.amosayomide05.cf:9000/asr?task=transcribe&output=txt";
        const response = await axios.post(api_url, formData, {
            headers: {
                ...formData.getHeaders(),
                accept: "application/json",
            },
        });
        return response.data;
    } catch (error) {
        utils.logged(error);
    }
}

function getAppState(api) {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    settings.key[0] = key.toString("hex");
    settings.key[1] = iv.toString("hex");
    fs.writeFileSync(__dirname + "/data/settings.json", JSON.stringify(settings), "utf8");
    return encrypt(JSON.stringify(api.getAppState()), settings.key[0], settings.key[1]);
}

function loadAppState(key, key1) {
    let state = fs.readFileSync(__dirname + "/data/" + settings.preference.app_state, "utf8");
    if (state.includes("facebook.com")) {
        return {
            appState: JSON.parse(state),
        };
    }
    return {
        appState: JSON.parse(decrypt(state, key, key1)),
    };
}

function caughtException(api, err) {
    crashes++;
    let message =
        `
________  Exception  ________

   ⦿ ` +
        err +
        `
____________________________
        `;
    utils.logged(message);
    api.sendMessage(message, currentID, (err, messageInfo) => {
        if (err) utils.logged(err);
    });
}

function task(func, time) {
    return setInterval(func, time);
}

function getCountryOrigin(model) {
    if (model.includes("Celeron") && model.includes("N4000") && model.includes("1.10GHz")) {
        return "The Philippines";
    }
    return "USA";
}

function getStatus() {
    if (settings.preference.isStop) {
        return "Offline";
    } else if (settings.preference.isDebugEnabled) {
        return "Maintenance";
    }
    return "Online";
}

function getRoutes() {
    return function (req, res) {
        res.setHeader("Content-Type", "text/html");
        if (!(threadInfo[req.url] === undefined)) {
            res.writeHead(200);
            let hh = threadpage + "";
            let construct = "";
            construct += "<b>Message Count: </b>" + threadInfo[req.url].messageCount + "<br>";
            construct += "<b>Members Count: </b>" + threadInfo[req.url].membersCount + "<br>";
            construct += "<b>Name</b><br>";
            construct += threadInfo[req.url].members;
            let page = hh.replaceAll("%THREAD_NAME%", threadInfo[req.url].threadName).replaceAll("%THREAD_INFO%", construct).replaceAll("%THREAD_ICON%", threadInfo[req.url].icon);
            res.end(page);
            return;
        }
        switch (req.url) {
            case "/status":
                res.writeHead(200);
                res.end(JSON.stringify({ status: getStatus() }));
                break;
            case "/":
            case "/home":
            case "/homepage":
                res.writeHead(200);
                res.end(homepage);
                break;
            default:
                res.writeHead(200);
                res.end(errorpage);
                break;
        }
    };
}

function encrypt(text, key, iv) {
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key.toString("hex"), "hex"), Buffer.from(iv.toString("hex"), "hex"));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
}

function decrypt(text, key, iv) {
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
