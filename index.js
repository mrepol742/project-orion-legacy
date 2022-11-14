const fs = require("fs");
const login = require("fca-unofficial");
const http = require('https');
const pdfdrive = require('pdfdrive-ebook-scraper');
const google = require("googlethis");
const request = require("request");
const {
    Configuration,
    OpenAIApi
} = require("openai");
const NLPCloudClient = require('nlpcloud');
const date = require('./datetime.js');
const {
    keep_alive
} = require("./keep_alive.js");
const cron = require('node-cron');
const axios = require("axios");
const weatherjs = require("weather-js")
const FormData = require('form-data');
const path = require('path');
const Innertube = require('youtubei.js');
const GoogleImages = require('google-images');
const Genius = require("genius-lyrics");

let msgs = {};
let cd = {};
let vips = [
    "100071743848974",
    "100016029218667",
    "100077318906152",
    "100037131918629",
    "100008664752303"
];
let sleep = [3000, 4000, 3500, 4500, 5000, 4800, 3800, 3200, 5200, 4600, 3200, 4300, 3400]
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "Me?", "yes?"];
let threads = ""
let threadIdMV = {};

let myAccountId = "100071743848974";
let myOtherId = "100016029218667";
let myGirlAccountId = "100077318906152";
let techhJork = "100037131918629";

let debug = false;

let help = "Help 1/7";
    help += "\n\n⦿ help [number of pages]";
    help += "\n⦿ pdf [text]";
    help += "\n⦿ dict [text]";
    help += "\n⦿ summ [text]";
    help += "\n⦿ find [text]";
    help += "\n⦿ dfind [text]";
    help += "\n⦿ findimage [text]";
    help += "\n⦿ baybayin [text]";
    help += "\n⦿ weather [location]";
    help += "\n⦿ encode64 [text]";
    help += "\n⦿ decode64 [text]";
    help += "\n⦿ facts [text]";
    help += "\n⦿ lulcat [text]";
    help += "\n⦿ mock [text]";
    help += "\n⦿ fact";
    help += "\n⦿ thoughts";
    help += "\n\nFor every action there is an equal and opposite reaction."

let help1 = "Help 2/7";
    help1 += "\n\n⦿ thoughts";
    help1 += "\n⦿ github [username]";
    help1 += "\n⦿ changeemo [emoji]";
    help1 += "\n⦿ changename [text]";
    help1 += "\n⦿ wiki [text]";
    help1 += "\n⦿ info [username]";
    help1 += "\n⦿ nickname @mention [text]";
    help1 += "\n⦿ landscape";
    help1 += "\n⦿ landscape [text]";
    help1 += "\n⦿ portrait";
    help1 += "\n⦿ portrait [text]";
    help1 += "\n⦿ problem [equation]";
    help1 += "\n⦿ pin add";
    help1 += "\n⦿ pin remove";
    help1 += "\n⦿ pin";
    help1 += "\n\nFor every action there is an equal and opposite reaction."

let help2 = "Help 3/7";
    help2 += "\n\n⦿ verse today";
    help2 += "\n⦿ verse random";
    help2 += "\n⦿ verse [book] [chapter]:[verse]";
    help2 += "\n⦿ animeqoute";
    help2 += "\n⦿ bgremove";
    help2 += "\n⦿ motivate";
    help2 += "\n⦿ inspiration";
    help2 += "\n⦿ advice";
    help2 += "\n⦿ remove";
    help2 += "\n⦿ meme";
    help2 += "\n⦿ meme --redit";
    help2 += "\n⦿ drake [text1]: [text2]";
    help2 += "\n⦿ pooh [text1]: [text2]";
    help2 += "\n⦿ oogway [text]";
    help2 += "\n⦿ caution [text]";
    help2 += "\n\nFor every action there is an equal and opposite reaction."

let help3 = "Help 4/7";
    help3 += "\n\n⦿ alert [text]";
    help3 += "\n⦿ sadcat [text]";
    help3 += "\n⦿ biden [text]";
    help3 += "\n⦿ pika [text]";
    help3 += "\n⦿ god [text]";
    help3 += "\n⦿ website [url]";
    help3 += "\n⦿ phub [text]";
    help3 += "\n⦿ qrcode [text]";
    help3 += "\n⦿ music [text]";
    help3 += "\n⦿ video [text]";
    help3 += "\n⦿ lyrics [text]";
    help3 += "\n⦿ morse [text]";
    help3 += "\n⦿ pickup";
    help3 += "\n⦿ uid";
    help3 += "\n⦿ guid";
    help3 += "\n\nFor every action there is an equal and opposite reaction."

let help4 = "Help 5/7";
    help4 += "\n\n⦿ ig [username]";
    help4 += "\n⦿ element [name]";
    help4 += "\n⦿ imdb [title]";
    help4 += "\n⦿ steam [name]";
    help4 += "\n⦿ npm [name]";
    help4 += "\n⦿ gname";
    help4 += "\n⦿ joke";
    help4 += "\n⦿ profilepic";
    help4 += "\n⦿ wyr";
    help4 += "\n⦿ 8ball";
    help4 += "\n⦿ gmember";
    help4 += "\n⦿ car";
    help4 += "\n⦿ color";
    help4 += "\n⦿ count";
    help4 += "\n⦿ simsimi [text]";
    help4 += "\n\nFor every action there is an equal and opposite reaction."

let help5 = "Help 6/7";
    help5 += "\n\n⦿ reverse [text]";
    help5 += "\n⦿ itunes [title]";
    help5 += "\n⦿ doublestruct [text]";
    help5 += "\n⦿ translate [language] [text]";
    help5 += "\n⦿ trump [text]";
    help5 += "\n⦿ conan";
    help5 += "\n⦿ coding";
    help5 += "\n⦿ newyear";
    help5 += "\n⦿ christmas";
    help5 += "\n\nFor every action there is an equal and opposite reaction."

let help6 = "Help 7/7";
    help6 += "\n\n⦿ unsend --on";
    help6 += "\n⦿ unsend --off";
    help6 += "\n⦿ unsend --all";
    help6 += "\n⦿ setMaxTokens [integer]";
    help6 += "\n⦿ setTemperature [integer]";
    help6 += "\n⦿ setFrequencyPenalty [integer]";
    help6 += "\n⦿ setProbabilityMass [integer]";
    help6 += "\n⦿ delay --on";
    help6 += "\n⦿ delay --off";
    help6 += "\n⦿ setVIP @mention or uid";
    help6 += "\n⦿ removeVIP @mention or uid";
    help6 += "\n⦿ refresh | reload";
    help6 += "\n\nFor every action there is an equal and opposite reaction."

let apiKey = [
    // phub api key
    "CcIDaVqu",
    // graph for facebook access token
    "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662",
    // open ai api key
    "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",
    // urban dictionary api key
    "bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf",
    // nlpcloudclient summarize api key
    "5ab3c279e089139f63017eea409573731d5e8ce9"
];

cron.schedule('*/30 * * * *', () => {
    let hours = date("Asia/Manila").getHours()
    let mins = date("Asia/Manila").getMinutes()
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? '0' + mins : mins;
    api.sendMessage("Time Check " + hours + ":" + mins + " " + ampm, myAccountId);
});

cron.schedule('0 * * * *', () => {
    let A = api.getAppState();
    let B = JSON.stringify(A);
    fs.writeFileSync("fb.json", B, "utf8");
    api.sendMessage("AppState refresh...", myAccountId)
});

let settings = JSON.parse(fs.readFileSync("cache/settings.json", "utf8"));
let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));

