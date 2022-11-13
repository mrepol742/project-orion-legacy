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

let help = "Page 1 of 5";
    help += "\n\n1. help [number of pages]";
    help += "\n2. pdf [text]";
    help += "\n3. dict [text]";
    help += "\n4. summ [text]";
    help += "\n5. find [text]";
    help += "\n6. dfind [text]";
    help += "\n7. baybayin [text]";
    help += "\n8. weather [location]";
    help += "\n9. encode64 [text]";
    help += "\n10. decode64 [text]";
    help += "\n11. facts [text]";
    help += "\n12. lulcat [text]";
    help += "\n13. mock [text]";
    help += "\n14. fact";
    help += "\n15. thoughts";
    help += "\n\nFor every action there is an equal and opposite reaction."

let help1 = "Page 2 of 5";
    help1 += "\n\n16. ig [username]";
    help1 += "\n17. github [username]";
    help1 += "\n18. changeemo [emoji]";
    help1 += "\n19. wiki [text]";
    help1 += "\n20. info [username]";
    help1 += "\n21. nickname @mention [text]";
    help1 += "\n22. landscape";
    help1 += "\n23. landscape [text]";
    help1 += "\n24. portrait";
    help1 += "\n25. portrait [text";
    help1 += "\n26. problem [equation]";
    help1 += "\n27. pin add";
    help1 += "\n28. pin remove";
    help1 += "\n29. pin";
    help1 += "\n30. car";
    help1 += "\n\nFor every action there is an equal and opposite reaction."

let help2 = "Page 3 of 5";
    help2 += "\n\n31: verse today";
    help2 += "\n32: verse random";
    help2 += "\n33. animeqoute";
    help2 += "\n34. bgremove";
    help2 += "\n35. motivate";
    help2 += "\n36. inspiration";
    help2 += "\n37. advice";
    help2 += "\n38. remove";
    help2 += "\n39. color";
    help2 += "\n40. meme";
    help2 += "\n41. drake [text1]: [text2]";
    help2 += "\n42. pooh [text1]: [text2]";
    help2 += "\n43. oogway [text]";
    help2 += "\n44. caution [text]";
    help2 += "\n45. alert [text]";
    help2 += "\n\nFor every action there is an equal and opposite reaction."

let help3 = "Page 4 of 5";
    help3 += "\n46. sadcat [text]";
    help3 += "\n47. biden [text]";
    help3 += "\n48. pika [text]";
    help3 += "\n49. god [text]";
    help3 += "\n50. website [url]";
    help3 += "\n51. phub [text]";
    help2 += "\n52. qrcode [text]";
    help3 += "\n53. music [text]";
    help3 += "\n54. video [text]";
    help3 += "\n55. morse [text]";
    help3 += "\n56. joke";
    help3 += "\n57. pickup";
    help3 += "\n58. uid";
    help3 += "\n59. guid";
    help3 += "\n60. gname";
    help3 += "\n\nFor every action there is an equal and opposite reaction."

let help4 = "Page 5 of 5";
    help4 += "\n\n61. gmember";
    help4 += "\n62. unsend --on";
    help4 += "\n63. unsend --off";
    help4 += "\n64. unsend --all";
    help4 += "\n65. setMaxTokens [integer]";
    help4 += "\n66. setTemperature [integer]";
    help4 += "\n67. setFrequencyPenalty [integer]";
    help4 += "\n68. setProbabilityMass [integer]";
    help4 += "\n69. delay --on";
    help4 += "\n70. delay --off";
    help4 += "\n71. setVIP @mention or uid";
    help4 += "\n72. removeVIP @mention or uid";
    help4 += "\n73. refresh | reload";
    help4 += "\n\nFor every action there is an equal and opposite reaction."

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
    var hours = date("Asia/Manila").getHours()
    var mins = date("Asia/Manila").getMinutes()
    var ampm = hours >= 12 ? 'PM' : 'AM';
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

