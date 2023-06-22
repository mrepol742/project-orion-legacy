"use strict"

let users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json", "utf8"));
let groups = JSON.parse(fs.readFileSync(__dirname + "/data/groups.json", "utf8"));
let settings = JSON.parse(fs.readFileSync(__dirname + "/data/shared_pref.json", "utf8"));

const rootAccess = "100071743848974";
const pictographic = /\p{Extended_Pictographic}/gu;
const latinC = /[^a-z0-9\s]/gi;
const normalize = /[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g;

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

async function sendMessage(api, event, message, thread_id, message_id, bn, voice, no_font) {
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
    if (no_font === undefined) {
        no_font = false;
    }
    if (!users.admin.includes(event.senderID) && settings.preference.onDelay && bn) {
        await sleep(2000);
    }
    if (!groups.list.find((thread) => event.threadID === thread.id) && event.senderID != api.getCurrentUserID()) {
        getUserProfile(event.senderID, async function (name) {
            if (userPresence[api.getCurrentUserID()] === undefined) {
                userPresence[api.getCurrentUserID()] = [];
            }
            let threadidfor = {};
            threadidfor[thread_id] = [new Date(), name.firstName];
            userPresence[api.getCurrentUserID()].push(threadidfor);
        });
    }
    if (message == "" || (!(message.body === undefined) && message.body == "")) {
        sendMMMS(api, event, "It appears the AI sends a blank message. Please try again.");
    } else if (event.isGroup && event.senderID != api.getCurrentUserID()) {
        if (thread[event.threadID] === undefined || thread[event.threadID].length == 0 || thread[event.threadID][0] != thread[event.threadID][1]) {
            utils.logged("send_message_reply " + thread_id + " " + getMessageBody(message));
            if (voice && typeof message === "string" && message.length < 200 && groups.tts.includes(event.threadID)) {
                const url = GoogleTTS.getAudioUrl(message, voiceOptions);
                let time = getTimestamp();
                let dir = __dirname + "/cache/tts_" + time + ".mp3";
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
                                sendMessageError(api, "Unable to send message. Please try it again later.", thread_id, message_id, id);
                            }
                        },
                        message_id
                    );
                    unLink(dir);
                });
            } else {
                let updateFont1 = "";
                if (no_font) {
                    updateFont1 = message;
                } else {
                    updateFont1 = await updateFont(message, event.senderID);
                }
                api.sendMessage(
                    updateFont1,
                    thread_id,
                    (err, messageInfo) => {
                        sendMessageErr(api, thread_id, message_id, event.senderID, err);
                    },
                    message_id
                );
            }
        } else {
            utils.logged("send_message " + thread_id + " " + getMessageBody(message));
            sendMMMS(api, message, thread_id, message_id, event.senderID, voice, no_font);
        }
    } else {
        utils.logged("send_message " + thread_id + " " + getMessageBody(message));
        sendMMMS(api, message, thread_id, message_id, event.senderID, voice, no_font);
    }
}

function getMessageBody(message) {
    if (typeof message === "string") {
        return message;
    }
    return message.body;
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
        await sleep(2000);
    }
    if (!groups.list.find((thread) => event.threadID === thread.id) && event.senderID != api.getCurrentUserID()) {
        getUserProfile(event.senderID, async function (name) {
            if (userPresence[api.getCurrentUserID()] === undefined) {
                userPresence[api.getCurrentUserID()] = [];
            }
            let threadidfor = {};
            threadidfor[thread_id] = [new Date(), name.firstName];
            userPresence[api.getCurrentUserID()].push(threadidfor);
        });
    }
    if (message == "" || (!(message.body === undefined) && message.body == "")) {
        sendMMMS(api, "It appears the AI sends a blank message. Please try again.", thread_id, message_id, event.senderID, voice, false);
    } else {
        utils.logged("send_message " + event.threadID + " " + JSON.stringify(message));
        sendMMMS(api, message, thread_id, message_id, event.senderID, voice, false);
    }
}

