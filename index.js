const fs = require("fs");
const login = require("fca-unofficial");
const prefix = "¥";
const msgs = {};
const pdfdrive = require('pdfdrive-ebook-scraper');
const google = require("googlethis");
const { Configuration, OpenAIApi } = require("openai");
const NLPCloudClient = require('nlpcloud');
const date = require('./datetime.js');
const {
    keep_alive
} = require("./keep_alive.js");
const cron = require('node-cron');
const axios = require("axios");
         
//Login | Facebook (FbState.json)
login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return console.error(err);

    //Time Check to Avoid Bot Deads | Node Cron Task Scheduler
    cron.schedule('*/30 * * * *', () => {
        var hours = date("Asia/Manila").getHours()
        var mins = date("Asia/Manila").getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; //The hour '0' should be '12'
        mins = mins < 10 ? '0' + mins : mins;
        console.log("Time Check " + hours + ":" + mins + " " + ampm)
        api.sendMessage("Time Check " + hours + ":" + mins + " " + ampm, "100081936620905");
    });

    //RefreshAppState | Every 60 Minutes
    cron.schedule('0 * * * *', () => {
        let A = api.getAppState();
        let B = JSON.stringify(A);
        fs.writeFileSync("fb.json", B, "utf8");
        api.sendMessage("[OK] AppState Refreshed Successfully!", "100081936620905")
    });
  
	const listenEmitter = api.listen(async (err, event) => {
		if (err) return console.error(err);
		switch (event.type) {
			case "message":

				if (event.attachments.length != 0) {
					if (event.attachments[0].type == "photo") {
						msgs[event.messageID] = ['img', event.attachments[0].url]
					}
					else if (event.attachments[0].type == "animated_image") {
						msgs[event.messageID] = ['gif', event.attachments[0].url]
					}
					else if (event.attachments[0].type == "sticker") {
						msgs[event.messageID] = ['sticker', event.attachments[0].url]
					}
					else if (event.attachments[0].type == "video") {
						msgs[event.messageID] = ['vid', event.attachments[0].url]
					}
					else if (event.attachments[0].type == "audio") {
						msgs[event.messageID] = ['vm', event.attachments[0].url]
					}
				} else {
					msgs[event.messageID] = event.body
				} if (event.body != null) {
					let input = event.body;

          //pdf search 

  if (input.startsWith(prefix + "pdf")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("❌Invalid Command\n💡Usage: >search<space>searchText", event.threadID, event.messageID)
                        }
                        else {
                            try {
                                data.shift()
                                data = data.join(" ");
                                let searched = data;
                              
                              let res= await pdfdrive.findEbook(searched);
                                  let res2= await pdfdrive.getEbook(res[0].ebookUrl);

                                console.log(res2);
                                
                                let msg = `💠Search Result💠\n\n`;
                                msg += `🔎You searched: ${searched}\n\n`;
                               
                                msg += `\n📝Name:\n\n ${res2.ebookName}\n`;
                                msg += `\n🔗Download:\n ${res2.dlUrl}`;

                                api.sendMessage(msg, event.threadID)
                            }
                            catch (err) {
                                api.sendMessage(`❌ ${err.message}`, event.threadID, event.messageID);
                            }
                        }
                        }

          //openai
if (input.startsWith("Yen")){
                   var {mentions, senderID, threadID, messageID} = event;
                    if (input.split(" ").length < 2){
                    api.sendMessage("Status: Online and waiting to your Command", threadID, (err) => {if (err) return}, messageID)
                    }
                    else{
                    var text = input.substring(4)
                    const configuration = new Configuration({
                    apiKey: "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",
                });
                    const openai = new OpenAIApi(configuration);
              const {data} = await openai.createCompletion("text-davinci-002", {
  prompt: text,
  temperature: 0.5,
  max_tokens: 4000,
  top_p: 0.3,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
});
          api.sendMessage(data.choices[0].text, event.threadID, (err) => {if (err) return}, messageID)
           }
       }       
    
//Dictionary

else if (input.startsWith(prefix + "UrbanDictionary")){
                   var {mentions, senderID, threadID, messageID} = event;
                    if (input.split(" ").length < 1){
                    api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: Dictionary <word>",threadID,messageID)
                    }else{
                    var text = input.substring(17)
                    const options = {
  method: 'GET',
  url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
  params: {term: text},
  headers: {
    'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
    'X-RapidAPI-Key': 'bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf'
  }
};
axios.request(options).then(function ({data}) {
	var word = data.list[0].word;
	var def = data.list[0].definition;
	var sample = data.list[0].example;
	var timestamp = data.list[0].written_on;
	var source = data.list[0].permalink;
	api.sendMessage('=====================\nYen Urban Dictionary Results\n=====================\nTimestamp: '+timestamp+"\n\nWord: "+word+"\n\nDefinition: "+def+"\n\nExample: "+sample+"\n\nSource :"+source,threadID,messageID)
}).catch(function (error) {
	console.error(error);
});
                    }
                    }

          //summarize

else if (input.startsWith(prefix + "Summarize")) {
var {mentions, senderID, threadID, messageID} = event;
                    if (input.split(" ").length < 2){
                    api.sendMessage("Usage: Summarize text here",threadID,messageID)
                    }else{
                    var text = input.substring(11);
const client = new NLPCloudClient('bart-large-cnn','5ab3c279e089139f63017eea409573731d5e8ce9')
client.summarization(text).then(function ({data}) {
    api.sendMessage("Successfully Summarize: \n\n"+data.summary_text,threadID,messageID)
  }).catch(function (err) {
    api.sendMessage("⚠️[ERR]: Status:"+err.response.status+"\nError Details: "+err.response.data.detail,threadID,messageID)
  });
}
}

          //simisimi
else if (input.startsWith("Tim")) {
            let data = input.split(" ");
            if (data.length < 2) {
              api.sendMessage("ohhhh ano", event.threadID);
            } else {
              try {
                data.shift()
                let txt = data.join(" ");
                axios.get('https://api.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=Joyce')
                  .then(response => {
                    api.sendMessage(response.data['success'], event.threadID, event.messageID);
                  })
              } catch (err) {
                api.sendMessage(`⚠️${err.message}`, event.threadID, event.messageID);
              }
            }
          }
//School schedule 
                        else if (input.startsWith(prefix + "sched")) {
                            let data = input.split(" ");
                            if (data.length < 2) {
                                fs.readFile(__dirname + '/sched.txt', 'utf8', function(err, changelog) {
                                    api.sendMessage(changelog, event.threadID, event.messageID);
                                });
                            }
  }
                  
//google search

                        const searching = async (searched) => {
                            let options = {
                                page: 0,
                                safe: false,
                                additional_params: {
                                    hl: "en"
                                }
                            }
                            return await google.search(`search ${searched}`, options);
                        };

                        if (input.startsWith(prefix+"google")) {
                            let data = input.split(" ");
                            if (data.length < 2) {
                                api.sendMessage("⚠️ Invalid Use Of Command!\n💡 Usage: ¥google <anything>", event.threadID, event.messageID)
                            }
                            else {
                                try {
                                    data.shift()
                                    data = data.join(" ");
                                    let searched = data;
                                    let response = await searching(searched);
                                    let result = response.results;

                                    //console.log(response);

                                    if (result === undefined || Object.entries(result).length === 0) {
                                        throw new Error(`Search was unsuccessful: ${searched}`, event.threadID, event.messageID)
                                    }
                                    let msg = `Google Search Result \n\n`;
                                    msg += `🔎 You searched: ${searched}\n\n`;
                                
                                    msg += `\n Description:\n [1]. ${result[0].description}\n`;
                                    msg += `\n Reference:\n [1]. ${result[0].url}`;

                                    api.sendMessage(msg, event.threadID)
                                }
                                catch (err) {
                                    api.sendMessage(`❌ ${err.message}`, event.threadID, event.messageID);
                                }
                            }
                        }

//user id and group id
          
					if (input.startsWith(prefix + "test")) {
						api.sendMessage("✅ Status online", event.threadID, event.messageID);
					}
					if (input.startsWith(prefix + "groupid")) {
						api.getThreadInfo(event.threadID, (err) => {
							if (err) return cosole.log(err);
							else {
								api.sendMessage(event.threadID, event.threadID, event.messageID);
							}
						});
					}

				}
				break;
			case "message_reply":
				let msgid = event.messageID;
				let input = event.body;
				msgs[msgid] = input;

				if (input.startsWith(prefix + "unsent")) {
					if (event.messageReply.senderID != api.getCurrentUserID())
						return api.sendMessage("[ERR] Can,t unsent message that aren't from the bot", event.threadID);
					else {
						api.unsendMessage(event.messageReply.messageID);
					}
				}

				if (input.startsWith(prefix + "uid")) {
					api.getUserInfo(event.messageReply.senderID, (err) => {
						if (err) return console.log(err);
						else {
							api.sendMessage(event.messageReply.senderID, event.threadID, event.messageID);
						}
					});
				}

				break;
			case "message_unsend":
				break;
		}
	});
});