login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return reportIssue(api, event.threadID, err);

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true,
        autoMarkRead: true
    });

    let settings = JSON.parse(fs.readFileSync("cache/settings.json", "utf8"));
    let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return reportIssue(api, event.threadID, err);

        if (debug) {
            if (event.type == "message" || event.type == "message_reply") {
            let input = event.body;
            let query = removeEmojis(input.replace(/\s+/g, '').toLowerCase());
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
                let query = removeEmojis(input.replace(/\s+/g, '').toLowerCase());
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
                
                if (query.startsWith("phub") || query.startsWith("pornhub")) {
                    api.getUserInfo(event.messageReply.senderID, (err, info) => {
                        if (err) return reportIssue(api, event.threadID, err);

                        let name = info[event.messageReply.senderID]['name'];

                        if (event.messageReply.senderID == myAccountId || event.messageReply.senderID == myOtherId) {
                            sendMessage(api, event, "Hahaha.. you cannot do that to my account.. bruhhh..");
                        } else {
                            let data = input.split(" ")
                            if (data.length < 2) {
                                sendMessage(api, event, "Opps! I didnt get it. You should try using phub replytoamessage anytext instead.\nFor example:\nphub huhu");
                            } else {
                                data.shift()
                                var phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + event.messageReply.senderID + '&name=' + name + '&apikey=' + apiKey[0];
                                parseImage(api, event, phublink, __dirname + '/cache/images/phubmeme.jpg');
                            }
                        }
                    })
                } else if (query.startsWith("qrcode")) {
                    let body = event.messageReply.body
                    let data = "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + body
                    let f = fs.createWriteStream(__dirname + "/cache/images/qr.jpg")
                    let res = request(encodeURI(data))
                    res.pipe(f)
                    f.on("close", () => {
                        var message = {
                            body: body,
                            attachment: fs.createReadStream(__dirname + "/cache/images/qr.jpg").on("end", async () => {
                                if (fs.existsSync(__dirname + "/cache/images/qr.jpg")) {
                                    fs.unlink(__dirname + "/cache/images/qr.jpg", (err) => {
                                        if (err) {
                                            reportIssue(api, event.threadID, err)
                                            sendMessage(api, event, "Unfortunately there was an error occured.");
                                        }
                                    })
                                }
                            })
                        };
                        sendMessage(api, event, message);
                    })
                } else if (query == "pinadd") {
                    if (event.messageReply.body == "") { 
                        sendMessage(api, event, "You need to reply pinadd to a message which is not empty to pin it.");
                    } else {
                        pinned.pin.message[event.threadID] = event.messageReply.body
                        pinned.pin.sender[event.threadID] = event.messageReply.senderID
                        sendMessage(api, event, "Message pinned.. Enter \"pin\" to show it.");
                        fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
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
                                    var message = {
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
                                    var file = fs.createWriteStream(__dirname + '/cache/images/photo.jpg');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " deleted this photo. \n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/photo.jpg')
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "gif") {
                                    var file = fs.createWriteStream(__dirname + '/cache/images/animated_image.gif');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " deleted this GIF. \n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/animated_image.gif')
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream(__dirname + '/cache/images/sticker.png');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " deleted this sticker.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/images/sticker.png')
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vid") {
                                    var file = fs.createWriteStream(__dirname + '/cache/videos/video.mp4');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " deleted this video.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/videos/video.mp4')
                                                }
                                                sendMessageNoReply(api, event.threadID, message);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vm") {
                                    var file = fs.createWriteStream(__dirname + '/cache/audios/vm.mp3');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " deleted this audio.\n",
                                                    attachment: fs.createReadStream(__dirname + '/cache/audios/vm.mp3')
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
                                    sendMessage(api, event.threadID, data[event.senderID]['name'] + " deleted this message.\n\n" + msgs[event.messageID]);
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
                                var arr = gc.participantIDs;
                                var Tmem = arr.length;
                                var url = `https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png&text1=${event.logMessageData.addedParticipants[0].fullName}&text2=Welcome+To+${gc.threadName}&text3=Member+` + Tmem + `&avatar=https://cdn.discordapp.com/embed/avatars/3.png`;
                                parseImage(api, event, url, __dirname + '/cache/images/welcome.jpg');
                              }
                        })
                        break;

                    case "log:unsubscribe":
                        var id = event.logMessageData.leftParticipantFbId;
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) done(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(data)
                                    for (var prop in data) {
                                        if (data.hasOwnProperty(prop) && data[prop].name) {
                                            var gcn = gc.threadName;
                                            var arr = gc.participantIDs;
                                            var Tmem = arr.length;
                                            var url = "https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png&text1=" + data[prop].name + "&text2=Bye bye, Sayonara&text3=Member+" + Tmem + "&avatar=https://cdn.discordapp.com/embed/avatars/3.png";
                                            parseImage(api, event, url, __dirname + '/cache/images/byebye.jpg');
                                        }
                                    }
                                }
                            })
                        })
                        /*await new Promise(resolve => setTimeout(resolve, 7500));
                        api.getThreadInfo(event.threadID, (err, gc) => {
                           if (err) done(err);
                           var gcn = gc.threadName;
                           var arr = gc.participantIDs;
                           var Tmem = arr.length;
                           api.sendMessage("Group Chat Name: " + gcn + "\n\n💠 Total Member(Updated) 💠\n\n => " + Tmem + " Members", event.threadID, event.messageID)
                        })*/
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
        for(var prop in ret) {
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
                var message = { 
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
        let query = removeEmojis(input.replace(/\s+/g, '').toLowerCase());
        let query2 = removeEmojis(input.toLowerCase());
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
                var text = input;
                if (event.senderID == myGirlAccountId) {
                    return;
                } else if (query.startsWith("repol")) {
                    text = input.substring(6)
                } else if (query.startsWith("mrepol742")) {
                    text = input.substring(10)
                } else if (query.startsWith("mj")) {
                    text = input.substring(3)
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
                if (finish.startsWith("?")) {
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
                var text = input;
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
        if (query.startsWith("video")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using video query instead.\nFor example:\nvideo In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Invalid request bro..");
                } else {
                    sendMessage(api, event, "I'm finding your video titled \"" + data.join(" ") + "\" please wait...");
                    var timeleft = 3;
                    var downloadTimer = setInterval(function() {
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
                        sendMessage(api, event, `I found this ${info.video_details.title}.`);
                        console.log(`Downloading ${info.video_details.title}`);
                    });
                    stream.on('end', () => {
                        var limit = 50 * 1024 * 1024; // 50MB in bytes
                        fs.readFile(__dirname + '/cache/videos/video.mp4', function(err, data) {
                            if (err) console.log(err)
                            if (data.length > limit) {
                                sendMessage(api, event, "I cannot send the file because its file size is beyond 50mb.");
                            } else {
                                console.log("Done.");
                                var message = {
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
        }
        if (query.startsWith("music")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using music query instead.\nFor example:\nmusic In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                data.shift()
                const youtube = await new Innertube();
                const search = await youtube.search(data.join(" "));
                if (search.videos[0] === undefined) {
                    sendMessage(api, event, "Invalid request bro..");
                } else {
                    sendMessage(api, event, "I'm finding your music titled \"" + data.join(" ") + "\" please wait...");
                    var timeleft = 3;
                    var downloadTimer = setInterval(function() {
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
                        sendMessage(api, event, `I found this ${info.video_details.title}.`);

                        console.log(`Downloading ${info.video_details.title}`);
                    });
                    stream.on('end', () => {
                        var limit = 50 * 1024 * 1024; // 50MB in bytes
                        fs.readFile(__dirname + '/cache/audios/music.mp3', function(err, data) {
                            if (err) console.log(err)
                            if (data.length > limit) {
                                sendMessage(api, event, "I cannot send the file because its file size is beyond 50mb.");
                            } else {
                                console.log("Done.");
                                var message = {
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
        }

        if (query.startsWith("encode64")) {
            if (query2.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using encode64 query instead.\nFor example:\nencode64 fundamentals in engineering")
            } else {
                var text = input;
                text = text.substring(9)
                let data = text;
                let buff = Buffer.from(data);
                let base64data = buff.toString('base64');
                sendMessage(api, event, base64data);
            }
        } else if (query.startsWith("decode64")) {
            if (query2.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using decode64 query instead.\nFor example:\ndecode64 fundamentals in engineering")
            } else {
                var text = input;
                text = text.substring(9)
                let data = text;
                let buff = Buffer.from(data, 'base64');
                let base642text = buff.toString('ascii');
                sendMessage(api, event, base642text);
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using pdf query instead.\nFor example:\npdf fundamentals in engineering")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using urbandictionary query instead.\nFor example:\nurbandictionary computer");
            } else {
                var text = input.substring(17)
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
                    var word = data.list[0].word;
                    var def = data.list[0].definition;
                    var sample = data.list[0].example;
                    var timestamp = data.list[0].written_on;
                    var source = data.list[0].permalink;
                    sendMessage(api, event, def + "\n\nExample: \n" + sample);
                }).catch(function(error) {
                    reportIssue(api, event.threadID, error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
            }
        } else if (query.startsWith("summarize") || query2.startsWith("summ ")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using summarize message instead.\n\nFor example:\nsummarize this sentence meant to be summarized.");
            } else {
                var text = input.substring(5);
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using dgoogle query instead.\n\nFor example:\ndgoogle computer")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using google query instead.\n\nFor example:\ngoogle computer")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using baybaying query instead.\n\nFor example:\nbaybayin ako ay filipino")
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
        } else if (query.startsWith("weather")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using weather country state city instead.\n\nFor example:\nweather philippines ncr caloocan city")
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
                    m += "\nTemperature: " + output.temperature + "°F" + " (" + ((output.temperature - 32) * 5 / 9) + "°C)"
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using facts query instead.\n\nFor example:\nfacts about computers")
            } else {
                data.shift()
                var url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(api, event, url, __dirname + '/cache/images/facts.png');
            }
        } else if (query.startsWith("instagram") || query2.startsWith("insta ") || query2.startsWith("ig ")) {
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead.\n\nFor example:\ninstagram melvinjonesrepol")
            } else {
                data.shift()
                let userN = data.join(" ");
                axios.get('https://api.popcat.xyz/instagram?user=' + userN)
                    .then(response => {
                        var username = response.data.username;
                        var fullname = response.data.full_name;
                        var biography = response.data.biography;
                        var posts = response.data.posts;
                        var reels = new Intl.NumberFormat().format(response.data.reels);
                        var followers = new Intl.NumberFormat().format(response.data.followers);
                        var following = new Intl.NumberFormat().format(response.data.following);
                        var private = ((response.data.private) ? "Yes" : "No");
                        var verified = ((response.data.verified) ? "Yes" : "No");
                        var profilepic = response.data.profile_pic;

                        request(profilepic).pipe(fs.createWriteStream(__dirname + '/cache/images/instaprofile.png'))

                            .on('finish', () => {
                                var message = {
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
         } else if (query.startsWith("github")) {
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using github username instead.\n\nFor example:\ngithub melvinjonesrepol")
                } else {
                    data.shift()
                    let userN = data.join(" ");
                    axios.get('https://api.popcat.xyz/github/' + userN)
                        .then(response => {
                            var name = response.data.name;
                            var email = response.data.email;
                            var bio = response.data.bio;
                            var company = response.data.company;
                            var location = response.data.location;
                            var url = response.data.blog;
                            var followers = response.data.followers;
                            var following = response.data.following;
                            var public_repos = response.data.public_repos;
                            var public_gists = response.data.public_gists;
                            var avatar = response.data.avatar;
    
                            request(avatar).pipe(fs.createWriteStream(__dirname + '/cache/images/github_avatar.png'))
    
                                .on('finish', () => {
                                    var message = {
                                        body: "Name: " + name + "\nEmail: " + email + "\nBio: " + bio + "\nLocation: " + location + "\nCompany: " + company + "\nWebsite: " + url + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPublic Repository: " + public_repos + "\nPublic Gists: " + public_gists,
                                        attachment: fs.createReadStream(__dirname + '/cache/images/github_avatar.png')
                                    };
                                    sendMessage(api, event, message);
                                })
                        })
                        .catch(error => {
                            reportIssue(api, event.threadID, error);
                            sendMessage(api, event, "Unfortunately user \"" + userN + "\" was not found.");
                        })
                }
        } else if (query == "car") {
            axios.get("https://api.popcat.xyz/car")
            .then(response => {
                var image = response.data.image;
                var title = response.data.title;

                request(image).pipe(fs.createWriteStream(__dirname + '/cache/images/car.png'))

                    .on('finish', () => {
                        var message = {
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
                var hex = response.data.hex;
                var name = response.data.name;
                var url = response.data.image;

                request(url).pipe(fs.createWriteStream(__dirname + '/cache/images/color.png'))

                    .on('finish', () => {
                        var message = {
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
        } else if (query.startsWith("sendReport")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sendReport message instead.\n\nFor example:\nsendReport a problem.")
            } else {
                data.shift()
                reportIssue(api, event, data.join(" "));
            }
        } else if (query.startsWith("setMaxTokens")) {
            if (vips.includes(event.senderID)) {
            settings.maxTokens = 2000
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setTemperature")) {
            if (vips.includes(event.senderID)) {
            settings.temperature = 0.9
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setFrequencyPenalty")) {
            if (vips.includes(event.senderID)) {
            settings.frequencyPenalty = 1
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setPresencePenalty")) {
            if (vips.includes(event.senderID)) {
            settings.presencePenalty = 0.4
            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
            } else {
                sendMessage(api, event, "You cannot override it. No idea why. Why thought?");
            }
        } else if (query.startsWith("setProbabilityMass")) {
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
                    var arr = gc.participantIDs;
                    sendMessage(api, event, "This group has about " + arr.length + " members.")
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
        } else if (query.startsWith("wiki")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wiki query instead.\n\nFor example:\nwiki google")
            } else {
                wiki(api.sendMessage, input.substring("5"), event);
            }
        } else if (query.startsWith("info")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using info @user instead.\n\nFor example:\ninfo @Melvin Jones Repol")
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
            var text = input;
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
            var text = input;
            text = text.substring(7)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using lulcat query instead.\nFor example:\nlulcat query");
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
            var text = input;
            text = text.substring(5)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mock query instead.\nFor example:\nmock query");
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
            var text = input;
            text = text.substring(9)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname mentioned nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol");
            } else {
                api.getThreadInfo(event.threadID, (err, info) => {
                    var mentionid = `${Object.keys(event.mentions)[0]}`;

                    api.changeNickname(text.substring(mentionid.length), `${info.threadID}`, mentionid, (err) => {
                        if (err) return asendMessage(api, event, "Unfortunately there was an error occured while changing \"" + text + "\" nickname.");
                    });
                });
            }
        } else if (query.startsWith("drake")) {
            var text = input;
            text = text.substring(6).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using drake query1:query2 instead.\nFor example:\ndrake hahah:hehehe");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/drake.png');
            }
        } else if (query.startsWith("pika")) {
            var text = input;
            text = text.substring(5);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pika query instead.\nFor example:\npika hahah");
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
        } else if (query.startsWith("oogway")) {
            var text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using oogway query instead.\nFor example:\noogway hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/oogway?text=" +text, __dirname + '/cache/images/oogway.png');
            }
        } else if (query.startsWith("alert")) {
            var text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using alert query instead.\nFor example:\nalert hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/alert?text=" +text, __dirname + '/cache/images/alert.png');
            }
        } else if (query.startsWith("caution")) {
            var text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using caution query instead.\nFor example:\ncaution hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/caution?text=" +text, __dirname + '/cache/images/caution.png');
            }
        } else if (query.startsWith("biden")) {
            var text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using biden query instead.\nFor example:\nbiden hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/biden?text=" +text, __dirname + '/cache/images/biden.png');
            }
        } else if (query.startsWith("website")) {
            var text = input;
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
            var text = input;
            text = text.substring(4);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using god query instead.\nFor example:\ngod hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" +text, __dirname + '/cache/images/god.png');
            }
        } else if (query.startsWith("sadcat")) {
            var text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sadcat query instead.\nFor example:\nsadcat hahah");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" +text, __dirname + '/cache/images/sadcat.png');
            }
        } else if (query.startsWith("pooh")) {
            var text = input;
            text = text.substring(5).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pooh query1:query2 instead.\nFor example:\npooh hahah:hehehe");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pooh?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/pooh.png');
            }
        } else if (query.startsWith("landscape")) {
            var text = input;
            text = text.substring(10);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using landscape query instead.\nFor example:\nlandscape query");
            } else {
                parseImage(api, event, "https://source.unsplash.com/1600x900/?" + text, __dirname + '/cache/images/landscape.png');
            }
        } else if (query.startsWith("portrait")) {
            var text = input;
            text = text.substring(9);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using portrait query instead.\nFor example:\nportrait query");
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
        } else if (query.startsWith("motivation") || query.startsWith("inspiration") || query.startsWith("determination") ||  query.startsWith("motivate")) {
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
        } else if (query == "hi" && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            sendMessage(api, event, "Hello");
        } else if (query == "hello" && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            sendMessage(api, event, "Hi");
        } else if (query == "sup" || query == "wassup" || query == "what's up" || query == "how are you" && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        } else if (query.startsWith("hey") && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
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
        } else if (query.includes("confuse") && (query.startsWith("im") || query.startsWith("i'm") || query.startsWith("iam"))) {
            sendMessage(api, event, "me too..");
        } else if (query.startsWith("goodeve") && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good evening too...");
        } else if (query.startsWith("goodmorn") && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good morning too...");
        } else if (query.startsWith("goodnight") && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good night too...");
        } else if (query.startsWith("goodafter") && (query2.includes("melvin jones repol") || query2.includes("mj") || query2.includes("mrepol742"))) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, "Good afternoon too...");
        } else if (query == "tsk") {
            reactMessage(api, event, ":like:");
        } else if (query == "okay" && event == "message_reply") {
            sendMessage(api, event, "Yup");
        } else if (query.includes("jabol")) {
            sendMessage(api, event, "Shhhhhhh watch your mouth.");
        } else if (query == "idk"  && event == "message_reply") {
            sendMessage(api, event, "i dont know too...");
        } else if ((query == "nice" || query == "uwu") && event == "message_reply") {
            reactMessage(api, event, ":heart:");
        } else if (query.includes("nude")) {
            sendMessage(api, event, "Dont!...");
        } 
        
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
    await wait(sleep[Math.floor(Math.random() * sleep.length)])
    api.sendMessage(message, event.threadID, event.messageID).catch((err) => reportIssue(api, event, err));
}

async function sendMessageNoReply(api, eventId, message) {
    await wait(sleep[Math.floor(Math.random() * sleep.length)])
    api.sendMessage(message, eventId).catch((err) => reportIssue(api, event, err));
}

async function reactMessage(api, event, reaction) {
    await wait(sleep[Math.floor(Math.random() * sleep.length)])
    api.setMessageReaction(reaction, event.messageID).catch((err) => reportIssue(api, event, err));
}

function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
}

function holdOn(event) {
    if (!(vips.includes(event.senderID))) {
        if (!(event.senderID in cd)) {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
            //sendMessage(api, event, "Hold on... Your asking too much wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds");
            return true;
        } else {
            cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
        }
    }
    return false;
}

var download = async function(uri, filename, callback){
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
        sendMessage(api, event, "error searching for" + query);
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