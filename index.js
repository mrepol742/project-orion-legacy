const fs = require("fs");
const login = require("fca-unofficial");
const prefix = "$";
const msgs = {};
const pdfdrive = require('pdfdrive-ebook-scraper');
const google = require("googlethis");
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

// login using facebook
login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return console.error(err);

    // time check to prevent the bot from stopping
    cron.schedule('*/30 * * * *', () => {
        var hours = date("Asia/Manila").getHours()
        var mins = date("Asia/Manila").getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? '0' + mins : mins;
        console.log("Time Check " + hours + ":" + mins + " " + ampm)
        api.sendMessage("Time Check " + hours + ":" + mins + " " + ampm, "100071743848974");
    });

    // refresh app state for every 60 minutes
    cron.schedule('0 * * * *', () => {
        let A = api.getAppState();
        let B = JSON.stringify(A);
        fs.writeFileSync("fb.json", B, "utf8");
        api.sendMessage("[OK] AppState Refreshed Successfully!", "100071743848974")
    });

    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
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
                if (event.body != null) {
                    let input = event.body;
                    if (input.toLowerCase().startsWith("pdf")) {
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

                                console.log(res2);

                                api.sendMessage(`${res2.ebookName}\n\n` + `${res2.dlUrl}`, event.threadID, event.messageID)
                            } catch (err) {
                                api.setMessageReaction(":sad:", event.messageID);
                                api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                            }
                        }
                    }
                    if (input.toLowerCase().startsWith("mj") || input.toLowerCase().startsWith("repol") || input.toLowerCase().startsWith("par") || input.toLowerCase().startsWith("mrepol742")) {
                        var {
                            mentions,
                            senderID,
                            threadID,
                            messageID
                        } = event;
                        if (input.split(" ").length < 2) {
                            api.sendMessage("Hello the system status is online and waiting for your reply.", threadID, (err) => {
                                if (err) return
                            }, messageID)
                        } else {
                            var text = input.substring(3)
                            if (input.toLowerCase().startsWith("repol")) {
                                text = input.substring(6)
                            } else if (input.toLowerCase().startsWith("par")) {
                                text = input.substring(4)
                            } else if (input.toLowerCase().startsWith("mrepol742")) {
                                text = input.substring(10)
                            }
                            const configuration = new Configuration({
                                apiKey: "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",
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
                            api.sendMessage(data.choices[0].text, event.threadID, (err) => {
                                if (err) return
                            }, messageID)
                        }
                    } else if (input.toLowerCase().startsWith("urbandictionary") || input.toLowerCase().startsWith("dictionary") || input.toLowerCase().startsWith("dict")) {
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
                            if (input.toLowerCase().startsWith("dictionary")) {
                                text = input.substring(11)
                            } else if (input.toLowerCase().startsWith("dict")) {
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
                                    'X-RapidAPI-Key': 'bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf'
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
                                console.error(error);
                                api.setMessageReaction(":sad:", event.messageID);
                                api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                            });
                        }
                    } else if (input.toLowerCase().startsWith("summarize") || input.toLowerCase().startsWith("summ")) {
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
                            if (input.toLowerCase().startsWith("summ")) {
                                text = input.substring(5)
                            }
                            const client = new NLPCloudClient('bart-large-cnn', '5ab3c279e089139f63017eea409573731d5e8ce9')
                            client.summarization(text).then(function({
                                data
                            }) {
                                api.sendMessage(data.summary_text, threadID, messageID)
                            }).catch(function(err) {
                                console.log(err.response.data.detail);
                                api.setMessageReaction(":sad:", event.messageID);
                                api.sendMessage("An unknown error as been occured. Please try again later.", threadID, messageID)
                            });
                        }
                    } else if (input.toLowerCase().startsWith("tim")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("tsk", event.threadID);
                        } else {
                            try {
                                data.shift()
                                let txt = data.join(" ");
                                axios.get('https://api.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=Joyce')
                                    .then(response => {
                                        api.sendMessage(response.data['success'], event.threadID, event.messageID);
                                    })
                            } catch (err) {
                                console.log(`${err.message}`);
                                api.setMessageReaction(":sad:", event.messageID);
                                api.sendMessage("An unknown error as been occured. Please try again later.", event.threadID, event.messageID);
                            }
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
                        return await google.search(`${searched}`, options);
                    };

                    if (input.toLowerCase().startsWith("google") || input.toLowerCase().startsWith("search") || input.toLowerCase().startsWith("find")) {
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

                                console.log(response);

                                if (result === undefined || Object.entries(result).length === 0) {
                                    throw new Error(`Unfortunately there was an error occured while searching "${searched}"`, event.threadID, event.messageID)
                                }
                                 api.sendMessage(`${result[0].description}\n\n${result[0].url}`, event.threadID, event.messageID);
                            } catch (err) {
                                api.setMessageReaction(":sad:", event.messageID);
                                api.sendMessage(`${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }
                    if (input.toLowerCase().startsWith("test") || input.toLowerCase().startsWith("hello world") || input.toLowerCase().startsWith("hi world")) {
                        api.sendMessage("Hello World", event.threadID, event.messageID);
                    }
                    if (input.toLowerCase() == "hi") {
                        api.sendMessage("Hello", event.threadID, event.messageID);
                    } else if (input.toLowerCase() == "hello") {
                        api.sendMessage("Hi", event.threadID, event.messageID);
                    } else if (input.toLowerCase() == "bot") {
                        api.setMessageReaction(":heart:", event.threadID, event.messageID);
                    } else if (input.toLowerCase() == "sup" || input.toLowerCase() == "wassup" || input.toLowerCase() == "what's up" || input.toLowerCase() == "how are you") {
                        let ans = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
                        api.sendMessage(ans[Math.floor(Math.random() * 6)], event.threadID, event.messageID);
                    } else if (input.toLowerCase().startsWith("hey")) {
                        let ans = ["Sup", "Hey :D", "hey", "Me?", "yes?"];
                        api.sendMessage(ans[Math.floor(Math.random() * 5)], event.threadID, event.messageID);
                    } else if (input.toLowerCase().startsWith("who made you") || input.toLowerCase().startsWith("who's your creator") || input.toLowerCase().startsWith("where do you come from")) {
                        let ans = ["I'm a long story... About 24h long.", "I'm not too sure", "I never really asked myself this question."];
                        api.sendMessage(ans[Math.floor(Math.random() * 3)], event.threadID, event.messageID);
                    } else if (input.toLowerCase().startsWith("sayit")) {
                        api.sendMessage("your stupid", event.threadID, event.messageID);
                    } else if (input.toLowerCase().includes("haha") || input.toLowerCase().includes("ahah")) {
                        api.setMessageReaction(":laughing:", event.messageID);
                    } else if (input.toLowerCase().startsWith("tsk")) {
                        api.sendMessage("tsk!..", event.threadID, event.messageID);
                    } else if (input.toLowerCase() == "yes") {
                        api.sendMessage("No", event.threadID, event.messageID);
                    } else if (input.toLowerCase() == "no") {
                        api.sendMessage("Yes", event.threadID, event.messageID);
                    }
                    if (input.toLowerCase().startsWith("groupid")) {
                        api.getThreadInfo(event.threadID, (err) => {
                            if (err) return cosole.log(err);
                            else {
                                api.sendMessage(event.threadID, event.threadID, event.messageID);
                            }
                        });
                    }
                    if (input.toLowerCase() == "help") {
                        api.sendMessage("tsk!..", event.threadID, event.messageID);
                    }
                    if (input.toLowerCase().startsWith("wiki")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("Opps! I didnt get it. You should try using wiki query instead.\n\nFor example:\nwiki google", event.threadID, event.messageID)
                        } else {
                            wiki(api.sendMessage, input.substring("5"), event);
                        }
                    }
                }
                break;
            case "message_reply":
                let msgid = event.messageID;
                let input = event.body;
                msgs[msgid] = input;

                if (input.toLowerCase().startsWith("unsent")) {
                    if (event.messageReply.senderID != api.getCurrentUserID()) {
                        api.sendMessage("Houston! I cannot unsent messages didn't come from me. sorry.", event.threadID, event.messageID);
                    } else {
                        api.unsendMessage(event.messageReply.messageID);
                    }
                }

                if (input.toLowerCase().startsWith("nickname")) {
                    if (input.split(" ").length < 2) {
                       api.sendMessage("Opps! I didnt get it. You should try using rename name instead.\nFor example:\nrename mj", event.threadID, event.messageID);
                    } else {
                       api.changeNickname(input.substring(7), event.threadID, event.messageReply.senderID);
                    }
                }

                if (input.toLowerCase().startsWith("uid")) {
                    api.getUserInfo(event.messageReply.senderID, (err) => {
                        if (err) return console.log(err);
                        else {
                            api.sendMessage(event.messageReply.senderID, event.threadID, event.messageID);
                        }
                    });
                }

                break;
            case "message_unsend":

                api.sendMessage("you unsent a message", event.threadID, event.messageID);
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
      console.log(err)
      api(`Sorry. i'm unable to find the wiki for "` + topic + `"`, event.threadID, event.messageID);
   })
}
