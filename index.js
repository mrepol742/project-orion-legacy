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

let msgs = {};
let cd = {};
let vips = [
    "100071743848974",
    "100016029218667",
    "100077318906152"
];
let threads = ""

let myAccountId = "100071743848974";
let myOtherId = "100016029218667";
let myGirlAccountId = "100077318906152";

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

login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return reportIssue(api, err);
    cron.schedule('*/30 * * * *', () => {
        var hours = date("Asia/Manila").getHours()
        var mins = date("Asia/Manila").getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? '0' + mins : mins;
        reportIssue(api, "Time Check " + hours + ":" + mins + " " + ampm)
        api.sendMessage("Time Check " + hours + ":" + mins + " " + ampm, myAccountId);
    });
    cron.schedule('0 * * * *', () => {
        let A = api.getAppState();
        let B = JSON.stringify(A);
        fs.writeFileSync("fb.json", B, "utf8");
        api.sendMessage("AppState refresh...", myAccountId)
    });

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true
    });

    const listenEmitter = api.listen(async (err, event) => {
        let settings = JSON.parse(fs.readFileSync("files/settings.json", "utf8"));

        if (err) return reportIssue(api, err);
        
        if (!(vips.includes(event.senderID))) {
            if (!(event.senderID in cd)) {
                cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
            } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                api.sendMessage("Hold on... Your asking too much wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                return
            } else {
                cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
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
                }
                ai(api, event);
                break;
            case "message_reply":
                let msgid = event.messageID;
                let input = event.body;
                let query = input.trim().toLowerCase();
                msgs[msgid] = input;

                if (query.startsWith("unsent") || query.startsWith("unsend") || query.startsWith("remove")) {
                    if (event.messageReply.senderID != api.getCurrentUserID()) {
                        api.sendMessage("Houston! I cannot unsent messages didn't come from me. sorry.", event.threadID, event.messageID);
                    } else {
                        api.unsendMessage(event.messageReply.messageID);
                    }
                } 

                if (event.senderID == myGirlAccountId) {
                    break;
                }

                ai(api, event);
                
                if (query.startsWith("phub") || query.startsWith("pornhub")) {
                    api.getUserInfo(event.messageReply.senderID, (err, info) => {
                        if (err) return reportIssue(api, err);

                        let name = info[event.messageReply.senderID]['name'];

                        let data = input.split(" ")
                        if (data.length < 2) {
                            api.sendMessage("Opps! I didnt get it. You should try using phub replytoamessage anytext instead.\nFor example:\nphub huhu", event.threadID, event.messageID);
                        } else {
                            data.shift()
                            var phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + event.messageReply.senderID + '&name=' + name + '&apikey=' + apiKey[0];
                            parseImage(event, phublink, __dirname + '/imgs/phubmeme.jpg');
                        }
                    })
                } else if (query.startsWith("qrcode")) {
                    let body = event.messageReply.body
                    let data = "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + body
                    let f = fs.createWriteStream(__dirname + "/imgs/qr.jpg")
                    let res = request(encodeURI(data))
                    res.pipe(f)
                    f.on("close", () => {
                        api.sendMessage({
                            body: body,
                            attachment: fs.createReadStream(__dirname + "/imgs/qr.jpg").on("end", async () => {
                                if (fs.existsSync(__dirname + "/imgs/qr.jpg")) {
                                    fs.unlink(__dirname + "/imgs/qr.jpg", (err) => {
                                        if (err) {
                                            reportIssue(api, err)
                                            api.sendMessage("Unfortunately there was an error occured.", event.threadID, event.messageID);
                                        }
                                    })
                                }
                            })
                        }, event.threadID, event.messageID)
                    })
                } else if (query.startsWith("uid")) {
                    api.getUserInfo(event.messageReply.senderID, (err) => {
                        if (err) return reportIssue(api, err);
                        else {
                            api.sendMessage(event.messageReply.senderID, event.threadID, event.messageID);
                        }
                    });
                }

                break;
            case "message_unsend":
                    let d = msgs[event.messageID];
                    if (typeof(d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, err);
                            else {
                                if (d[0] == "img") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/photo.jpg');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, 'finished downloading photo..')
                                            if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this photo: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/photo.jpg')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "gif") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/animated_image.gif');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, 'finished downloading gif..')
                                            if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this GIF: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/animated_image.gif')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/sticker.png');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, 'finished downloading sticker..')
                                            if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this Sticker: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/sticker.png')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vid") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/video.mp4');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, 'finished downloading video..')
                                            if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this video: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/video.mp4')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                } else if (d[0] == "vm") {
                                    var file = fs.createWriteStream(__dirname + '/attachments/vm.mp3');
                                    var gifRequest = http.get(d[1], function(gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function() {
                                            reportIssue(api, 'finished downloading audio..')
                                            if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                                var message = {
                                                    body: data[event.senderID]['name'] + " unsent this audio: \n",
                                                    attachment: fs.createReadStream(__dirname + '/attachments/vm.mp3')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return reportIssue(api, err);
                            else {
                                if (settings.onUnsend && !threads.includes(event.threadID) && event.senderID != myAccountId) {
                                    api.sendMessage(data[event.senderID]['name'] + " unsent this message: \n\n" + msgs[event.messageID], event.threadID);
                                }
                            }
                        });
                    }
          
            break;
        }
    });
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
 }

 const wiki = async (api, topic, event) =>{
   await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`)
   .then(res=>{
   	 let extract = res.data.extract;
     api(`${extract}`, event.threadID, event.messageID);
   }).catch(err=>{
      reportIssue(api, err)
      api(`Unfortunately, i am not able to find the "` + topic + `".`, event.threadID, event.messageID);
   })
}


const info = (api, event)=>{
    let { mentions,threadID,messageID,body,senderID } = event
    api.getUserInfo(Object.keys(mentions), async (err, ret) => {
        if(err) return reportIssue(api, err);
        for(var prop in ret) {
            let {vanity,name,gender,isBirthday} = ret[prop]
            let url = encodeURI('https://graph.facebook.com/'+`${prop}`+'/picture?height=720&width=720&access_token=' + apiKey[1])
            let filename = __dirname + "/imgs/"+ prop + ".jpg";
            let msg = `
User ID: ${prop}
Name: ${checkFound(name)}
Username: ${checkFound(vanity)}
Gender: ${gender == 1 ? "female" : "male"}
Birthday: ${checkFound(isBirthday)}  
`
            await download(url,filename,()=>{
                api.sendMessage({ 
                  body: msg,
                  attachment:fs.createReadStream(filename)
                },threadID,messageID)     
            })
        }
    });
}

async function ai(api, event) {
    if (event.body != null) {
        let input = event.body;
        let query = input.trim().toLowerCase();
        if (query.startsWith("mj") || query.startsWith("repol") || input.toLowerCase().startsWith("par ") || input.toLowerCase().startsWith("pri ") || query.startsWith("mrepol742") || query.endsWith("?")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                if (event.senderID == myGirlAccountId && query.endsWith("?")) {
                    return;
                }
                api.sendMessage("Hello the system status is online and waiting for your reply. \nFor available commands enter help, this project does not disclose any personal data. In aims of breaking apart the line between human and computer.\n\nTHERE IS NO WARRANTY FOR THE SOFTWARE, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE SOFTWARE “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SOFTWARE IS WITH THE CUSTOMER. SHOULD THE SOFTWARE PROVE DEFECTIVE, THE CUSTOMER ASSUMES THE COST OF ALL NECESSARY SERVICING, REPAIR, OR CORRECTION EXCEPT TO THE EXTENT SET OUT UNDER THE HARDWARE WARRANTY IN THESE TERMS.", threadID, (err) => {
                    if (err) return
                }, messageID)
            } else {
                var text = input;
                if (event.senderID == myGirlAccountId && query.endsWith("?")) {
                    return;
                } else if (query.startsWith("repol")) {
                    text = input.substring(6)
                } else if (input.toLowerCase().startsWith("par ") || input.toLowerCase().startsWith("pri ")) {
                    text = input.substring(5)
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
                    temperature: 0.5,
                    max_tokens: 4000,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.0,
                });
                let finish = data.choices[0].text;
                if (finish.startsWith("?")) {
                    finish = finish.slice(1);
                }
                api.sendMessage(finish, event.threadID, (err) => {
                    if (err) return
                }, messageID)
            }
        }
        if (event.senderID == myGirlAccountId) {
            return;
        }
        if (query.startsWith("pdf")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using pdf query instead.\nFor example:\npdf fundamentals in engineering", event.threadID, event.messageID)
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;

                    let res = await pdfdrive.findEbook(searched);
                    let res2 = await pdfdrive.getEbook(res[0].ebookUrl);

                    reportIssue(api, res2);

                    api.sendMessage(`${res2.ebookName}\n\n` + `${res2.dlUrl}`, event.threadID, event.messageID)
                } catch (err) {
                    reportIssue(api, err);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                }
            }
        } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query.startsWith("dict")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using urbandictionary query instead.\nFor example:\nurbandictionary computer", threadID, messageID)
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
                    api.sendMessage(def + "\n\nExample: \n" + sample, threadID, messageID)
                }).catch(function(error) {
                    reportIssue(api, error);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                });
            }
        } else if (query.startsWith("summarize") || query.startsWith("summ")) {
            var {
                mentions,
                senderID,
                threadID,
                messageID
            } = event;
            if (input.split(" ").length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using summarize message instead.\n\nFor example:\nsummarize this sentence meant to be summarized.", threadID, messageID)
            } else {
                var text = input.substring(11);
                if (query.startsWith("summ")) {
                    text = input.substring(5)
                }
                const client = new NLPCloudClient('bart-large-cnn', apiKey[4])
                client.summarization(text).then(function({
                    data
                }) {
                    api.sendMessage(data.summary_text, threadID, messageID)
                }).catch(function(err) {
                    reportIssue(api, err.response.data.detail);
                    api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
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

        if (query.startsWith("google") || query.startsWith("search") || query.startsWith("find")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using google query instead.\n\nFor example:\ngoogle computer", event.threadID, event.messageID)
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;
                    let response = await searching(searched);
                    let result = response.results;

                    reportIssue(api, response);

                    if (result === undefined || Object.entries(result).length === 0) {
                        throw new Error(`Unfortunately there was an error occured while searching "${searched}"`, event.threadID, event.messageID)
                    }
                     api.sendMessage(`${result[0].description}\n\n${result[0].url}`, event.threadID, event.messageID);
                } catch (err) {
                    reportIssue(api, err);
                    api.sendMessage(`${err.message}`, event.threadID, event.messageID);
                }
            }
        } else if (query.startsWith("baybayin")) {
            let data = input.split(" ")
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using baybaying query instead.\n\nFor example:\nbaybayin ako ay filipino", event.threadID, event.messageID)
            } else {
                data.shift()
                axios.get('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" "))
                    .then(response => {
                        api.sendMessage(response.data.baybay, event.threadID, event.messageID);
                    })
                    .catch(error => {
                        reportIssue(api, error);
                        api.sendMessage("Unfortunately there was an error occured.", event.threadID, event.messageID);
                    })
            }
        } else if (query.startsWith("weather")) {
            let data = input.split(" ")
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using weather country state city instead.\n\nFor example:\nweather philippines ncr caloocan city", event.threadID, event.messageID)
            } else {
                data.shift()
                let weather = await weathersearch("weather " + data.join(" "))
                reportIssue(api, weather.weather)
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
                        api.sendMessage(m, event.threadID, event.messageID)
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
                    api.sendMessage(m, event.threadID, event.messageID)
                }
            }
        } else if (query.startsWith("facts")) {
            let data = input.split(" ")
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using facts query instead.\n\nFor example:\nfacts about computers", event.threadID, event.messageID)
            } else {
                data.shift()
                var url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(event, url, __dirname + '/imgs/facts.png');
            }
        } else if (query.startsWith("instagram") || query.startsWith("insta") || query.startsWith("ig")) {
            let data = input.split(" ")
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using instagram username instead.\n\nFor example:\ninstagram melvinjonesrepol", event.threadID, event.messageID)
            } else {
                data.shift()
                axios.get('https://api.popcat.xyz/instagram?user=' + data.join(" "))
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

                        request(profilepic).pipe(fs.createWriteStream(__dirname + '/imgs/instaprofile.png'))

                            .on('finish', () => {
                                api.sendMessage({
                                    body: "Username: " + username + "\nFull Name: " + fullname + "\nBio: " + biography + "\nPosts: " + posts + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified,
                                    attachment: fs.createReadStream(__dirname + '/imgs/instaprofile.png')
                                }, event.threadID, event.messageID);
                            })
                    })
                    .catch(error => {
                        reportIssue(api, error);
                        api.sendMessage("Unfortunately user was not found.", event.threadID, event.messageID);
                    })
            }
        } else if (query.startsWith("changeemo")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using changeemo emoji instead.\n\nFor example:\nchangeemo 😂", event.threadID, event.messageID)
            } else {
                data.shift()
                api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                    if (err) return reportIssue(api, err);
                });
            }
        } else if (query.startsWith("test") || query.startsWith("hello world") || query.startsWith("hi world")) {
            api.sendMessage("Hello World", event.threadID, event.messageID);
        } else if (query == "hi") {
            api.sendMessage("Hello", event.threadID, event.messageID);
        } else if (query == "hello") {
            api.sendMessage("Hi", event.threadID, event.messageID);
        } else if (query == "bot") {
            api.setMessageReaction(":heart:", event.threadID, event.messageID);
        } else if (query == "sup" || query == "wassup" || query == "what's up" || query == "how are you") {
            let ans = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
            api.sendMessage(ans[Math.floor(Math.random() * 6)], event.threadID, event.messageID);
        } else if (query.startsWith("hey")) {
            let ans = ["Sup", "Hey :D", "hey", "Me?", "yes?"];
            api.sendMessage(ans[Math.floor(Math.random() * 5)], event.threadID, event.messageID);
        } else if (query.startsWith("who made you") || query.startsWith("who's your creator") || query.startsWith("where do you come from")) {
            let ans = ["I'm a long story... About 24h long.", "I'm not too sure", "I never really asked myself this question."];
            api.sendMessage(ans[Math.floor(Math.random() * 3)], event.threadID, event.messageID);
        } else if (query.startsWith("sayit")) {
            api.sendMessage("your stupid", event.threadID, event.messageID);
        } else if (query.includes("haha") || query.includes("ahah") || query.includes("ahha") || query.includes("😂") || query.includes("🤣") || query.includes("😆") || query.includes("funny") || query.includes("insane") || query.includes("lol") || query.includes("lmao")) {
            api.setMessageReaction(":laughing:", event.messageID);
        } else if (query.includes("sad") || query.includes("tired") || query.includes("sick")) {
            api.setMessageReaction(":sad:", event.messageID);
        } else if (query.includes("angry")) {
            api.setMessageReaction(":angry:", event.messageID);
        } else if (query.includes("cry")) {
            api.setMessageReaction(":cry:", event.messageID);
        } else if (query.includes("love")) {
            api.setMessageReaction(":love:", event.messageID);
        } else if (query.startsWith("goodeve")) {
            api.setMessageReaction(":love:", event.messageID);
            api.sendMessage("Good evening too...", event.threadID, event.messageID);
        } else if (query.startsWith("goodmorn")) {
            api.setMessageReaction(":love:", event.messageID);
            api.sendMessage("Good morning too...", event.threadID, event.messageID);
        } else if (query.startsWith("goodnight")) {
            api.setMessageReaction(":love:", event.messageID);
            api.sendMessage("Good night too...", event.threadID, event.messageID);
        } else if (query.startsWith("goodafter")) {
            api.setMessageReaction(":love:", event.messageID);
            api.sendMessage("Good afternoon too...", event.threadID, event.messageID);
        } else if (query == "tsk") {
            api.setMessageReaction(":like:", event.messageID);
        } else if (query == "yes") {
            api.sendMessage("No", event.threadID, event.messageID);
        } else if (query == "okay") {
            api.sendMessage("Yup", event.threadID, event.messageID);
        } else if (query == "no") {
            api.sendMessage("Yes", event.threadID, event.messageID);
        } else if (query == "idk") {
            api.sendMessage("i dont know too...", event.threadID, event.messageID);
        } else if (query == "nice") {
            api.setMessageReaction(":heart:", event.messageID);
        } else if (query.includes("uwu")) {
            api.setMessageReaction("🥺", event.messageID);
        } else if (query.includes("nude")) {
            api.sendMessage("Dont!...", event.threadID, event.messageID);
        } else if (query.startsWith("unsend on") && !settings.onUnsend) {
            settings.onUnsend = true
            fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")
            reportIssue(api, "unsend enabled");
        } else if (query.startsWith("unsend off")  && settings.onUnsend) {
            settings.onUnsend = false
            fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")
            reportIssue(api, "unsend disabled");
        } else if (query.startsWith("groupid")) {
            api.getThreadInfo(event.threadID, (err) => {
                if (err) return cosole.log(err);
                else {
                    api.sendMessage(event.threadID, event.threadID, event.messageID);
                }
            });
        } else if (query == "help") {
            let help = "Hello World\n\n";
            help += "Usage: \ncommand [options]\n\n";
            help += "Commands:\n";
            help += "pdf [search]      - find pdf and ebook\n";
            help += "dict [search]     - dictionary\n";
            help += "summ [paragraph]  - summarize paragraph and sentence\n";
            help += "find [search]     - google search\n";
            help += "baybayin [query]  - translate to baybayin\n";
            help += "weather [country] [state] [city] - show current weather status\n";
            help += "facts [query]     - facts meme generator\n";
            help += "ig [username]     - get user instagram info\n";
            help += "changeemo [emoji] - change group chat emoji\n";
            help += "unsend [on|off]   - enable or disable unsend feature\n";
            help += "wiki [query]      - search poeple or info from wikipedia\n";
            help += "info [username]   - get user facebook basic info\n";
            help += "nickname [username] [nickname] - change the user nickname\n";
            help += "landscape         - show landscape photos\n";
            help += "portrait          - show portrait photos\n";
            help += "animequote        - show anime qoutes\n";
            help += "motivation        - show motivation messages\n";
            help += "unsent, remove    - unsent my messages\n";
            help += "phub              - show p*rnhub meme generator\n";
            help += "qrcode [query]    - show generated qrcode from your query\n";
            help += "uid               - show person user id\n";
            help += "groupid           - show the group id\n";
            help += "help              - show help section\n\nall commands mentioned above are minified to fit to a message, some commands may trigger from certain keyword or actions.\nIf you have questions ask me with ? at the end.";
            api.sendMessage(help, event.threadID, event.messageID);
        } else if (query.startsWith("wiki")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using wiki query instead.\n\nFor example:\nwiki google", event.threadID, event.messageID)
            } else {
                wiki(api.sendMessage, input.substring("5"), event);
            }
        } else if (query.startsWith("info")) {
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using info @user instead.\n\nFor example:\ninfo @Melvin Jones Repol", event.threadID, event.messageID)
            } else {
               if (input.includes("@")) {
                   info(api, event);
               } else {
                   api.sendMessage("Unable to find information without mentioning someone.", event.threadID, event.messageID)
               }
            }
        } else if (query.startsWith("nickname")) {
            var text = input;
            text = text.substring(26)
            let data = input.split(" ");
            if (data.length < 2) {
                api.sendMessage("Opps! I didnt get it. You should try using nickname mentioned nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol", event.threadID, event.messageID);
            } else {
                api.getThreadInfo(event.threadID, (err, info) => {
                    var mentionid = `${Object.keys(event.mentions)[0]}`;

                    api.changeNickname(text, `${info.threadID}`, mentionid, (err) => {
                        if (err) return api.sendMessage("Unfortunately there was an error occured.", event.threadID, event.messageID);
                    });
                });
            }
        } else if (query.startsWith("landscape")) {
            parseImage(event, "https://source.unsplash.com/1600x900/?landscape", __dirname + '/imgs/landscape.png');
        } else if (query.startsWith("portrait")) {
            parseImage(event, "https://source.unsplash.com/900x1600/?portrait", __dirname + '/imgs/portrait.png');
        } else if (query.startsWith("animequote")) {
            axios.get('https://animechan.vercel.app/api/random')
                .then(response => {
                    api.sendMessage("'" + response.data.quote + "'" + "\n\n- " + response.data.character + " (" + response.data.anime + ")", event.threadID, event.messageID);
                })
                .catch(error => {
                    reportIssue(api, error);
                    api.sendMessage("Unfortunately there was an error occured.", event.threadID, event.messageID);
                });
        } else if (query.startsWith("motivation")) {
            qt("motivation").then((response) => {
                if (response == null) {
                    reportIssue(api, response);
                    api.sendMessage("Unfortunately there was an error occured.", event.threadID, event.messageID);
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = `${response[i].q} \n\n- ${response[i].a}\n\n`
                    }
                    api.sendMessage(result, event.threadID, event.messageID);
                }
            });
        } else if (query == "refresh" || query == "reload") {
            let A = api.getAppState();
            let B = await JSON.stringify(A);
            fs.writeFileSync("fb.json", B, "utf8");
            api.sendMessage("AppState Refreshed Successfully!.", event.threadID, event.messageID);
        }
        
    }
}

function parseImage(event, url, dir) {
    request(url).pipe(fs.createWriteStream(dir))
    .on('finish', () => {
        api.sendMessage({
            attachment: fs.createReadStream(dir)
        }, event.threadID, event.messageID);
    })
}

function reportIssue(api, api, err) {
    console.log(err);
    api.getThreadInfo(event.threadID, (err, info) => {
        if (err) return console.log(err);
        else {
            api.sendMessage(err, myAccountId);
        }
    });
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

async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => {
        return response.data
    }).catch((err) => {
        return null
    });
    return qoute
}