login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return reportIssue(api, event.threadID, err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true
    });

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return console.log(err);

        if (debug) {
            if (event.type == "message" || event.type == "message_reply") {
            let input = event.body;
            let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                if (!(vips.includes(event.senderID))) {
                if (query.startsWith("mj") || query.startsWith("repol") || query == "melvinjonesrepol" || query == "melvinjonesgallanorepol" || query.startsWith("mrepol742")) {
                    sendMessage(api, event, "Hold on a moment this system is currently in maintenance mode... only authorized uid is allowed to call and initiate its function in the moment.");
                }
                return;
                }
            }
        }

        switch (event.type) {
            case "message":
                if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    } else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    } else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    } else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    } else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                    if (event.senderID == myAccountId) {
                        console.log(event.body);
                    }
                }
                ai(api, event);
                break;
            case "message_reply":
                let msgid = event.messageID;
                let input = event.body;
                let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                msgs[msgid] = input;

                if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                    if (event.messageReply.senderID != api.getCurrentUserID()) {
                        sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                    } else {
                        api.unsendMessage(event.messageReply.messageID);
                    }
                } 

               // if (event.senderID == myGirlAccountId) {
               //     break;
                //}

                ai(api, event);
                
                if (query == "pinadd") {
                    if (event.messageReply.body == "") { 
                        sendMessage(api, event, "You need to reply pinadd to a message which is not empty to pin it.");
                    } else {
                        pinned.pin.message[event.threadID] = event.messageReply.body
                        pinned.pin.sender[event.threadID] = event.messageReply.senderID
                        sendMessage(api, event, "Message pinned.. Enter \"pin\" to show it.");
                        fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
                    }
                } else if (query == "count") {
                    if (event.messageReply.body == "") { 
                        sendMessage(api, event, "You need to reply count to a message which is not empty.");
                    } else {
                        sendMessage(api, event, "The words on this message is about " + countWords(event.messageReply.body) + " words.");
                    }
                }

                if (query == "bgremove") {
                    if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                    const {
                        threadID,
                        messageID,
                        type,
                        messageReply
                    } = event;
                    if (type != "message_reply") return
                    if (messageReply.attachments.length < 1) {
                        sendMessage(api, event, "I cannot see an image. Please reply bgremove to an image.");
                    } else if (messageReply.attachments.length > 1) {
                        sendMessage(api, event, "Opps! I cannot remove all of the images background at the same time. Please select only one image.");
                    } else if ((messageReply.attachments.length === 1) && (messageReply.attachments[0].type == 'photo')) {
                        const url = messageReply.attachments[0].url;
                        request(url).pipe(fs.createWriteStream(__dirname + '/cache/images/removebg.png')).on('finish', () => {
                            const inputPath = './cache/images/removebg.png';
                            const formData = new FormData();
                            formData.append('size', 'auto');
                            formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

                            axios({
                                    method: 'post',
                                    url: 'https://api.remove.bg/v1.0/removebg',
                                    data: formData,
                                    responseType: 'arraybuffer',
                                    headers: {
                                        ...formData.getHeaders(),
                                        'X-Api-Key': 'UB8WrY6YRzeeZDTsxv9NYQ9C',
                                    },
                                    encoding: null
                                })
                                .then((res) => {
                                    if (res.status != 200) return
                                    console.error('Error:', res.status, res.statusText);
                                    fs.writeFileSync("./cache/images/removebg.png", res.data);
                                    let message = {
                                        attachment: fs.createReadStream(__dirname + "/cache/images/removebg.png")
                                    }
                                    sendMessage(api, event, message);
                                })
                                .catch((error) => {
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                                    return reportIssue(api, event.threadID, error);
                                });
                        })
                    }
                } else {
                    sendMessage(api, event, "Hold on... There is still a request in progress.");
                    }
                
                }
                break;
            case "message_unsend":
                if (event.senderID == myAccountId) {
                    break;
                }
                    let d = msgs[event.messageID];
                    if (typeof(d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, event.threadID, err);
                            else {
                                if (d[0] == "img") {
                                    let file = fs.createWriteStream(__dirname + '/cache/images/unsend_img.jpg');
                                    let gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                let message = {
                                                    body: "@" + data[event.senderID]['name'] + " deleted this photo. \n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/unsend_img.jpg'),
                                                    mentions: [{
                                                        tag: '@' + data[event.senderID]['name'],
                                                        id: event.senderID,
                                                        fromIndex: 0
                                                    }]
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "gif") {
                                    let file = fs.createWriteStream(__dirname + '/cache/images/unsend_gif.gif');
                                    let gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                let message = {
                                                    body: "@" + data[event.senderID]['name'] + " deleted this GIF. \n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/unsend_gif.gif'),
                                                    mentions: [{
                                                        tag: '@' + data[event.senderID]['name'],
                                                        id: event.senderID,
                                                        fromIndex: 0
                                                    }]
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "sticker") {
                                    let file = fs.createWriteStream(__dirname + '/cache/images/unsend_sticker.png');
                                    let gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                let message = {
                                                    body: "@" + data[event.senderID]['name'] + " deleted this sticker.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/unsend_sticker.png'),
                                                    mentions: [{
                                                        tag: '@' + data[event.senderID]['name'],
                                                        id: event.senderID,
                                                        fromIndex: 0
                                                    }]
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vid") {
                                    let file = fs.createWriteStream(__dirname + '/cache/videos/unsend_vid.mp4');
                                    let gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                let message = {
                                                    body: "@" + data[event.senderID]['name'] + " deleted this video.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/videos/unsend_vid.mp4'),
                                                    mentions: [{
                                                        tag: '@' + data[event.senderID]['name'],
                                                        id: event.senderID,
                                                        fromIndex: 0
                                                    }]
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vm") {
                                    let file = fs.createWriteStream(__dirname + '/cache/audios/unsend_vm.mp3');
                                    let gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                let message = {
                                                    body: "@" + data[event.senderID]['name'] + " deleted this voice message.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/audios/unsend_vm.mp3'),
                                                    mentions: [{
                                                        tag: '@' + data[event.senderID]['name'],
                                                        id: event.senderID,
                                                        fromIndex: 0
                                                    }]
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, event.threadID, err);
                            else {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let message = {
                                        body: "@" + data[event.senderID]['name'] + " deleted this message.\n\n" + msgs[event.messageID],
                                        mentions: [{
                                            tag: '@' + data[event.senderID]['name'],
                                            id: event.senderID,
                                            fromIndex: 0
                                        }]
                                    }
                                    sendMessageNoReply(api, event.threadID, message);
                                }
                            }
                        });
                    }
          
            break;
            case "event":
                switch (event.logMessageType) {
                    case "log:subscribe":
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (gc.isGroup) {
                                let arr = gc.participantIDs;
                                let Tmem = arr.length;
                                let url = `https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background.jpeg&text1=${event.logMessageData.addedParticipants[0].fullName}&text2=Welcome+To+${gc.threadName}&text3=You're the +` + Tmem + `th member&avatar=https://mrepol742.github.io/project-orion/profile.jpg`;

                                request(url).pipe(fs.createWriteStream(__dirname + "/cache/images/welcome.jpg"))
                                .on('finish', () => {
                                    let message = {
                                        body: `Welcome ${event.logMessageData.addedParticipants[0].fullName}. You're the ` + Tmem + `th member of this group.`,
                                      attachment: fs.createReadStream(__dirname + "/cache/images/welcome.jpg"),
                                 };
                                  sendMessage(api, event, message);
                                 })
                              }
                        })
                        break;

                    case "log:unsubscribe":
                        let id = event.logMessageData.leftParticipantFbId;
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) done(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(data)
                                    for (let prop in data) {
                                        if (data.hasOwnProperty(prop) && data[prop].name) {
                                            let gcn = gc.threadName;
                                            let arr = gc.participantIDs;
                                            let Tmem = arr.length;
                                            let url = "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background.jpeg&text1=" + data[prop].name + "&text2=Bye bye, Sayonara&text3=Member+" + Tmem + "&avatar=https://mrepol742.github.io/project-orion/profile.jpg";
                                            request(url).pipe(fs.createWriteStream(__dirname + "/cache/images/byebye.jpg"))
                                .on('finish', () => {
                                    let message = {
                                        body: `Thank you for joining ` + data[prop].name + ` but now your leaving us.`,
                                      attachment: fs.createReadStream(__dirname + "/cache/images/byebye.jpg")
                                 };
                                  sendMessage(api, event, message);
                                 })
                                        }
                                    }
                                }
                            })
                        })
                        break;
                }
                break;
        }
    });
});