async function sendMMMS(api, message, thread_id, message_id, id, voiceE, no_font) {
    if (voiceE && typeof message === "string" && message.length < 200 && groups.tts.includes(thread_id)) {
        const url = GoogleTTS.getAudioUrl(message, voiceOptions);
        let time = getTimestamp();
        let dir = __dirname + "/cache/tts_" + time + ".mp3";
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
                        sendMessageError(api, "Unable to send message. Please try it again later.", thread_id, message_id, id);
                    }
                },
                message_id
            );
            unLink(dir);
        });
    } else {
        let updateFont1 = "";
        if (no_font) {
            updateFont1 = message;
        } else {
            updateFont1 = await updateFont(message, id);
        }
        let num = Math.floor(Math.random() * 10);
        if (num % 2 == 0) {
            api.sendMessage(updateFont1, thread_id, (err, messageInfo) => {
                sendMessageErr(api, thread_id, message_id, id, err);
            });
        } else {
            api.sendMessage(
                updateFont1,
                thread_id,
                (err, messageInfo) => {
                    sendMessageErr(api, thread_id, message_id, id, err);
                },
                message_id
            );
        }
    }
}

function sendMessageErr(api, thread_id, message_id, id, err) {
    if (err) {
        utils.logged(err);
        if (err.error == 1545049) {
            sendMessageError(api, "Message is too long to be sent.", thread_id, message_id, id);
        } else if (err.error == 1545051) {
            sendMessageError(api, "Failure to send the response due to an invalid image.", thread_id, message_id, id);
        } else if (err.error == 1404102) {
            sendMessageError(api, "Failure to send message because the reponse contains url in which prohibited in Facebook.", thread_id, message_id, id);
        } else if (err.error == 1545023) {
            sendMessageError(api, "The AI response seems empty. No idea why thought.", thread_id, message_id, id);
        } else if (err.error == "Invalid url") {
            sendMessageError(api, "The message contains invalid link so it was not sent.", thread_id, message_id, id);
        } else {
            sendMessageError(api, "Unable to send message. Please try it again later.", thread_id, message_id, id);
        }
    }
}

function sendMessageError(api, message, thread_id, message_id, id) {
    api.sendMessage(
        updateFont(message, id),
        thread_id,
        (err, messageInfo) => {
            if (err) utils.logged(err);
        },
        message_id
    );
}

async function reactMessage(api, event, reaction) {
    if (isMyId(event.senderID)) {
        return;
    }
    if (emo.includes(event.messageID)) {
        return;
    }
    await sleep(4000);
    if (reaction === undefined) {
        return;
    }
    utils.logged("react_message " + event.threadID + " " + reaction);
    api.setMessageReaction(
        reaction,
        event.messageID,
        (err) => {
            if (err) utils.logged(err);
        },
        true
    );
}

function isBlockedSentence(str) {
    if ((/you're\sthe\s/.test(str) && /\smember\sof\sthis\s(shitty\sgroup|group)/.test(str)) || /unable\sto\sre-add\smember/.test(str) || /^active\santiout\smode/.test(str)) {
        return true;
    }
    if (/(you\shave\sbeen\sdetected\sas\sa\sbot|\supdate\suser\snicknames\s|\syour\skeyboard\shero\slevel\shas\sreached\slevel\s|\supdate\sthe\sgroup\sname\sto\s|you\shave\sno\spermission\sto\suse\scommand\s|here's\syour\smusic,\senjoy|how\scan\si\sassist\syou\stoday\?)/.test(str)) {
        return true;
    }
    return /(ina\smo\s|\stang-ina\s|\swala\skang\ssilbi\s|\swala\skang\skwenta\s|\sg4gu\s|\sgagu\s|\sbaliw\ska\s|\shayup\ska\s|\sulol\s|\sb1l4t\s|\sbilat\s|\staena\s|\stae\s|\sbobo\s|\spangit\smo\s|\sg4g0\s|\sgag0\s|\sgago\s|\st4ng1n4\s|\st4ngina\s|\stangina\s|\sliit\stt\s|\skain\stt\s|\st4mod\s|\stam0d\s|\st4m0d\s|\st1t1\s|\sp3p3\s|\spepe\s|\stite\s|\stamd\s|\stamod\s|\seat\sme\s|\sughhh\s|\sugh\s|\s1yut\s|\s1yut1n\s|\siyutin\s|\siyutan\s|\skantotan\s|\siyut\s|\skantot\s|\sahole\s|\sanus\s|\sash0le\s|\sash0les\s|\sasholes\s|\s\sass\s|\sAss\sMonkey\s|\sAssface\s|\sassh0le\s|\sassh0lez\s|\sasshole\s|\sassholes\s|\sassholz\s|\sasswipe\s|\sazzhole\s|\sbassterds\s|\sbastard\s|\sbastards\s|\sbastardz\s|\sbasterds\s|\sbasterdz\s|\sBiatch\s|\sbitch\s|\sbitches\s|\sBlow\sJob\s|\sboffing\s|\sbutthole\s|\sbuttwipe\s|\sc0ck\s|\sc0cks\s|\sc0k\s|\sCarpet\sMuncher\s|\scawk\s|\scawks\s|\sClit\s|\scnts\s|\scntz\s|\scock\s|\scockhead\s|\scock-head\s|\scocks\s|\sCockSucker\s|\scock-sucker\s|\scrap\s|\scum\s|\scunt\s|\scunts\s|\scuntz\s|\sdick\s|\sdild0\s|\sdild0s\s|\sdildo\s|\sdildos\s|\sdilld0\s|\sdilld0s\s|\sdominatricks\s|\sdominatrics\s|\sdominatrix\s|\sdyke\s|\senema\s|\sf\su\sc\sk\s|\sf\su\sc\sk\se\sr\s|\sfag\s|\sfag1t\s|\sfaget\s|\sfagg1t\s|\sfaggit\s|\sfaggot\s|\sfagg0t\s|\sfagit\s|\sfags\s|\sfagz\s|\sfaig\s|\sfaigs\s|\sfart\s|\sflipping\sthe\sbird\s|\sfuck\s|\sfucker\s|\sfuckin\s|\sfucking\s|\sfucks\s|\sFudge\sPacker\s|\sfuk\s|\sFukah\s|\sFuken\s|\sfuker\s|\sFukin\s|\sFukk\s|\sFukkah\s|\sFukken\s|\sFukker\s|\sFukkin\s|\sg00k\s|\sGod-damned\s|\sh00r\s|\sh0ar\s|\sh0re\s|\shells\s|\shoar\s|\shoor\s|\shoore\s|\sjackoff\s|\sjap\s|\sjaps\s|\sjerk-off\s|\sjisim\s|\sjiss\s|\sjizm\s|\sjizz\s|\sknob\s|\sknobs\s|\sknobz\s|\skunt\s|\skunts\s|\skuntz\s|\sLezzian\s|\sLipshits\s|\sLipshitz\s|\smasochist\s|\smasokist\s|\smassterbait\s|\smasstrbait\s|\smasstrbate\s|\smasterbaiter\s|\smasterbate\s|\smasterbates\s|\sMotha\sFucker\s|\sMotha\sFuker\s|\sMotha\sFukkah\s|\sMotha\sFukker\s|\sMother\sFucker\s|\sMother\sFukah\s|\sMother\sFuker\s|\sMother\sFukkah\s|\sMother\sFukker\s|\smother-fucker\s|\sMutha\sFucker\s|\sMutha\sFukah\s|\sMutha\sFuker\s|\sMutha\sFukkah\s|\sMutha\sFukker\s|\sn1gr\s|\snastt\s|\snigger;\s|\snigur;\s|\sniiger;\s|\sniigr;\s|\sorafis\s|\sorgasim;\s|\sorgasm\s|\sorgasum\s|\soriface\s|\sorifice\s|\sorifiss\s|\spacki\s|\spackie\s|\spacky\s|\spaki\s|\spakie\s|\spaky\s|\specker\s|\speeenus\s|\speeenusss\s|\speenus\s|\speinus\s|\spen1s\s|\spenas\s|\spenis\s|\spenis-breath\s|\spenus\s|\spenuus\s|\sPhuc\s|\sPhuck\s|\sPhuk\s|\sPhuker\s|\sPhukker\s|\spolac\s|\spolack\s|\spolak\s|\sPoonani\s|\spr1c\s|\spr1ck\s|\spr1k\s|\spusse\s|\spussee\s|\spussy\s|\spuuke\s|\spuuker\s|\sqweir\s|\srecktum\s|\srectum\s|\sretard\s|\ssadist\s|\sscank\s|\sschlong\s|\sscrewing\s|\ssemen\s|\ssex\s|\ssexy\s|\sSh!t\s|\ssh1t\s|\ssh1ter\s|\ssh1ts\s|\ssh1tter\s|\ssh1tz\s|\sshit\s|\sshits\s|\sshitter\s|\sShitty\s|\sShity\s|\sshitz\s|\sShyt\s|\sShyte\s|\sShytty\s|\sShyty\s|\sskanck\s|\sskank\s|\sskankee\s|\sskankey\s|\sskanks\s|\sSkanky\s|\sslag\s|\sslut\s|\ssluts\s|\sSlutty\s|\sslutz\s|\sson-of-a-bitch\s|\stit\s|\sturd\s|\sva1jina\s|\svag1na\s|\svagiina\s|\svagina\s|\svaj1na\s|\svajina\s|\svullva\s|\svulva\s|\sw0p\s|\swh00r\s|\swh0re\s|\swhore\s|\sxrated\s|\sxxx\s|\sb!+ch\s|\sbitch\s|\sblowjob\s|\sclit\s|\sarschloch\s|\sfuck\s|\sshit\s|\sass\s|\sasshole\s|\sb!tch\s|\sb17ch\s|\sb1tch\s|\sbastard\s|\sbi+ch\s|\sboiolas\s|\sbuceta\s|\sc0ck\s|\scawk\s|\schink\s|\scipa\s|\sclits\s|\scock\s|\scum\s|\scunt\s|\sdildo\s|\sdirsa\s|\sejakulate\s|\sfatass\s|\sfcuk\s|\sfuk\s|\sfux0r\s|\shoer\s|\shore\s|\sjism\s|\skawk\s|\sl3itch\s|\sl3i+ch\s|\smasturbate\s|\smasterbat\*\s|\smasterbat3\s|\smotherfucker\s|\ss\.o\.b\.\s|\smofo\s|\snazi\s|\snigga\s|\snigger\s|\snutsack\s|\sphuck\s|\spimpis\s|\sscrotum\s|\ssh!t\s|\sshemale\s|\sshi+\s|\ssh!+\s|\sslut\s|\ssmut\s|\steets\s|\stits\s|\sboobs\s|\sb00bs\s|\steez\s|\stestical\s|\stesticle\s|\stitt\s|\sw00se\s|\sjackoff\s|\swank\s|\swhoar\s|\swhore\s|\s\*damn\s|\s\*dyke\s|\s\*fuck\*\s|\s\*shit\*\s|\s@$$\s|\samcik\s|\sandskota\s|\sarse\*\s|\sassrammer\s|\sayir\s|\sbi7ch\s|\sbitch\*\s|\sbollock\*\s|\sbreasts\s|\sbutt-pirate\s|\scabron\s|\scazzo\s|\schraa\s|\schuj\s|\sCock\*\s|\scunt\*\s|\sd4mn\s|\sdaygo\s|\sdego\s|\sdick\*\s|\sdike\*\s|\sdupa\s|\sdziwka\s|\sejackulate\s|\sEkrem\*\s|\sEkto\s|\senculer\s|\sfaen\s|\sfag\*\s|\sfanculo\s|\sfanny\s|\sfeces\s|\sfeg\s|\sFelcher\s|\sficken\s|\sfitt\*\s|\sFlikker\s|\sforeskin\s|\sFotze\s|\sFu\(\*\s|\sfuk\*\s|\sfutkretzn\s|\sgook\s|\sguiena\s|\sh0r\s|\sh4x0r\s|\shell\s|\shelvete\s|\shoer\*\s|\shonkey\s|\sHuevon\s|\shui\s|\sinjun\s|\sjizz\s|\skanker\*\s|\skike\s|\sklootzak\s|\skraut\s|\sknulle\s|\skuk\s|\skuksuger\s|\sKurac\s|\skurwa\s|\skusi\*\s|\skyrpa\*\s|\slesbo\s|\smamhoon\s|\smasturbat\*\s|\smerd\*\s|\smibun\s|\smonkleigh\s|\smouliewop\s|\smuie\s|\smulkku\s|\smuschi\s|\snazis\s|\snepesaurio\s|\snigger\*\s|\sorospu\s|\spaska\*\s|\sperse\s|\spicka\s|\spierdol\*\s|\spillu\*\s|\spimmel\s|\spiss\*\s|\spizda\s|\spoontsee\s|\spoop\s|\sporn\s|\sp0rn\s|\spr0n\s|\spreteen\s|\spula\s|\spule\s|\sputa\s|\sputo\s|\sqahbeh\s|\squeef\*\s|\srautenberg\s|\sschaffer\s|\sscheiss\*\s|\sschlampe\s|\sschmuck\s|\sscrew\s|\ssh!t\*\s|\ssharmuta\s|\ssharmute\s|\sshipal\s|\sshiz\s|\sskribz\s|\sskurwysyn\s|\ssphencter\s|\sspic\s|\sspierdalaj\s|\ssplooge\s|\ssuka\s|\sb00b\*\s|\stesticle\*\s|\stitt\*\s|\stwat\s|\svittu\s|\swank\*\s|\swetback\*\s|\swichser\s|\swop\*\s|\syed\s|\szabourah)/.test(
        str
    );
}

function isItBotOrNot(api, event) {
    let input = event.body;
    let eventTypes = ["photo", "animated_image", "sticker", "audio", "video", "file"];
    if (
        (isBlockedSentence(
            input
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .toLowerCase()
        ) &&
            !settings.preference.onNsfw) ||
        (input.trim().length > 5 && event.attachments.length != 0 && eventTypes.includes(event.attachments[0].type))
    ) {
        let id = event.senderID;
        if (isMyId(id)) {
            return false;
        }
        if (event.attachments.length != 0) {
            users.bot.push(id);
        } else {
            users.blocked.push(id);
        }
        let construct = "";
        if (users.admin.includes(id)) {
            users.admin = users.admin.filter((item) => item !== id);
            construct += "You have been blocked and your admin status is being revoked.";
        } else {
            construct += "You have been blocked.";
        }
        construct += "\n\nWe don't tolerate any kindof inappropriate behavoir if you think this is wrong please reach us.\n\nhttps://github.com/prj-orion/issues/issues/new?title=Account%20got%20blocked";
        sendMessageOnly(api, event, construct);
        return true;
    }
    return false;
}

function formatQuery(string) {
    // remove emojis
    let str = string.replace(pictographic, "");
    // remove custom fancy fonts
    let normal = str.normalize("NFKC");
    let specialCharacters = normal.replace(normalize, "");
    // only allow letters and numbers
    let normal1 = specialCharacters.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let latin = normal1.replace(latinC, "");
    // format to lowercase
    return latin.toLowerCase();
}

function getUserProfile(id, cb) {
    if (!users.list.find((user) => id === user.id)) {
        cb({ firstName: undefined });
    }
    users.list.find((user) => {
        if (user.id == id) {
            cb(user);
        }
    });
}

function getGroupProfile(id, cb) {
    if (!groups.list.find((thread) => id === thread.id)) {
        cb({ name: undefined });
    }
    groups.list.find((thread) => {
        if (thread.id == id) {
            cb(thread);
        }
    });
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
    formatQuery: formatQuery,

}