function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
 }

 const wiki = async (api, topic, event) =>{
   await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`)
   .then(res=>{
   	 let extract = res.data.extract;
     sendMessage(api, event, `${extract}`);
   }).catch(err=>{
      reportIssue(api, event.threadID, err)
      sendMessage(api, event, `Unfortunately, i am not able to find the "` + topic + `".`);
   })
}


const info = (api, event)=>{
    api.getUserInfo(Object.keys(mentions), async (err, ret) => {
        if(err) return reportIssue(api, event.threadID, err);
        for(let prop in ret) {
            let {vanity,name,gender,isBirthday} = ret[prop]
            let url = encodeURI('https://graph.facebook.com/'+`${prop}`+'/picture?height=720&width=720&access_token=' + apiKey[1])
            let filename = __dirname + "/cache/images/"+ prop + ".jpg";
            let msg = `
User ID: ${prop}
Name: ${checkFound(name)}
Username: ${checkFound(vanity)}
Gender: ${gender == 1 ? "female" : "male"}
Birthday: ${checkFound(isBirthday)}  
`
            await download(url,filename,()=>{
                let message = { 
                    body: msg,
                    attachment:fs.createReadStream(filename)
                  };
                sendMessage(api, event, message);
            })
        }
    });
}

async function ai(api, event) {
    /*if (holdOn(event)) {
        return;
    }*/
    if (event.body != null) {
        let input = event.body;
        let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
        let query2 = formatQuery(input.toLowerCase());
        if (query.startsWith("mj") || query.startsWith("repol")|| query.startsWith("mrepol742") ||
        ((query.startsWith("what") || query.startsWith("when") || query.startsWith("who") || query.startsWith("where") || 
        query.startsWith("how") || query.startsWith("why") || query.startsWith("which")) && input.indexOf(" ") > 1)) {
            if (input.split(" ").length < 2) {
                if (event.senderID == myGirlAccountId) {
                    return;
                }
                if (query.startsWith("mj") || query.startsWith("repol") || query.startsWith("mrepol742")) {
                   sendMessage(api, event, "Hello the system status is online and waiting for your reply.\nFor available commands enter help, this project does not disclose any personal data. \nIn aims of breaking apart the line between human and computer.");
                } 
            } else {
                let text = input;
                if (event.senderID == myGirlAccountId) {
                    return;
                } else if (query.startsWith("repol")) {
                    text = input.substring(6)
                } else if (query.startsWith("mrepol742")) {
                    text = input.substring(10)
                } else if (query.startsWith("mj")) {
                    text = input.substring(3)
                } 
                if (nsfw(text)) {
                    sendMessage(api, event, "Shhhhhhh watch your mouth.");
                    return;
                }
                const configuration = new Configuration({
                    apiKey: apiKey[2],
                });
                const openai = new OpenAIApi(configuration);
                const {
                    data
                } = await openai.createCompletion("text-davinci-002", {
                    prompt: text,
                    temperature: 0.9,
                    max_tokens: 300,
                    top_p: 1,
                    frequency_penalty: 1,
                    presence_penalty: 0.4,
                });
                let finish = data.choices[0].text;
                if (finish.startsWith("?") || finish.startsWith("\"")) {
                    finish = finish.slice(1);
                }
                sendMessage(api, event, finish);
            }
        }
        //if (event.senderID == myGirlAccountId) {
         //   return;
       // }

        /*
        if (query.startsWith("problem")) {
            if (query2.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using problem equation instead.\nFor example:\nproblem 5*5/9")
            } else {
                let text = input;
                text = text.substring(8)
                if (text.includes("√")) {
                    const res = await sqrt(text.replace(/√/gi, ""));
                    sendMessage(api, event, res);
                } else {
                    const res = await evaluate(text);
                    sendMessage(api, event, res);
                }
            }
        } */
        if (event.type == "message") {
            if (query == "bgremove") {
                sendMessage(api, event, "You need to reply to an image in order to work.");
            } else if (query == "count") {
                sendMessage(api, event, "You need to reply to a message to count its words.");
            } else if (query == "pinadd") {
                sendMessage(api, event, "You need to reply to a message to pin a message.");
            } else if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                sendMessage(api, event, "Unable to unsent. Please reply to my message you wish to unsent.");
            }
        }
        if (query.startsWith("phub") || query.startsWith("pornhub")) {
            let id;
                if (event.type == "message") {
                    id = event.senderID;
                } else {
                    if (event.messageReply.senderID == myAccountId || event.messageReply.senderID == myOtherId) {
                        id = event.senderID;
                    } else {
                  id = event.messageReply.senderID;
                    }
                } 
            api.getUserInfo(id, (err, info) => {
                if (err) return reportIssue(api, event.threadID, err);
                let name = info[id]['name'];
                    let data = input.split(" ")
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using phub text instead.\nFor example:\nphub why i am here again.");
                    } else {
                        data.shift()
                        let phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + id + '&name=' + name + '&apikey=' + apiKey[0];
                        parseImage(api, event, phublink, __dirname + '/cache/images/phubmeme.jpg');
                    }
                
            })

        } else if (query.startsWith("video")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead.\nFor example:\nvideo In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead.\nFor example:\nvideo In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp4',
                        quality: '480p',
                        type: 'videoandaudio',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550',
                        fps: '30'
                    });
                    stream.pipe(fs.createWriteStream(__dirname + '/cache/videos/video.mp4'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        console.log("Starting download...");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        console.log(`Downloading ${info.video_details.title}`);
                    });
                    stream.on('end', () => {
                        let limit = 50 * 1024 * 1024; // 50MB in bytes
                        fs.readFile(__dirname + '/cache/videos/video.mp4', function(err, data) {
                            if (err) console.log(err)
                            if (data.length > limit) {
                                sendMessage(api, event, "I cannot send the file because its file size is beyond 50mb.");
                            } else {
                                console.log("Done.");
                                let message = {
                                    body:  search.videos[0].title,
                                    attachment: [fs.createReadStream(__dirname + '/cache/videos/video.mp4')]
                                }
                                sendMessage(api, event, message);
                                threadIdMV[event.threadID] = true;
                            }
                        })
                    });
                    stream.on('error', (err) => reportIssue(api, event, err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
                }
            }
        } else if (query.startsWith("music")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead.\nFor example:\nmusic In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead.\nFor example:\nmusic In The End by Linkin Park")
                } else {
                    let timeleft = 3;
                    let downloadTimer = setInterval(function() {
                        if (timeleft <= 0) {
                            clearInterval(downloadTimer);
                        }
                        timeleft -= 1;
                    }, 1000);
                    const stream = youtube.download(search.videos[0].id, {
                        format: 'mp3',
                        bitrate: '2500',
                        audioQuality: 'highest',
                        loudnessDB: '20',
                        audioBitrate: '550'
                    });

                    stream.pipe(fs.createWriteStream(__dirname + '/cache/audios/music.mp3'));

                    stream.on('start', () => {
                        threadIdMV[event.threadID] = false;
                        console.log("Starting download now...");
                    });
                    stream.on('info', (info) => {
                        threadIdMV[event.threadID] = false;
                        console.log(`Downloading ${info.video_details.title}`);
                    });
                    stream.on('end', () => {
                        let limit = 50 * 1024 * 1024; // 50MB in bytes
                        fs.readFile(__dirname + '/cache/audios/music.mp3', function(err, data) {
                            if (err) console.log(err)
                            if (data.length > limit) {
                                sendMessage(api, event, "I cannot send the file because its file size is beyond 50mb.");
                            } else {
                                console.log("Done.");
                                let message = {
                                    body: search.videos[0].title,
                                    attachment: [fs.createReadStream(__dirname + '/cache/audios/music.mp3')]
                                }
                                sendMessage(api, event, message);
                                threadIdMV[event.threadID] = true;
                            }
                        })
                    });
                    stream.on('error', (err) => reportIssue(api, event, err));
                }
            } else {
                sendMessage(api, event, "Hold on... There is still a request in progress.");
                }
            }
        } else if (query.startsWith("lyrics")) {
                const Client = new Genius.Client("RF_40ktL7f4H55RYDtdL27nTZMewq9H9FKkJfuZmzHzq1Cpy_a4LoQi6lzsP5G2L");
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using lyrics text instead.\nFor example:\nlyrics In The End by Linkin Park")
                } else {
                    data.shift()
                    const searches = await Client.songs.search(data.join(" "));
                    const firstSong = searches[0];
                    const RES = await firstSong.lyrics();
                    sendMessage(api, event, RES);
                }
        } else if (query.startsWith("googleimage") || query2.startsWith("searchimage ") || query2.startsWith("findimage ")) {
            let data = input.split(" ");
            if (data.length < 2){
                sendMessage(api, event, "Opps! I didnt get it. You should try using findimage text instead.\nFor example:\nfindimage mark zuckerberg")
            } else {
                let imgtext = input.substring(12);
                if (input.startsWith("findimage ")) {
                    imgtext = input.substring(10);
                }
                let client = new GoogleImages('55ffad329ff5f3716', 'AIzaSyC5ojRnS7POz0t19eVwWQ0Ur0L34HZbvok');
                client.search(imgtext).then(images => {
                    for (let i = 0; (i < 6 && i < images.length); i++) {
                        request(images[i].url).pipe(fs.createWriteStream(__dirname + "/cache/images/findimg"+ i +".png"))
                    }
                   let message = {
                       attachment: [
                        fs.createReadStream(__dirname + "/cache/images/findimg0.png"),
                        fs.createReadStream(__dirname + "/cache/images/findimg1.png"),
                        fs.createReadStream(__dirname + "/cache/images/findimg2.png"),
                        fs.createReadStream(__dirname + "/cache/images/findimg3.png"),
                        fs.createReadStream(__dirname + "/cache/images/findimg4.png"),
                        fs.createReadStream(__dirname + "/cache/images/findimg5.png")
                       ]
                      };
                     api.sendMessage(message, event.threadID,  event.messageID);
                });
            }
        } else if (query.startsWith("encode64")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using encode64 text instead.\nFor example:\nencode64 fundamentals in engineering")
            } else {
                let text = input;
                text = text.substring(9)
                let buff = Buffer.from(text);
                let base64data = buff.toString('base64');
                sendMessage(api, event, base64data);
            }
        } else if (query.startsWith("decode64")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using decode64 text instead.\nFor example:\ndecode64 fundamentals in engineering")
            } else {
                let text = input;
                text = text.substring(9)
                let buff = Buffer.from(text, 'base64');
                let base642text = buff.toString('ascii');
                sendMessage(api, event, base642text);
            }
        } else if (query.startsWith("reverse")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using reverse text instead.\nFor example:\nreverse fundamentals in engineering")
            } else {
                let text = input;
                text = text.substring(8)
                let splitString = text.split("");
                let reverseArray = splitString.reverse();
                let joinArray = reverseArray.join("");
                sendMessage(api, event, joinArray);
            }
        } else if (query == "pinremove") {
           let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
            pinned.pin.message[event.threadID] = undefined
            pinned.pin.sender[event.threadID] = undefined
            sendMessage(api, event, "Pinned message removed.");
            fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
        } else if (query == "pin") {
            let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
            if (pinned.pin.message[event.threadID] == undefined) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (gc.isGroup) {
                        sendMessage(api, event, "There is no pinned message on this group chat.");
                    } else {
                        sendMessage(api, event, "There is no pinned message on this chat.");
                    }
                })
            } else {
                api.getUserInfo(pinned.pin.sender[event.threadID], (err, data) => {
                    sendMessageNoReply(api, event.threadID, pinned.pin.message[event.threadID]);
                });
            }
        } else if (query.startsWith("pdf")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pdf text instead.\nFor example:\npdf fundamentals in engineering")
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;

                    let res = await pdfdrive.findEbook(searched);
                    let res2 = await pdfdrive.getEbook(res[0].ebookUrl);

                    sendMessage(api, event, `${res2.ebookName}\n\n` + `${res2.dlUrl}`)
                } catch (err) {
                    reportIssue(api, event.threadID, err);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                }
            }
        } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query2.startsWith("dict ")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using dict text instead.\nFor example:\ndict computer");
            } else {
                let text = input.substring(17)
                if (query.startsWith("dictionary")) {
                    text = input.substring(11)
                } else if (query.startsWith("dict")) {
                    text = input.substring(5)
                }
                const options = {
                    method: 'GET',
                    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
                    params: {
                        term: text
                    },
                    headers: {
                        'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
                        'X-RapidAPI-Key': apiKey[3]
                    }
                };
                axios.request(options).then(function({
                    data
                }) {
                    let word = data.list[0].word;
                    let def = data.list[0].definition;
                    let sample = data.list[0].example;
                    let timestamp = data.list[0].written_on;
                    let source = data.list[0].permalink;
                    sendMessage(api, event, def + "\n\nExample: \n" + sample);
                }).catch(function(error) {
                    reportIssue(api, event.threadID, error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
            }
        } else if (query.startsWith("summarize") || query2.startsWith("summ ")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using summ text instead.\n\nFor example:\nsumm this sentence meant to be summarized.");
            } else {
                let text = input.substring(5);
                if (query.startsWith("summarize")) {
                    text = input.substring(11)
                }
                const client = new NLPCloudClient('bart-large-cnn', apiKey[4])
                client.summarization(text).then(function({
                    data
                }) {
                    sendMessage(api, event, data.summary_text);
                }).catch(function(err) {
                    reportIssue(api, event.threadID, err.response.data.detail);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
            }
        } 

        const searching = async (searched) => {
            let options = {
                page: 0,
                safe: false,
                additional_params: {
                    hl: "en"
                }
            }
            return await google.search(`google ${searched}`, options);
        };

        if (query.startsWith("dgoogle") || query2.startsWith("dsearch ") || query2.startsWith("dfind ")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using dgoogle text instead.\n\nFor example:\ndgoogle computer")
            } else {
                data.shift()
                axios.get('https://api.duckduckgo.com/?q=' + data.join(" ") + '&format=json&pretty=1')
                    .then(response => {
                        sendMessage(api, event, response.data.Abstract);
                    })
                    .catch(error => {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    });
            }
        }

        if (query.startsWith("google") || query2.startsWith("search ") || query2.startsWith("find ")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using google text instead.\n\nFor example:\ngoogle computer")
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;
                    let response = await searching(searched);
                    let result = response.results;
                    if (result === undefined || Object.entries(result).length === 0) {
                        throw new Error(`Unfortunately there was an error occured while searching "${searched}"`)
                    }
                    sendMessage(api, event, `${result[0].description}\n\n${result[0].url}`);
                } catch (err) {
                    reportIssue(api, event.threadID, err);
                    sendMessage(api, event, `${err.message}`);
                }
            }
        }
        if (query.startsWith("baybayin")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using baybayin text instead.\n\nFor example:\nbaybayin ako ay filipino")
            } else {
                data.shift()
                axios.get('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" "))
                    .then(response => {
                        sendMessage(api, event, response.data.baybay);
                    })
                    .catch(error => {
                        reportIssue(api, event.threadID, error);
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    })
            }
        } else if (query.startsWith("doublestruck")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using doublestruck text instead.\n\nFor example:\ndoublestruck Hello World")
                } else {
                    data.shift()
                    axios.get('https://api.popcat.xyz/doublestruck?text=' + data.join(" "))
                        .then(response => {
                            sendMessage(api, event, response.data.text);
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        })
                }
        } else if (query.startsWith("translate")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using translate language text instead.\n\nFor example:\ntranslate English Kamusta")
                } else {
                    let text = input.substring(10);
                    let lang = text.split(" ");
                    let message = text.substring(lang[0].length);
                    axios.get('https://api.popcat.xyz/translate?to=' + lang[0] + '&text=' + message)
                        .then(response => {
                            sendMessage(api, event, response.data.translated);
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        })
                }
        } else if (query.startsWith("weather")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using weather location instead.\n\nFor example:\nweather caloocan city")
            } else {
                data.shift()
                let weather = await weathersearch("weather " + data.join(" "))
                if (weather.weather == undefined || weather.weather.temperature == undefined) {
                    weatherjs.find({
                        weathersearch: data.join(" "),
                        degreeType: 'C'
                    }, (err, r) => {
                        if (err) return reportIssue(api, err)
                        let d = r[0]
                        let m = "Location: " + d.location.name + "\n"
                        m += "Temperature: " + d.current.temperature + "\n"
                        m += "Sky: " + d.current.skytext + "\n"
                        m += "Observation time: " + d.current.date + " " + d.current.observationtime
                        sendMessage(api, event, m)
                    })
                } else {
                    let output = weather.weather
                    let m = "Location: " + output.location
                    m += "\nForecast: " + output.forecast
                    m += "\nTemperature: " + output.temperature + "°F" + " (" + (Math.round(((output.temperature - 32) * 5 / 9) * 100) / 100).toFixed(2) + "°C)"
                    if (output.precipitation != undefined)
                        m += "\nPrecipitation: " + output.precipitation
                    if (output.humidity != undefined)
                        m += "\nHumidity: " + output.humidity
                    if (output.wind != undefined)
                        m += "\nWind speed: " + output.wind
                    sendMessage(api, event, m)
                }
            }
        } else if (query.startsWith("facts")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using facts text instead.\n\nFor example:\nfacts computer")
            } else {
                data.shift()
                let url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(api, event, url, __dirname + '/cache/images/facts.png');
            }
        } else if (query == "wyr" || query == "wouldyourather") {
            getResponseData("https://api.popcat.xyz/wyr").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `Would you rather ${response.ops1} or ${response.ops2}`);
                }
            });
        } else if (query == "8ball") {
            getResponseData("https://api.popcat.xyz/8ball").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.answer}`);
                }
            });

        } else if (query.startsWith("instagram") || query2.startsWith("insta ") || query2.startsWith("ig ")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead.\n\nFor example:\ninstagram melvinjonesrepol")
            } else {
                data.shift()
                let userN = data.join(" ");
                axios.get('https://api.popcat.xyz/instagram?user=' + userN)
                    .then(response => {
                        let username = response.data.username;
                        let fullname = response.data.full_name;
                        let biography = response.data.biography;
                        let posts = response.data.posts;
                        let reels = new Intl.NumberFormat().format(response.data.reels);
                        let followers = new Intl.NumberFormat().format(response.data.followers);
                        let following = new Intl.NumberFormat().format(response.data.following);
                        let private = ((response.data.private) ? "Yes" : "No");
                        let verified = ((response.data.verified) ? "Yes" : "No");
                        let profilepic = response.data.profile_pic;

                        request(profilepic).pipe(fs.createWriteStream(__dirname + '/cache/images/instaprofile.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "Username: " + username + "\nFull Name: " + fullname + "\nBio: " + biography + "\nPosts: " + posts + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/instaprofile.png')
                                };
                                sendMessage(api, event, message);
                            })
                    })
                    .catch(error => {
                        reportIssue(api, event.threadID, error);
                        sendMessage(api, event, "Unfortunately user \"" + userN + "\" was not found.");
                    })
            } 
        } else if (query.startsWith("profilepic")) {
            let id;
            if (event.type == "message_reply") {
                id = event.messageReply.senderID;
            } else {
                id = event.senderID;
            } 
            let url = "https://graph.facebook.com/"  + id + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
            parseImage(api, event, url, __dirname + '/cache/images/profilepic.png');
            
         } else if (query.startsWith("github")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using github username instead.\n\nFor example:\ngithub melvinjonesrepol")
                } else {
                    data.shift()
                    let userN = data.join(" ");
                    axios.get('https://api.popcat.xyz/github/' + userN).then(response => {
                        if (response == null) {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately github user \"" + userN + "\" was not found.");
                        } else {
                            let name = response.data.name;
                            let email = response.data.email;
                            let bio = response.data.bio;
                            let company = response.data.company;
                            let location = response.data.location;
                            let url = response.data.blog;
                            let followers = response.data.followers;
                            let following = response.data.following;
                            let public_repos = response.data.public_repos;
                            let public_gists = response.data.public_gists;
                            let avatar = response.data.avatar;
    
                            request(avatar).pipe(fs.createWriteStream(__dirname + '/cache/images/github_avatar.png'))
    
                                .on('finish', () => {
                                    let message = {
                                        body: "Name: " + name + "\nEmail: " + email + "\nBio: " + bio + "\nLocation: " + location + "\nCompany: " + company + "\nWebsite: " + url + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPublic Repository: " + public_repos + "\nPublic Gists: " + public_gists,
                                        attachment: fs.createReadStream(__dirname + '/cache/images/github_avatar.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                            }
                        })
                    
                }
            } else if (query.startsWith("element")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using element name instead.\n\nFor example:\nelement hydrogen")
                } else {
                    data.shift()
                    let symbol = data.join(" ");
                    axios.get('https://api.popcat.xyz/periodic-table?element=' + symbol).then(response => {
                        if (response == null) {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately element \"" + symbol + "\" was not found.");
                        } else {
                            let name = response.data.name;
                            let symbol = response.data.symbol;
                            let atomic_number = response.data.atomic_number;
                            let atomic_mass = response.data.atomic_mass;
                            let period = response.data.period;
                            let phase = response.data.phase;
                            let discovered_by = response.data.discovered_by;
                            let image = response.data.image;
                            let summary = response.data.summary;
    
                            request(image).pipe(fs.createWriteStream(__dirname + '/cache/images/element.png'))
    
                                .on('finish', () => {
                                    let message = {
                                        body: "Name: " + name + "\nSymbol: " + symbol + "\nAtomic Number: " + atomic_number + "\nAtomic Mass: " + atomic_mass + "\nPeroid: " + period + "\nPhase: " + phase + "\nDiscovered by: " + discovered_by + "\n\n" + summary,
                                        attachment: fs.createReadStream(__dirname + '/cache/images/element.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                            }
                        })
                
                }
            } else if (query.startsWith("npm")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using npm name instead.\n\nFor example:\nnpm mrepol742")
                } else {
                    data.shift()
                    let name = data.join(" ");
                    axios.get('https://api.popcat.xyz/npm?q=' + name).then(response => {
                        if (response == null) {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately npm \"" + name + "\" was not found.");
                        } else {
                            let name = response.data.name;
                            let version = response.data.version;
                            let description = response.data.description;
                            let author = response.data.author;
                            let last_published = response.data.last_published;
                            let downloads_this_year = response.data.downloads_this_year;
                            let repository = response.data.repository;
                            let author_email = response.data.author_email;
                            sendMessage(api, event, "Name: " + name + " v" + version + "\nAuthor: " + author + "\nEmail: " + author_email + "\nUpdated on: " + last_published + "\nRepository: " + repository + "\n\n" + description);
                        }
                        })
                    
                }
            } else if (query.startsWith("steam")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using steam name instead.\n\nFor example:\nsteam minecraft")
                } else {
                    data.shift()
                    let name = data.join(" ");
                    axios.get('https://api.popcat.xyz/steam?q=' + name)
                        .then(response => {
                            let name = response.data.name;
                            let developers = response.data.developers;
                            let website = response.data.website;
                            let description = response.data.description;
                            let banner = response.data.banner;
                            let price = response.data.price;
    
                            request(banner).pipe(fs.createWriteStream(__dirname + '/cache/images/steam.png'))
    
                                .on('finish', () => {
                                    let message = {
                                        body: "Name: " + name + "\nPrice: " + price + "\nDevelopers: " + developers + "\nWebsite: " + website + "\n\n" + description,
                                        attachment: fs.createReadStream(__dirname + '/cache/images/steam.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately \"" + name + "\" was not found.");
                        })
                }
            } else if (query.startsWith("imdb")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using imdb name instead.\n\nFor example:\nimdb iron man")
                } else {
                    data.shift()
                    let name = data.join(" ");
                    axios.get('https://api.popcat.xyz/imdb?q=' + name)
                        .then(response => {
                            let title = response.data.title;
                            let year = response.data.year;
                            let runtime = response.data.runtime;
                            let actors = response.data.actors;
                            let poster = response.data.poster;
                            let genres = response.data.genres;
                            let plot = response.data.plot;
    
                            request(poster).pipe(fs.createWriteStream(__dirname + '/cache/images/imdb.png'))
    
                                .on('finish', () => {
                                    let message = {
                                        body: "Title: " + title + " " + year + "\nGenres: " + genres + "\nRuntime: " + runtime + "\nActors: " + actors + "\n\n" + plot,
                                        attachment: fs.createReadStream(__dirname + '/cache/images/imdb.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately element \"" + name + "\" was not found.");
                        })
                }
            } else if (query.startsWith("itunes")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using itunes title instead.\n\nFor example:\nitunes in the end")
                } else {
                    data.shift()
                    let name = data.join(" ");
                    axios.get('https://api.popcat.xyz/itunes?q=' + name)
                        .then(response => {
                            let name = response.data.name;
                            let artist = response.data.artist;
                            let album = response.data.album;
                            let genre = response.data.genre;
                            let length = response.data.length.replace('s', '');
                            let lenghtM = (Math.round((length / 60) * 100) / 100).toFixed(2);
                            let thumbnail = response.data.thumbnail;
    
                            request(thumbnail).pipe(fs.createWriteStream(__dirname + '/cache/images/itunes.png'))
    
                                .on('finish', () => {
                                    let message = {
                                        body: "Name: " + name + " by " + artist + "\nAlbum: " + album + "\nGenre: " + genre + "\nLength: " + lenghtM + " minutes",
                                        attachment: fs.createReadStream(__dirname + '/cache/images/itunes.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately the \"" + name + "\" was not found in itunes music.");
                        })
                }
        } else if (query == "car") {
            axios.get("https://api.popcat.xyz/car")
            .then(response => {
                let image = response.data.image;
                let title = response.data.title;

                request(image).pipe(fs.createWriteStream(__dirname + '/cache/images/car.png'))

                    .on('finish', () => {
                        let message = {
                            body: title,
                            attachment: fs.createReadStream(__dirname + '/cache/images/car.png')
                        };
                        sendMessage(api, event, message);
                    })
            })
            .catch(error => {
                reportIssue(api, event.threadID, error);
                sendMessage(api, event, "Unfortunately car run away.");
            })
        } else if (query == "color") {
            axios.get("https://api.popcat.xyz/randomcolor")
            .then(response => {
                let hex = response.data.hex;
                let name = response.data.name;
                let url = response.data.image;

                request(url).pipe(fs.createWriteStream(__dirname + '/cache/images/color.png'))

                    .on('finish', () => {
                        let message = {
                            body: "#" + hex + " " + name,
                            attachment: fs.createReadStream(__dirname + '/cache/images/color.png')
                        };
                        sendMessage(api, event, message);
                    })
            })
            .catch(error => {
                reportIssue(api, event.threadID, error);
                sendMessage(api, event, "Unfortunately color fades away.");
            })
        } else if (query == "pickup") {
            axios.get("https://api.popcat.xyz/pickuplines")
                    .then(response => {
                        sendMessage(api, event, response.data.pickupline);
                    })
                    .catch(error => {
                        reportIssue(api, event.threadID, error);
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    })
        } else if (query.startsWith("changeemo")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using changeemo emoji instead.\n\nFor example:\nchangeemo 😂")
            } else {
                data.shift()
                api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                    if (err) return reportIssue(api, event.threadID, err);
                });
            }
        } else if (query.startsWith("sendreport")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sendReport text instead.\n\nFor example:\nsendReport a problem.")
            } else {
                data.shift()
                reportIssue(api, event, data.join(" "));
            }
        } else if (query.startsWith("setmaxtokens")) {
            if (vips.includes(event.senderID)) {
            settings.maxTokens = 2000
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("settemperature")) {
            if (vips.includes(event.senderID)) {
            settings.temperature = 0.9
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setfrequencypenalty")) {
            if (vips.includes(event.senderID)) {
            settings.frequencyPenalty = 1
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setpresencepenalty")) {
            if (vips.includes(event.senderID)) {
            settings.presencePenalty = 0.4
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setprobabilitymass")) {
            if (vips.includes(event.senderID)) {
            settings.probabilityMass = 1
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if ((query == "unsend--all") && !settings.onUnsend) {
            sendMessage(api, event, "It looks like you entered an unknown command. Never heard it before.");
        } else if ((query == "unsend--on") && !settings.onUnsend) {
            if (vips.includes(event.senderID)) {
            settings.onUnsend = true
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot enable it.. No idea why. Why thought?");
            }
        } else if ((query == "unsend--off") && settings.onUnsend) {
            if (vips.includes(event.senderID)) {
            settings.onUnsend = false
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "Hehe... noo you cannot turn it off...");
            }
        } else if (query == "gmember") {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    sendMessage(api, event, "This group has about " + arr.length + " members.")
                }
            })
        } else if (query.startsWith("changename")) {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (gc.isGroup) {
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using changename text instead.\n\nFor example:\nchangename Hall of Codes")
                    } else {
                        data.shift()
                        api.setTitle(data.join(" "), event.threadID, (err, obj) => {
                        if (err) return console.error(err);
                    });
                    }
                }
            })
        } else if (query == "gname") {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (gc.isGroup) {
                    sendMessage(api, event, `${gc.threadName}`)
                }
            })
        } else if (query == "groupid" || query == "guid" || query == "uid") {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return cosole.log(err);
                else {
                    if (event.type == "message_reply") {
                        api.getUserInfo(event.messageReply.senderID, (err, info) => {
                            if (err) return reportIssue(api, event.threadID, err);
    
                            let name = info[event.messageReply.senderID]['name'];
                            sendMessage(api, event, name + " uid is " + event.messageReply.senderID);
                        });
                    } else if (gc.isGroup) {
                        sendMessage(api, event, `The ${gc.threadName} guid is ` + event.threadID);
                    } else if (event.type == "message") {
                        sendMessage(api, event, "Your uid is " + event.senderID);
                    } 
                }
            });
        } else if (query == "help" || query == "help1") {
            sendMessage(api, event, help);
        } else if (query == "help2") {
            sendMessage(api, event, help1);
        } else if (query == "help3") {
            sendMessage(api, event, help2);
        } else if (query == "help4") {
            sendMessage(api, event, help3);
        } else if (query == "help5") {
            sendMessage(api, event, help4);
        } else if (query == "help6") {
            sendMessage(api, event, help5);
        } else if (query == "help7") {
            sendMessage(api, event, help6);
        } else if (query.startsWith("wiki")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wiki text instead.\n\nFor example:\nwiki google")
            } else {
                wiki(api.sendMessage, input.substring("5"), event);
            }
        } else if (query.startsWith("info")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using info @mention instead.\n\nFor example:\ninfo @Melvin Jones Repol")
            } else {
               if (input.includes("@")) {
                   if (event.senderID == myAccountId || event.senderID == myOtherId) {
                      sendMessage(api, event, "Nice try. But it wont gonna work, and i don't know why.")
                      reactMessage(api, event, ":laughing:");
                   } else {
                      info(api, event);
                   }
               } else {
                sendMessage(api, event, "Unable to find information without mentioning someone.")
               }
            }
        } else if (query.startsWith("morse")) {
            let text = input;
            text = text.substring(6)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using morse query instead.\nFor example:\nmorse query");
            } else {
            getResponseData("https://api.popcat.xyz/texttomorse?text=" + text).then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.morse}`);
                }
            });
            }
        } else if (query.startsWith("lulcat")) {
            let text = input;
            text = text.substring(7)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using lulcat text instead.\nFor example:\nlulcat meowww");
            } else {
            getResponseData("https://api.popcat.xyz/lulcat?text=" + text).then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.text}`);
                }
            });
            }
        } else if (query.startsWith("mock")) {
            let text = input;
            text = text.substring(5)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mock text instead.\nFor example:\nmock i have no idea");
            } else {
            getResponseData("https://api.popcat.xyz/mock?text=" + text).then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.text}`);
                }
            });
            }
        } else if (query.startsWith("coding")) {
            axios.get("https://eager-meitner-f8adb8.netlify.app/.netlify/functions/random")
            .then(response => {
                let url = response.data.url;
                let title = response.data.title;

                request(url).pipe(fs.createWriteStream(__dirname + '/cache/images/coding.png'))

                    .on('finish', () => {
                        let message = {
                            body: title,
                            attachment: fs.createReadStream(__dirname + '/cache/images/coding.png')
                        };
                        sendMessage(api, event, message);
                    })
            })
            .catch(error => {
                reportIssue(api, event.threadID, error);
                sendMessage(api, event, "Unfortunately car run away.");
            })
        } else if (query == "joke") {
            getResponseData("https://api.popcat.xyz/joke").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.joke}`);
                }
            });
        } else if (query == "fact") {
            getResponseData("https://api.popcat.xyz/fact").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.fact}`);
                }
            });
        } else if (query == "thoughts") {
            getResponseData("https://api.popcat.xyz/showerthoughts").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, `${response.result}`);
                }
            });
        } else if (query.startsWith("nickname")) {
            let text = input;
            text = text.substring(9)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol");
            } else {
                api.getThreadInfo(event.threadID, (err, info) => {
                    let mentionid = `${Object.keys(event.mentions)[0]}`;

                    api.changeNickname(text.substring(mentionid.length), `${info.threadID}`, mentionid, (err) => {
                        if (err) return asendMessage(api, event, "Unfortunately there was an error occured while changing \"" + text + "\" nickname.");
                    });
                });
            }
        } else if (query.startsWith("drake")) {
            let text = input;
            text = text.substring(6).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using drake text1: text2 instead.\nFor example:\ndrake error: bug");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/drake.png');
            }
        } else if (query.startsWith("pika")) {
            let text = input;
            text = text.substring(5);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pika text instead.\nFor example:\npika hayssss");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pikachu?text=" +text, __dirname + '/cache/images/pika.png');
            }
        } else if (query == "meme") {
            getResponseData("https://api.popcat.xyz/meme").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    parseImage(api, event, `${response.image}`, __dirname + '/cache/images/meme.png');
                }
            });
        } else if (query == "meme--reddit") {
            getResponseData("https://meme-api.herokuapp.com/gimme").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    parseImage(api, event, `${response.url}`, __dirname + '/cache/images/meme.png');
                }
            });
        } else if (query.startsWith("conan")) {
            parseImage(api, event, "https://mrepol742-gif-randomizer.vercel.app/api", __dirname + '/cache/images/conan.png');
        } else if (query.startsWith("oogway")) {
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using oogway text instead.\nFor example:\noogway bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/oogway?text=" +text, __dirname + '/cache/images/oogway.png');
            }
        } else if (query.startsWith("trump")) {
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using trump text instead.\nFor example:\ntrump bug is not an error");
            } else {
                parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" +text, __dirname + '/cache/images/trump.png');
            }
        } else if (query.startsWith("qrcode")) {
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using qrcode text instead.\nFor example:\nqrcode https://mrepol742.github.io");
            } else {
                parseImage(api, event, "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" +text, __dirname + '/cache/images/qrcode.png');
            }
        } else if (query.startsWith("alert")) {
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using alert text instead.\nFor example:\nalert hello world");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/alert?text=" +text, __dirname + '/cache/images/alert.png');
            }
        } else if (query.startsWith("caution")) {
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using caution text instead.\nFor example:\ncaution bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/caution?text=" +text, __dirname + '/cache/images/caution.png');
            }
        } else if (query.startsWith("biden")) {
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using biden text instead.\nFor example:\nbiden i am leaving twitter");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/biden?text=" +text, __dirname + '/cache/images/biden.png');
            }
        } else if (query.startsWith("website")) {
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using website url instead.\nFor example:\nwebsite https://mrepol742.github.io");
            } else {
                if (text.startsWith("https://") || text.startsWith("http://")) {
                parseImage(api, event, "https://api.popcat.xyz/screenshot?url=" +text, __dirname + '/cache/images/website.png');
            } else {
                sendMessage(api, event, "It looks like you send invalid url. Does it have https or http scheme?");
            }
            }
        } else if (query.startsWith("god")) {
            let text = input;
            text = text.substring(4);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using god text instead.\nFor example:\ngod explicit content");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" +text, __dirname + '/cache/images/god.png');
            }
        } else if (query.startsWith("sadcat")) {
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sadcat text instead.\nFor example:\nsadcat meoww");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" +text, __dirname + '/cache/images/sadcat.png');
            }
        } else if (query.startsWith("simsimi")) {
            let data = input.split(" ");
                if (data.length < 2) {
                   sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
                } else {
                  try {
                    data.shift()
                    let txt = data.join(" ");
                    axios.get('https://api.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=Joyce')
                      .then(response => {
                        sendMessage(api, event, response.data['success']);
                      })
                  } catch (err) {
                    reportIssue(api, event, err);
                  }
                }
        } else if (query.startsWith("pooh")) {
            let text = input;
            text = text.substring(5).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pooh text1: text2 instead.\nFor example:\npooh color: colour");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pooh?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/pooh.png');
            }
        } else if (query.startsWith("landscape")) {
            let text = input;
            text = text.substring(10);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using landscape text instead.\nFor example:\nlandscape night");
            } else {
                parseImage(api, event, "https://source.unsplash.com/1600x900/?" + text, __dirname + '/cache/images/landscape.png');
            }
        } else if (query.startsWith("portrait")) {
            let text = input;
            text = text.substring(9);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using portrait text instead.\nFor example:\nportrait rgb");
            } else {
                parseImage(api, event, "https://source.unsplash.com/900x1600/?" + text, __dirname + '/cache/images/portrait.png');
            }
        } else if (query == "landscape") {
            parseImage(api, event, "https://source.unsplash.com/1600x900/?landscape", __dirname + '/cache/images/landscape.png');
        } else if (query == "portrait") {
            parseImage(api, event, "https://source.unsplash.com/900x1600/?portrait", __dirname + '/cache/images/portrait.png');
        } else if (query.startsWith("animequote")) {
            axios.get('https://animechan.vercel.app/api/random')
                .then(response => {
                    sendMessage(api, event, response.data.quote + "\n\nby " + response.data.character + " of " + response.data.anime);
                })
                .catch(error => {
                    reportIssue(api, event.threadID, error);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                });
        } else if (query == "advice") {
            getResponseData("https://zenquotes.io/api/random").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `${response[i].q}`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query.startsWith("inspiration")) {
            getResponseData("https://zenquotes.io/api/random").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `${response[i].a} says\n${response[i].q}`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query.startsWith("motivation") || query.startsWith("motivate")) {
            getResponseData("https://zenquotes.io/api/random").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `${response[i].q} \n\nby ${response[i].a}\n\n`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query == "newyear") {
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
    attachment: fs.createReadStream(__dirname + '/cache/newyear.gif')
};
  sendMessage(api, event, message)
} else if (query == "christmas") {
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
attachment: fs.createReadStream(__dirname + '/cache/Christmas.gif')
};
sendMessage(api, event, message)
        } else if (query == "verserandom") {
            getResponseData("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `The book of ${response[i].bookname} ${response[i].chapter}:${response[i].verse} says\n\n${response[i].text}`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query == "versetoday") {
            getResponseData("https://labs.bible.org/api/?passage=votd&type=json").then((response) => {
                if (response == null) {
                    reportIssue(api, revent.threadID, response);
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `The book of ${response[i].bookname} ${response[i].chapter}:${response[i].verse} says\n\n${response[i].text}`
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query.startsWith("verse")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead.\nFor example:\nverse Job 4:9");
                } else {
                    data.shift()
                    let body = data.join(" ");
                    getResponseData("http://labs.bible.org/api/?passage=" + body + "&type=json").then((r) => {
                        if (r == null) {
                            sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead.\nFor example:\nverse Job 4:9");
                        } else {
                            let result = ""
                            let total = r.length
                            for (let i = 0; i < total; i++) {
                                result += "The book of " + r[i].bookname + " " + r[i].chapter + ":" + r[i].verse + " says\n\n" + r[i].text;
                            }
                            sendMessage(api, event, `${result}`);
                        }
                    })
                }
        } else if (query == "refresh" || query == "reload") {
            if (vips.includes(event.senderID)) {
            let A = api.getAppState();
            let B = await JSON.stringify(A);
            fs.writeFileSync("fb.json", B, "utf8");
            sendMessage(api, event, "AppState Refreshed Successfully!.");
            } else {
                sendMessage(api, event, "Unable to do such action...");
            }
        } else if (query.startsWith("test") || query.startsWith("hello world") || query.startsWith("hi world")) {
            sendMessage(api, event, "Hello World");
        }

        if (event.type == "message_reply") {
            if (event.messageReply.senderID == myAccountId) {
                someR(api, event, query);
            }
        } else {
            if (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742")) {
               someR(api, event, query);
            }
        }
        
        if (query == "hi") {
            sendMessage(api, event, "Hello");
        } else if (query == "hello") {
            sendMessage(api, event, "Hi");
        } else if (query == "sup" || query == "wassup" || query == "what's up" || query == "how are you" && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        } else if (query.startsWith("hey")) {
            sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        } else if (query.includes("haha") || query.includes("ahah") || query.includes("ahha") || input.toLowerCase().includes("😂") || input.toLowerCase().includes("🤣") || input.toLowerCase().includes("😆") || query.includes("funny") || query.includes("insane") || query.includes("lol") || query.includes("lmao") || query.includes("lmfao")) {
            reactMessage(api, event, ":laughing:");
        } else if (query.includes("sad") || query.includes("tired") || query.includes("sick")) {
            reactMessage(api, event, ":sad:");
        } else if (query.includes("angry")) {
            reactMessage(api, event, ":angry:");
        } else if (query.includes("cry")) {
            reactMessage(api, event, ":cry:");
        } else if (query == "bot" || query == "good") {
            reactMessage(api, event, ":love:");
        } else if (query == "tsk") {
            reactMessage(api, event, ":like:");
        } else if (query == "okay") {
            sendMessage(api, event, "Yup");
        } else if (nsfw(query)) {
            sendMessage(api, event, "Shhhhhhh watch your mouth.");
        } else if (query == "idk") {
            sendMessage(api, event, "i dont know too...");
        } else if (query == "nice" || query == "uwu") {
            reactMessage(api, event, ":heart:");
        }
        
    }
}

function someR(api, event, query) {
    if (query.startsWith("goodeve")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, "Good evening too...");
    } else if (query.startsWith("goodmorn")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, "Good morning too...");
    } else if (query.startsWith("goodnight")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, "Good night too...");
    } else if (query.startsWith("goodafter")) {
        reactMessage(api, event, ":love:");
        sendMessage(api, event, "Good afternoon too...");
    }
}

function parseImage(api, event, url, dir) {
    request(url).pipe(fs.createWriteStream(dir))
    .on('finish', () => {
        let image = {
            attachment: fs.createReadStream(dir)
        };
        sendMessage(api, event, image);
    })
}

function reportIssue(api, event, err) {
    console.log(err);
    api.sendMessage(err + "", myAccountId);
}

async function sendMessage(api, event, message) {
    //await wait(sleep[Math.floor(Math.random() * sleep.length)] + 3000)
    //await wait(countWords(message) * 500);
    api.sendMessage(message, event.threadID, event.messageID).catch((err) => reportIssue(api, event, err));
}

async function sendMessageNoReply(api, eventId, message) {
   // await wait(sleep[Math.floor(Math.random() * sleep.length)] + 3000)
    //await wait(countWords(message) * 600);
    api.sendMessage(message, eventId).catch((err) => reportIssue(api, event, err));
}

async function reactMessage(api, event, reaction) {
    //await wait(sleep[Math.floor(Math.random() * sleep.length)] + 3000)
    //await wait(5000);
    api.setMessageReaction(reaction, event.messageID).catch((err) => reportIssue(api, event, err));
}

function formatQuery(string) {
   const emo = /\p{Extended_Pictographic}/ug;
   const anu = /[^a-z0-9]/gi;
   let str = string.replace(emo, '');
   return str.replace(anu, '');
}

function holdOn(event) {
    if (!(vips.includes(event.senderID))) {
        if (!(event.senderID in cd)) {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
            return true;
        } else {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        }
    }
    return false;
}

let download = async function(uri, filename, callback){
    await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};

const checkFound = (text) =>{
    return text ? text : "undefined" 
}

async function weathersearch(location) {
    let result = await google.search(location, {
        page: 0,
        safe: true,
        additional_parameters: {
            hl: "en"
        }
    })
    return result
}

async function getResponseData(url) {
    let data = await axios.get(url).then((response) => {
        return response.data
    }).catch((err) => {
        console.log(err)
        return null
    });
    return data
}

const searchOptions = {
    page: 0, 
    safe: false,
    additional_params: {
      hl: 'en' 
    }
}
    
  
async function search(api, event, query) {
    let msg = '';  
      try{
        const response = await google.search(query, searchOptions);
        response.results.map((el,i)=>{
          let title = el.title;
          let description = el.description;
          msg += `${description}\n\n`
        }) 
        sendMessage(api, event, msg);
      }catch(err){
        sendMessage(api, event, "Unable to search the query " + query + " please try it again later.");
      }
  }

function countWords(str) {
    try {
    return str.split(' ').filter(function(n) {
        return n != ''
    }).length;
} catch (err) {
    return 5;
}
}

function isFileExists(path) {
    let bool;
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
          console.error(err)
          bool = false;
          return;
        }
    bool = true;
    })
    return bool;
}   

function nsfw(text) {
    return text.includes("jabol") || text.includes("nude") || text.includes("hentai") || text.includes("milf") || text.includes("masturbate") || text.includes("pussy") || text.includes("dick");
}