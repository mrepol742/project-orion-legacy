// Nexus by Pat

const fs = require("fs");

const {

  keep_alive

} = require("./keep_alive.js");

const http = require('https'); // or 'https' for https:// URLs

const login = require("fca-unofficial");

const axios = require("axios");

const moment = require("moment-timezone");

const net = require('net');

const https = require("https");

const NLPCloudClient = require('nlpcloud');

const google = require("googlethis");

const cheerio = require('cheerio');

const request = require('request');

const FormData = require('form-data');

const path = require('path');

const Innertube = require('youtubei.js');

const {

  PasteClient,

  Publicity,

  ExpireDate

} = require("pastebin-api");

const {

  Configuration,

  OpenAIApi

} = require("openai");

const cron = require('node-cron');

const date = require('./files/datetime');

const getVideoId = require('get-video-id');

const morse = require('morse-node').create("ITU");

const os = require('os');

const NetworkSpeed = require('network-speed');

const process_p = require('process');

const advice = ["Don't be afraid to ask for help.",

  "Keep your code organized and readable.",

  "Use version control (such as Git) to keep track of changes to your code.",

  "Comment your code to explain what it does and how it works.",

  "Test your code thoroughly before releasing it.",

  "Always be willing to learn and improve your skills.",

  "Stay up-to-date with new technologies and best practices.",

  "Break large problems down into smaller, more manageable tasks.",

  "Write clean and efficient code.",

  "Don't be afraid to make mistakes and learn from them.",

  "Use a linter to catch errors and enforce coding style.",

  "Continuously refactor your code to improve its design.",

  "Use automated testing to ensure your code works as expected.",

  "Follow naming conventions for variables, functions, and classes.", "Use appropriate data structures and algorithms for your problem.",

  "Be mindful of performance when writing your code.",

  "Use a debugging tool to help find and fix errors in your code.",

  "Write code that is easy to understand and maintain.",

  "Use a consistent coding style throughout your project.",

  "Avoid writing overly complex code.",

  "Use error handling to handle unexpected situations in your code.",

  "Keep your code modular to make it easier to test and maintain.",

  "Write code that is easy to test.",

  "Use version control to collaborate with other developers.",

  "Use a code review process to improve the quality of your code.",

  "Use a build tool to automate tasks and improve your workflow.",

  "Use a package manager to manage dependencies in your project.",

  "Be familiar with the standard libraries of the programming languages you use.", "Use a documentation tool to generate documentation for your code.",

  "Be familiar with the tools and frameworks in your stack.",

  "Use design patterns to improve the structure of your code.",

  "Be familiar with the principles of object-oriented programming.",

  "Be familiar with the principles of functional programming.",

  "Be familiar with the principles of concurrent and parallel programming.",

  "Use a profiler to optimize the performance of your code.",

  "Use a code formatter to improve the readability of your code.",

  "Be familiar with security best practices when writing code.",

  "Use logging to help diagnose and fix errors in your code.",

  "Use a task runner to automate repetitive tasks in your workflow.", "Be familiar with the principles of good user interface design.",

  "Be familiar with the principles of good user experience design.",

  "Use source control to collaborate with other developers.",

  "Use a code review process to improve the quality of your code.",

  "Be familiar with the principles of good database design.",

  "Be familiar with the principles of good network design.",

  "Be familiar with the principles of good security design.",

  "Be familiar with the principles of good performance design.",

  "Be familiar with the principles of good scalability design."];



// GLOBAL MESSAGE STORAGE

let msgs = {};

let vips = JSON.parse(fs.readFileSync("./files/AdminPanel.json", "utf8")).BotSettings[3].VIP_Users

let cd = {};

let adm = JSON.parse(fs.readFileSync("./files/AdminPanel.json", "utf8")).BotSettings[4].ADM

let keys = JSON.parse(fs.readFileSync(__dirname + "/files/apikey.json", "utf8"));

let threads = ""

let sizesM = ["Bytes", "KB", "MB", "GB", "TB"]

let schoolthreads = ['4264360213655329', '5244593602322408'];

let engines = [];

let currentModel = "text-davinci-003";

process.on("unhandledRejection", (error) => console.error(error));

//Async Function | TikTok Downloader

async function leechTT(link) {

  out = await axios.get("https://www.tiktokdownloader.org/check.php?v=" + link).then((response) => {

    return response.data.download_url

  }).catch((error) => {

    return "err"

  })

  return out

}



//Async Function | Leech mp3 Function

async function conv(v, t, e) {

  const headers = {

    'Content-Type': 'application/x-www-form-urlencoded',

    'X-Requested-Key': 'de0cfuirtgf67a'

  }

  results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", {

    headers: headers

  }).then((response) => {

    return response.data.d_url

  }).catch((error) => {

    return error.message

  });

  return results

}

async function fetch(query) {

  const headers = {

    'Content-Type': 'application/x-www-form-urlencoded'

  }

  results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", {

    headers: headers

  }).then((response) => {

    return response.data

  }).catch((error) => {

    return error.message

  });

  return results

}



async function leechmp3(query) {

  var songs = fetch(query);

  let resp = await songs.then((response) => {

    let slist = response;

    if (slist == "err") {

      return "err"

    } else if (slist.t < 1300) {

      let d_url = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {

        return [response, slist.title]

      });

      return d_url

    } else if (slist.p == "search") {

      return 'err'

    } else if (slist.mess.startsWith("The video you want to download is posted on TikTok.")) {

      return 'tiktok'

    } else {

      return 'pakyo'

    }

  });

  return resp

}



//Async Function | Motivation/Quotes (Random/QOTD)

async function getWiki(q) {

  out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => {

    return response.data

  }).catch((error) => {

    return error

  });

  return out

}



async function qt() {

  let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => {

    return response.data

  }).catch((err) => {

    return null

  });

  return qoute

}



async function qtotd() {

  let qoute = await axios.get("https://zenquotes.io/api/today").then((response) => {

    return response.data

  }).catch((err) => {

    return null

  });

  return qoute

}



//Async Function | PDF Search

async function pdfsearch(query) {

  let result = await google.search(query, {

    safe: true

  })

  return result

}

//Async Function | progadvice 

function getAdvice() {

  let adviceNum = Math.floor(Math.random() * advice.length);

  return advice[adviceNum];

}



//Login | Facebook (FbState.json)

login({

  appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8'))

}, (err, api) => {

  if (err) return console.error(err);



  //SelfPing Http request, Port Avoid Bot Deads | Node Cron Task Scheduler


const url = "https://Nx.g3s7er.repl.co";
const host = 'localhost';
const port = 3000;
const timezone = "Asia/Manila";

//HTTP request check
const checkWebsite = async () => {
  try {
    const response = await axios.get(url, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
    if (response.status === 200) {
      const currentTime = moment().tz(timezone).format("YYYY-MM-DD hh:mm:ss A");
      console.log(`${currentTime}: ${url} is up.`);
      adm.forEach(userID => {
        api.sendMessage(`${currentTime}: Nexus is up.`, userID);
      });
    }
  } catch (error) {
    const currentTime = moment().tz(timezone).format("YYYY-MM-DD hh:mm:ss A");
    console.error(`${currentTime}: ${url} is down.`);
    adm.forEach(userID => {
      api.sendMessage(`${currentTime}: Nexus is down.`, userID);
    });
  }
};

cron.schedule('*/10 * * * *', checkWebsite, {
  scheduled: true,
  timezone: timezone
});
  //self-ping feature
const checkSelfPing = async () => {
  try {
    const response = await axios.get(url);
    const currentTime = moment().tz(timezone).format("YYYY-MM-DD hh:mm:ss A");
    console.log(`${currentTime}: Self-ping successful. Bot is up and running!`);
    adm.forEach(userID => {
      api.sendMessage(`\n\n\n${currentTime}: Self-ping successful. Bot is up and running!`, userID);
    });
  } catch (error) {
    const currentTime = moment().tz(timezone).format("YYYY-MM-DD hh:mm:ss A");
    console.error(`${currentTime}: Self-ping failed. Bot may be down.`);
    adm.forEach(userID => {
      api.sendMessage(`${currentTime}: Self-ping failed. Bot may be down.`, userID);
    });
  }
};

cron.schedule('*/10 * * * *', checkSelfPing, {
  scheduled: true,
  timezone: timezone
});
//port monitoring
const checkPortStatus = () => {
  const client = new net.Socket();
  client.setTimeout(3000);
  client.connect(port, host, () => {
    const currentTime = moment().tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
    console.log(`${currentTime}: Port ${port} on ${url} is open`);
    adm.forEach(userID => {
      api.sendMessage(`${currentTime}: Port ${port} on Nexus is open`, userID);
    });
    client.end();
  });

  client.on('error', error => {
    const currentTime = moment().tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
    console.error(`${currentTime}: Port ${port} on ${url} is closed`);
    adm.forEach(userID => {
      api.sendMessage(`${currentTime}: Port ${port} on Nexus is closed`, userID);
    });
    client.end();
  });
};

cron.schedule('*/10 * * * *', checkPortStatus, {
  scheduled: true,
  timezone: timezone
});

const appstate = () => {
  try {
    //app state refresh | Every 10 Minutes

    let A = api.getAppState();

    let B = JSON.stringify(A);

    fs.writeFileSync("fbstate.json", B, "utf8");
    const currentTime = moment().tz(timezone).format("YYYY-MM-DD hh:mm:ss A");
    adm.forEach(userID => {
      api.sendMessage(`${currentTime}: AppState Refreshed Successfully!`, userID);
    });
  } catch (error) {
    console.error(error);
  }
};

cron.schedule('*/10 * * * *', appstate, {
  scheduled: true,
  timezone: timezone
});

  
  //Astronomy Picture of the Day: | Node Cron Task Scheduler

  cron.schedule('0 7 * * *', () => {

    api.getThreadList(20, null, ['INBOX'], (err, data) => {

      if (err) return console.error("Error [Thread List Cron]: " + err);

      let i = 0;

      let j = 0;



      axios.get("https://go-apod.herokuapp.com/apod")

        .then((response) => {

          const apodData = response.data;

          const url = apodData.hdurl;

          request(url).pipe(fs.createWriteStream(__dirname + '/attachments/apod.jpg')).on('finish', () => {

            const message = {

              body: `Astronomy Picture of the Day:\n\nTitle: ${apodData.title}\n\nExplanation: ${apodData.explanation}`,

              attachment: fs.createReadStream(__dirname + '/attachments/apod.jpg'),

            };

            // Print APOTD to All Threads

            while (j < 20 && i < data.length) {

              if (data[i].isGroup && data[i].name != data[i].threadID) {

                api.sendMessage(message, data[i].threadID);

                j++;

              }

              i++;

            }

          });

        })

        .catch((error) => {

          console.error(error);

          api.sendMessage("Error while fetching APOD, try again later", event.threadID);

        });

    });

  }, {

    scheduled: true,

    timezone: "Asia/Manila"

  });



  cron.schedule('0 6 * * *', () => {

    api.getThreadList(20, null, ['INBOX'], (err, data) => {

      if (err) return console.error("Error [Thread List Cron]: " + err);

      let i = 0;

      let j = 0;



      axios.get("https://api.adviceslip.com/advice")

        .then((response) => {

          const advice = response.data.slip.advice;

          const message = {

            body: `Advice of the Day:\n\n ${advice}`,

          };

          while (j < 20 && i < data.length) {

            if (data[i].isGroup && data[i].name != data[i].threadID) {

              api.sendMessage(message, data[i].threadID);

              j++;

            }

            i++;

          }

        })

        .catch((error) => {

          console.error(error);

          api.sendMessage("Error while fetching advice, try again later", event.threadID);

        });

    });

  }, {

    scheduled: true,

    timezone: "Asia/Manila"

  });



  //Quotes of the Day | Node Cron Task Scheduler

  cron.schedule('0 6 * * *', () => {

    api.getThreadList(20, null, ['INBOX'], (err, data) => {

      if (err) return console.error("Error [Thread List Cron]: " + err)

      let i = 0

      let j = 0



      qtotd("quotes of the day").then((response) => {

        if (response == null) {

          api.sendMessage("An error occured", "5244593602322408")

        } else {

          let mresult = "Quotes of the day:\n\n"

          for (let i = 0; i < response.length; i++) {

            mresult += `${response[i].q} \n\n- ${response[i].a}\n\n`

          }

          //Print QOTD to All Threads

          while (j < 20 && i < data.length) {

            if (data[i].isGroup && data[i].name != data[i].threadID) {

              api.sendMessage(mresult, data[i].threadID);

              j++

            }

            i++

          }

        }

      });

    });



  }, {

    scheduled: true,

    timezone: "Asia/Manila"

  });



  api.setOptions({

    listenEvents: true,

    selfListen: false,

    online: true

  });



  //Listen Events | Facebook B0T API

  const listenEmitter = api.listen(async (err, event) => {



    //JSON Parse

    let pinned = JSON.parse(fs.readFileSync("files/pinned.json", "utf8"));

    let settings = JSON.parse(fs.readFileSync("files/settings.json", "utf8"));



    // MarkAsReadAll - Facebook Tools

    /*api.markAsReadAll((err) => {

        if (err) return console.error(err);

    });*/



    if (err) return console.error(err);

    switch (event.type) {



      case "message_reply":

        /*if (vips.includes(event.senderID)) {

            api.setMessageReaction("❤️", event.messageID, (err) => {

              }, true);

        } else {

            api.setMessageReaction("😆", event.messageID, (err) => {

            }, true);

        }*/



        let msgid = event.messageID

        let input = event.body;

        msgs[msgid] = input;



        if (settings.onBot && !threads.includes(event.threadID)) {



          //Commands | RemoveBG

          if (input.toLowerCase().startsWith(settings.prefix + "removebg")) {

            const {

              threadID,

              messageID,

              type,

              messageReply

            } = event;

            if (type != "message_reply") return

            if (messageReply.attachments.length < 1) {

              api.sendMessage("[ERR]No Image Detected!", event.threadID, event.messageID);

            } else if (messageReply.attachments.length > 1) {

              api.sendMessage("[ERR]❌Cannot use bulk bg remover at multiple image at same time, Select 1 Image Only!", event.threadID, event.messageID);

            } else if ((messageReply.attachments.length === 1) && (messageReply.attachments[0].type == 'photo')) {

              const url = messageReply.attachments[0].url;

              request(url).pipe(fs.createWriteStream(__dirname + '/attachments/removebg.png')).on('finish', () => {

                const inputPath = './attachments/removebg.png';

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

                    if (res.status != 200) return console.error('Error:', res.status, res.statusText);

                    fs.writeFileSync("./attachments/removebg.png", res.data);

                    var message = {

                      body: ("Nexus BG Remover"),

                      attachment: fs.createReadStream(__dirname + "/attachments/removebg.png")

                    }

                    api.sendMessage(message, event.threadID, event.messageID);

                  })

                  .catch((error) => {

                    api.sendMessage("[ERR]❌Request Failed\n\n" + error, event.threadID, event.messageID);

                    return console.error('Request failed:', error);

                  });

              })

            }

          }



          //Commands | Getting FB Information from Users

          /*if (input.toLowerCase().startsWith(settings.prefix + "getfb")) {

              api.getUserInfo(event.messageReply.senderID, (err, data) => {

                  if (err) return console.log(err);



                  let name = data[event.messageReply.senderID]['name'];

                  let vanity = data[event.messageReply.senderID]['vanity'];

                  let profileUrl = data[event.messageReply.senderID]['profileUrl'];

                  let profileBio = data[event.messageReply.senderID]['profileBio'];



                  request(`https://graph.facebook.com/${event.messageReply.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`).pipe(fs.createWriteStream('files.jpg')).on('finish', function () {

                      console.log('finished downloading files..');

                      var message = {

                          body: `Name: ${name}\nUsername: ${vanity}\nUID: ${event.messageReply.senderID}\nProfile: ${profileUrl}`,

                          attachment: fs.createReadStream(__dirname + '/files.jpg')

                          .on ("end", async () => {

                              if (fs.existsSync(__dirname + '/files.jpg')) {

                                  fs.unlink(__dirname + '/files.jpg', function (err) {

                                      if (err) console.log(err);

                                      console.log(__dirname + '/files.jpg is deleted');

                                  })

                              }

                          })



                      }

                      api.sendMessage(message, event.threadID, event.messageID);

                  })

              });

          }*/



          //Commands | Unsent B0T Messages

          else if (input.toLowerCase().startsWith("unsend") || input.toLowerCase().startsWith("unsent") || input.toLowerCase().startsWith("remove") || input.toLowerCase().startsWith("delete")) {

            api.unsendMessage(event.messageReply.messageID, (err, data) => {

              // if (err) return console.log(err);

              if (err) return api.sendMessage("You can't unsend someone message!", event.threadID, event.messageID);

            });

          }



          //Commands | Pinned Message

          if (input.toLowerCase().startsWith(settings.prefix + "pin")) {

            if (event.messageReply.body == "") { // == is equal to

              api.sendMessage("No text Detected, Please Try Again.", event.threadID);

            } else {

              pinned.pin.message[event.threadID] = event.messageReply.body

              pinned.pin.sender[event.threadID] = event.messageReply.senderID

              api.sendMessage("Your message is now in Pinned.", event.threadID, event.messageID)

              fs.writeFileSync("files/pinned.json", JSON.stringify(pinned), "utf8")

            }

          }

          //Commands | New Group Photo

          if (input.toLowerCase().startsWith(settings.prefix + "newgcdp")) {

            const {

              senderID,

              threadID,

              messageID,

              type,

              messageReply

            } = event;

            if (type != "message_reply") return

            api.getThreadInfo(event.threadID, (err, gc) => {

              var admin = gc.adminIDs;

              const res = [];

              for (let i = 0; i < admin.length; i++) {

                var gca = admin[i].id;

                res.push(gca);

              }

              var admin = res;

              if (admin.includes(senderID) && vips.includes(senderID)) {

                if (messageReply.attachments.length < 1) {

                  api.sendMessage("[ERR] No Attachment Detected!", threadID, messageID)

                } else if ((messageReply.attachments[0].type == 'photo') || (messageReply.attachments[0].type == 'animated_image')) {

                  const url = messageReply.attachments[0].url;

                  request(url).pipe(fs.createWriteStream("./attachments/gc.png")).on('finish', () => {

                    api.changeGroupImage(fs.createReadStream("./attachments/gc.png"), threadID, (err) => {

                      if (err) return console.error(err);

                    })

                  })

                }

              } else {

                api.sendMessage("[ERR] Command Is for Group Admins Only!", threadID, messageID)

              }

            })

          }

          //Commands | QRCode Generator

          if (input.toLowerCase().startsWith(settings.prefix + "qrcode")) {

            let body = event.messageReply.body

            let data = "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + body

            let f = fs.createWriteStream(__dirname + "/attachments/qr.jpg")

            let res = request(encodeURI(data))

            res.pipe(f)

            f.on("close", () => {

              api.sendMessage({

                body: "QR Code Generated",

                attachment: fs.createReadStream(__dirname + "/attachments/qr.jpg").on("end", async () => {

                  if (fs.existsSync(__dirname + "/attachments/qr.jpg")) {

                    fs.unlink(__dirname + "/attachments/qr.jpg", (err) => {

                      if (err) {

                        console.log(err)

                      }

                    })

                  }

                })

              }, event.threadID, event.messageID)

            })

          }



          // Commands | MorseEncode

          if (input.toLowerCase().startsWith(settings.prefix + "cmorse")) {

            const {

              threadID,

              messageID,

              type,

              messageReply

            } = event;

            if (type != "message_reply") return

            if (messageReply.body.length < 1) return

            var body = messageReply.body.replace(/decoding result:/gi, "");

            var encode = morse.encode(body);

            api.sendMessage("ENCODING RESULT:\n\n" + encode, threadID, messageID);

          }

          // Commands | MorseDecode

          if (input.toLowerCase().startsWith(settings.prefix + "dmorse")) {

            const {

              threadID,

              messageID,

              type,

              messageReply

            } = event;

            if (type != "message_reply") return

            if (messageReply.body.length < 1) return

            var body = messageReply.body.replace(/ENCODING RESULT:\n\n/gi, "");

            console.log(body)

            var decode = morse.decode(body);

            api.sendMessage("DECODING RESULT:\n\n" + decode, threadID, messageID);

          }



          if (input.toLowerCase().startsWith("aadm") && event.senderID.includes("100049247221868")) {

  const { threadID, messageID, type, messageReply } = event;

  if (type !== "message_reply") return;

  const items = JSON.parse(fs.readFileSync("./files/AdminPanel.json", "utf8"));

  var adm = items.BotSettings[4].ADM;

  api.getUserInfo(parseInt(messageReply.senderID), (err, data) => {

    var name = data[messageReply.senderID].name;

    if (adm.includes(messageReply.senderID)) {

      api.sendMessage(name + " is already on Admin Users List", threadID);

    } else {

      adm.push(messageReply.senderID);

      fs.writeFileSync("./files/AdminPanel.json", JSON.stringify(items), "utf8");

      api.sendMessage(name + " has successfully added to Admin Users", threadID);

    }

  });

}


if (input.toLowerCase().startsWith("radm") && event.senderID.includes("100049247221868")) {

  const { threadID, messageID, type, messageReply } = event;

  if (type !== "message_reply") return;

  api.getUserInfo(parseInt(messageReply.senderID), (err, data) => {

    const items = JSON.parse(fs.readFileSync("./files/AdminPanel.json", "utf8"));

    var adm = items.BotSettings[4].ADM;

    var name = data[messageReply.senderID].name;

    if (adm.includes(messageReply.senderID)) {

      var remove = adm.indexOf(messageReply.senderID);

      adm.splice(remove, 1);

      fs.writeFileSync("./files/AdminPanel.json", JSON.stringify(items), "utf8");

      api.sendMessage("Admin Privilege on " + name + " has successfully revoked", threadID);

    } else {

      api.sendMessage(name + " is not found on Admin Users List", threadID);

    }

  });

}


          if (input.toLowerCase().startsWith("addvip") && event.senderID.includes("100049247221868")) {

            const { threadID, messageID, type, messageReply } = event;

            if (type !== "message_reply") return;

            const filePath = "./files/AdminPanel.json";

            const items = JSON.parse(fs.readFileSync(filePath, "utf8"));

            const vips = items.BotSettings[3].VIP_Users;

            api.getUserInfo(parseInt(messageReply.senderID), (error, data) => {

              if (error) {

                console.error(error);

                return;

              }

              const name = data[messageReply.senderID].name;

              if (vips.includes(messageReply.senderID)) {

                api.sendMessage(`${name} is already on VIP Users List`, threadID);

              } else {

                vips.push(messageReply.senderID);

                fs.writeFileSync(filePath, JSON.stringify(items), "utf8");

                api.sendMessage(`${name} has successfully added to VIP Users`, threadID);

              }

            });

          }



          if (input.toLowerCase().startsWith("remvip") && event.senderID.includes("100049247221868")) {

            const { threadID, messageID, type, messageReply } = event;

            if (type !== "message_reply") return;

            api.getUserInfo(parseInt(messageReply.senderID), (error, data) => {

              if (error) {

                console.error(error);

                return;

              }

              const filePath = "./files/AdminPanel.json";

              const items = JSON.parse(fs.readFileSync(filePath, "utf8"));

              const vips = items.BotSettings[3].VIP_Users;

              const name = data[messageReply.senderID].name;

              if (vips.includes(messageReply.senderID)) {

                const removeIndex = vips.indexOf(messageReply.senderID);

                vips.splice(removeIndex, 1);

                fs.writeFileSync(filePath, JSON.stringify(items), "utf8");

                api.sendMessage(`VIP Privilage on ${name} has successfully revoked`, threadID);

              } else {

                api.sendMessage(`${name} is not found on VIP Users List`, threadID);

              }

            });

          }



          //End of Commands Event.MessageReply

        }

        break;



      case "message":

        /*if (vips.includes(event.senderID)) {

            api.setMessageReaction("❤️", event.messageID, (err) => {

            }, true);

        }*/

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

          let input2 = input.toLowerCase();



          // Commands | Admin / VIP Control

          if (input.toLowerCase().startsWith("wake up") && !settings.onBot) {

            settings.onBot = true

            fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

            api.sendMessage("Nexus is now awake.", event.threadID, event.messageID)

            for (let i = 0; i < vips.length; i++) {

              if (vips[i] != event.threadID) {

                api.sendMessage("Nexus has turned on!", vips[i])

              }

            }

          }



          if (vips.includes(event.senderID)) {

            if (input.toLowerCase().startsWith("sleep") && settings.onBot) {

              settings.onBot = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Nexus is now sleeping..", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                if (vips[i] != event.threadID) {

                  api.sendMessage("Nexus has turned off!", vips[i])

                }

              }

            }



            if (input.toLowerCase().startsWith("activate") && !threads.activeThreads.includes(event.threadID)) {

              threads.activeThreads.push(event.threadID); // Add the threadID to the activeThreads array



              // Save the updated threads object to the threads.json file

              fs.writeFileSync("files/threads.json", JSON.stringify(threads), "utf8");



              // Send a message to the current thread to indicate that the bot is activated

              api.sendMessage("Nexus is now activated in this conversation.", event.threadID, event.messageID);



              // Send a message to all VIPs to inform them that the bot was activated

              for (let i = 0; i < vips.length; i++) {

                if (vips[i] !== event.threadID) {

                  api.sendMessage("Nexus was activated from a custom thread!", vips[i]);

                }

              }

            }



            if (input.toLowerCase().startsWith("deactivate")) {

              // Check if the thread is not already in the OffThreads array

              if (!threads.OffThreads.includes(event.threadID)) {

                threads.OffThreads.push(event.threadID); // Add the threadID to the OffThreads array

                fs.writeFileSync("files/threads.json", JSON.stringify(threads), "utf8");

                api.sendMessage("Nexus is now deactivated in this conversation.", event.threadID, event.messageID);

                for (let i = 0; i < vips.length; i++) {

                  if (vips[i] != event.threadID) {

                    api.sendMessage("Nexus was deactivated from a custom thread!", vips[i]);

                  }

                }

              } else {

                api.sendMessage("Nexus is already deactivated in this conversation.", event.threadID, event.messageID);

              }

            }



            if (input.toLowerCase().startsWith("unsend: on") && !settings.onUnsend) {

              settings.onUnsend = true

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Unsent is now Activated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Unsend is now Activated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("unsend: off") && settings.onUnsend) {

              settings.onUnsend = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Unsent is now Deactivated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Unsend is now Deactivated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("greetings: on") && !settings.greetings) {

              settings.greetings = true

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Greetings is Turned ON!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Greetings is Turned ON!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("greetings: off") && settings.greetings) {

              settings.greetings = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Greetings is Turned OFF!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Greetings is Turned OFF!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("welcome msg: on") && !settings.welcome) {

              settings.welcome = true

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("welcome msg has been successfully activated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("welcome msg has been successfully activated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("welcome msg: off") && settings.welcome) {

              settings.welcome = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("welcome msg has been successfully deactivated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("welcome msg has been successfully deactivated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("antileave: on") && !settings.leave) {

              settings.leave = true

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Anti-Leave has been successfully activated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Anti-Leave has been successfully activated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("antileave: off") && settings.leave) {

              settings.leave = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Anti-Leave has been successfully deactivated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Anti-Leave has been successfully deactivated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("auto react: on") && !settings.react) {

              settings.react = true

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Auto React  has been successfully activated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Auto React  has been successfully activated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("auto react: off") && settings.react) {

              settings.react = false

              fs.writeFileSync("files/settings.json", JSON.stringify(settings), "utf8")

              api.sendMessage("Auto React  has been successfully deactivated!", event.threadID, event.messageID)

              for (let i = 0; i < vips.length; i++) {

                api.sendMessage("Auto React  has been successfully deactivated!", vips[i])

              }

            }



            if (input.toLowerCase().startsWith("status")) {

              let m = "Nexus is currently active, "

              if (settings.onBot) {

                m += "also awake."

              } else {

                m += "but on sleep mode."

              }

              api.sendMessage(m, event.threadID, event.messageID)

            } else if (input.toLowerCase().startsWith("refreshappstate")) {

              let A = api.getAppState();

              let B = await JSON.stringify(A);

              fs.writeFileSync("fbstate.json", B, "utf8");

              api.sendMessage("[OK] AppState Refreshed Successfully!", event.threadID, event.messageID)

            } else if (input.toLowerCase().startsWith("settings")) {

              api.sendMessage("Settings:" + "\n\n" + "Welcome msg: " + ((settings.welcome) ? "On" : "Off") + "\n" + "Auto React: " + ((settings.react) ? "On" : "Off") + "\n" + "Anti Leave: " + ((settings.leave) ? "On" : "Off") + "\n" + "Anti Unsend: " + ((settings.onUnsend) ? "On" : "Off") + "\n" + "Bot Active: " + ((settings.onBot) ? "On" : "Off") + "\n" + "Greetings: " + ((settings.greetings) ? "On" : "Off"), event.threadID)

            } else if (input.toLowerCase().startsWith("Threads")) {

              // api.sendMessage("List of Threads: " + "\n\n" + threads.OffThreads[0])

              var substring = threads.OffThreads.substring(0, threads.OffThreads.length + -1)

              let threadarray = substring.split(" ")

              console.log(threadarray)

            }

            else if (input.toLowerCase().startsWith("time")) {

              const options = {
                timeZone: "Asia/Manila", timeZoneName: "short",

                hour12: false,

                year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
              };



              let time = new Date();

              let currentTime = time.toLocaleString("en-US", options);

              api.sendMessage(currentTime, event.threadID);

            }

            else if (input.toLowerCase().startsWith("restart")) {

              let user = event.senderID;

              //check if the user is a VIP

              if (!vips.includes(user)) {

                api.sendMessage("Sorry, you do not have permission to perform this action.", event.threadID);

                return;

              }

              let countdown = 3;

              api.sendMessage(`System restarting in ${countdown} seconds.`, event.threadID);

              let interval = setInterval(() => {

                countdown--;

                api.sendMessage(`System restarting in ${countdown} seconds.`, event.threadID);

                if (countdown === 1) {

                  clearInterval(interval);

                  //restart the system here

                  api.sendMessage("System restarting now.", event.threadID);

                  // you can use child_process module to restart the system

                  // child_process.execSync('shutdown -r now');

                }

              }, 1000);

            }

            else if (input.toLowerCase().startsWith("uptime") || input.toLowerCase().startsWith("sysinfo") || input.toLowerCase().startsWith("ping")) {

              (async () => {



                const testNetworkSpeed = new NetworkSpeed();

                let osFreeMemm = os.freemem();

                let osFreeMem = convertBytes(osFreeMemm);

                let osTotalMemm = os.totalmem();

                let second_process = process_p.uptime();

                let seconds_con = secondsToTime(second_process);

                let osTotalMem = convertBytes(osTotalMemm);

                let baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';

                let fileSizeInBytes = 500000;

                let speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);

                let optionss = {

                  hostname: 'www.google.com',

                  port: 80,

                  path: '/catchers/544b09b4599c1d0200000289',

                  method: 'POST',

                  headers: {

                    'Content-Type': 'application/json',

                  },

                };

                let upload_spee = await testNetworkSpeed.checkUploadSpeed(optionss, fileSizeInBytes);

                const rss = convertBytes(process.memoryUsage().rss);

                const heapTotal = convertBytes(process.memoryUsage().heapTotal);

                const heapUsed = convertBytes(process.memoryUsage().heapUsed);

                const external = convertBytes(process.memoryUsage().external);

                const arrayBuffers = convertBytes(process.memoryUsage().arrayBuffers);

                api.sendMessage("The is system has been up for " + seconds_con + ".\n\n» Memory - " + osFreeMem +

                  "\n» Storage - " + osTotalMem + "\n» Uplink Speed - " + upload_spee.mbps +

                  " mbps\n» Downlink Speed " + speed.mbps + " mbps\n» Resident Set Size - " + rss + "\n» Heap Total Used - " + heapTotal +

                  "\n» Heap Used - " + heapUsed + "\n» External Used - " + external + "\n» Array Buffers Used - " + arrayBuffers, event.threadID);

              })();

            }

            else if (input.toLowerCase().startsWith("changekey")) {

              let user = event.senderID;

              //check if the user is a VIP

              if (!vips.includes(user)) {

                api.sendMessage("Sorry, you do not have permission to perform this action.", event.threadID);

                return;

              }

              let data = input.split(" ");

              if (data.length < 2 && !data[1].includes(":")) {

                // show err

              } else {

                let inp = data[1].split(":");

                keys[inp[0]] = inp[1];

                fs.writeFileSync(__dirname + "/files/apikey.json", JSON.stringify(keys), "utf8")

                api.sendMessage("Key updated " + inp[0] + ".", event.threadID);

              }

            }



            //Facebook Tools - Admin / VIP

            else if (input.toLowerCase().startsWith("sendmsg")) {

              var text = input;

              text = text.substring(8)

              const threadid = text.split(" ");

              const message = text.substring(text.indexOf(" ") + 1);

              let gc;

              if (threadid.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + sendmsg (name of gc) (message)", event.threadID);

              } else {

                switch (threadid[0]) {

                  case "BSIT-1A-FAM":

                    gc = "4264360213655329";

                    break;



                  case "CodeStack":

                    gc = "5059004720874903";

                    break;



                  case "Android-Modificators":

                    gc = "4740250299437612"

                    break;



                  default:

                    api.sendMessage("Invalid ThreadName!", event.threadID);

                }

                api.getUserInfo(parseInt(event.senderID), (err, data) => {

                  if (err) {

                    api.sendMessage(err, event.threadID);

                  } else {

                    var id = Object.keys(data);

                    var name = data[id].name;

                    api.sendMessage({

                      body: "Message from: @" + name + "\n\n" + message,

                      mentions: [{

                        tag: '@' + name,

                        id: event.senderID,

                      }]

                    }, gc);

                  }

                });

              }

            } else if (input.toLowerCase().startsWith("send")) {

              var text = input;

              text = text.substring(5)

              if (event.threadID.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + sendmsg (thread id) (message)", event.threadID);

              } else {

                const threadid = text.split(" ");

                const message = text.substring(text.indexOf(" ") + 1);



                api.getUserInfo(parseInt(event.senderID), (err, data) => {

                  if (err) {

                    console.log(err)

                  } else {

                    var id = Object.keys(data);

                    var name = data[id].name;

                    api.sendMessage({

                      body: "Message from: @" + name + "\n\n" + message,

                      mentions: [{

                        tag: '@' + name,

                        id: event.senderID,

                      }]

                    }, threadid[0]);

                    api.sendMessage("Message Sent!", event.threadID, event.messageID);

                  }

                });

              }

            }

          }



          if (settings.onBot && !threads.includes(event.threadID)) {



            //Commands | cmd

            if (input.toLowerCase().startsWith("cmd -list")) {

              api.getUserID("0x3EF8", (err, data) => {

                if (err) {

                  api.sendMessage("Error getting user ID: " + err, event.threadID);

                } else {

                  fs.readFile(__dirname + '/files/commands.txt', 'utf8', function(err, commands) {

                    if (err) {

                      api.sendMessage("Error reading commands file: " + err, event.threadID);

                    } else {

                      api.sendMessage({

                        body: commands + "\n\nDeveloped by: @Pat \nhttps://github.com/0x3EF8",

                        attachment: fs.createReadStream(__dirname + '/Nexus/Cmd.png'),

                        mentions: [{

                          tag: '@Pat',

                          id: data[0].userID,

                        }]

                      }, event.threadID);

                    }

                  });

                }

              });

            }

            //Commands | cmd info

            if (input.toLowerCase().startsWith("cmd -info")) {

              api.getUserID("0x3EF8", (err, data) => {

                if (err) {

                  api.sendMessage("Error getting user ID: " + err, event.threadID);

                } else {

                  fs.readFile(__dirname + '/files/cmdinfo.txt', 'utf8', function(err, cmdinfo) {

                    if (err) {

                      api.sendMessage("Error reading commands file: " + err, event.threadID);

                    } else {

                      api.sendMessage({

                        body: cmdinfo + "\n\nDeveloped by: @Pat \nhttps://github.com/0x3EF8",

                        attachment: fs.createReadStream(__dirname + '/Nexus/Cmd.png'),

                        mentions: [{

                          tag: '@Pat',

                          id: data[0].userID,

                        }]

                      }, event.threadID);

                    }

                  });

                }

              });

            }

            //Commands | cmd Dev

            if (input.toLowerCase().startsWith("cmd -dev")) {

              api.getUserID("0x3EF8", (err, data) => {

                if (err) {

                  api.sendMessage("Error getting user ID: " + err, event.threadID);

                } else {

                  fs.readFile(__dirname + '/files/dev.txt', 'utf8', function(err, cmddev) {

                    if (err) {

                      api.sendMessage("Error reading commands file: " + err, event.threadID);

                    } else {

                      api.sendMessage({

                        body: cmddev + "\n\nDeveloped by: @Pat \nhttps://github.com/0x3EF8",

                        attachment: fs.createReadStream(__dirname + '/Nexus/Cmd.png'),

                        mentions: [{

                          tag: '@Pat',

                          id: data[0].userID,

                        }]

                      }, event.threadID);

                    }

                  });

                }

              });

            }





            //Commands | Remove Pinned Message

            else if (input.toLowerCase().startsWith(settings.prefix + "rempin")) {

              pinned.pin.message[event.threadID] = undefined

              pinned.pin.sender[event.threadID] = undefined

              api.sendMessage("Pinned has been removed Successfully", event.threadID);

              fs.writeFileSync("files/pinned.json", JSON.stringify(pinned), "utf8")

            }



            //Commands | Show Pinned Message

            else if (input.toLowerCase().startsWith(settings.prefix + "swpin")) {

              if (pinned.pin.message[event.threadID] == undefined) {

                api.sendMessage("There is no pinned message for this thread.", event.hreadID);

              } else {

                api.getUserInfo(pinned.pin.sender[event.threadID], (err, data) => {

                  let user = data[pinned.pin.sender[event.threadID]]['name']

                  api.sendMessage("PINNED MESSAGE\n================\n\n" + pinned.pin.message[event.threadID] + "\n\nBy: " + user, event.threadID);

                });

              }

            }

            else if (input.toLowerCase().startsWith("setprefix")) {

              if (vips.includes(event.senderID)) {

                let data = input.split(" ");

                if (data.length < 2) {

                  api.sendMessage("Opps! I didn't get it. You should try using setPrefix prefix instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsetPrefix $", event.threadID, event.messageID);

                } else {

                  data.shift();

                  let pref = data.join(" ");

                  let first = pref.split("")[0];

                  if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(first)) {

                    settings.prefix = pref;

                    fs.writeFileSync(__dirname + "/files/settings.json", JSON.stringify(settings), "utf8");

                    api.sendMessage("Prefix is currently configured to " + pref, event.threadID, event.messageID);

                  } else {

                    api.sendMessage("Unable to set prefix to " + first + " due to some reasons. Please use only symbols such as ! @ # $ etc..", event.threadID, event.messageID);

                  }

                }

              }

            }

            else if (input.toLowerCase().startsWith("remprefix")) {

              if (vips.includes(event.senderID)) {

                if (settings.prefix != "" && settings.prefix != undefined) {

                  settings.prefix = "";

                  fs.writeFileSync(__dirname + "/files/settings.json", JSON.stringify(settings), "utf8");

                  api.sendMessage("Prefix reverted to default settings.", event.threadID, event.messageID);

                }

              }

            }



            //Commands | YouTube Audio Downloader (Link Only)

            else if (input.toLowerCase().startsWith(settings.prefix + "ytdl")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + ytdl <yt_link>", event.threadID);

              } else {

                api.sendMessage("🔃 Trying to Download...\n\n\nNotes:\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nThank you for your understanding, have a good day🥰!\n\n\nBy: Pat", event.threadID, event.messageID);

                try {

                  let s = leechmp3(data[1]);

                  s.then((response) => {

                    if (response == "pakyo") {

                      api.setMessageReaction("🖕🏾", event.messageID, (err) => { }, true);

                      api.sendMessage("20mins Max Duration Only!😝", event.threadID, event.messageID);

                    } else if (response == "err") {

                      api.sendMessage("❌ Invalid Input", event.threadID, event.messageID);

                      api.setMessageReaction("😭", event.messageID, (err) => {



                      }, true);

                    } else if (response == "tiktok") {

                      api.sendMessage("❌ Youtube Only, Bawal Tiktok!", event.threadID, event.messageID);

                      api.setMessageReaction("😡", event.messageID, (err) => {



                      }, true);

                    } else if (response[0] != undefined) {

                      var file = fs.createWriteStream(__dirname + '/attachments/song.mp3');

                      var targetUrl = response[0];

                      var gifRequest = http.get(targetUrl, function(gifResponse) {

                        gifResponse.pipe(file);

                        file.on('finish', function() {

                          console.log('finished downloading..')

                          api.sendMessage('✅ Download Complete! Uploading...', event.threadID)

                          var message = {

                            body: "Here's your song for you!\n\n🎶 Song Title: " + response[1] + "\n\nHappy Listening!",

                            attachment: fs.createReadStream(__dirname + '/attachments/song.mp3')

                          }

                          api.sendMessage(message, event.threadID);

                        });

                      });

                    }

                  });

                } catch (err) {

                  api.sendMessage(" Error: " + err.message, event.threadID);

                }

              }

            }



            //Commands | TikTok Video Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "tikdl")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + tikdl <tiktok_link>", event.threadID);

              } else {

                api.sendMessage("🔃 Trying to Download...\n\n\nNotes:\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nThank you for your understanding, have a good day🥰!\n\n\nBy: Pat", event.threadID, event.messageID);

                try {

                  let s = leechTT(data[1]);

                  s.then((response) => {

                    if (response == "err") {

                      api.sendMessage("❌ Invalid Input", event.threadID, event.messageID);

                      api.setMessageReaction("😭", event.messageID, (err) => {



                      }, true);

                    } else {

                      var file = fs.createWriteStream(__dirname + '/attachments/tiktok.mp4');

                      var targetUrl = response;

                      var gifRequest = http.get(targetUrl, function(gifResponse) {

                        gifResponse.pipe(file);

                        file.on('finish', function() {

                          console.log('finished downloading..')

                          api.sendMessage('✅ Download Complete! Uploading...', event.threadID)

                          var message = {

                            body: "Here's your video for you!\n\nEnjoy Watching!",

                            attachment: fs.createReadStream(__dirname + '/attachments/tiktok.mp4')

                          }

                          api.sendMessage(message, event.threadID);

                        });

                      });

                    }

                  });

                } catch (err) {

                  api.sendMessage(" Error: " + err.message, event.threadID);

                }

              }

            }



            //Commands | YouTube Video Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "video")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + video <yt title> ", event.threadID);

              } else {

                if (!(vips.includes(event.senderID))) {

                  if (!(event.senderID in cd)) {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);

                  } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {

                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);

                    return

                  } else {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);

                  }

                }



                data.shift()

                const youtube = await new Innertube();

                const search = await youtube.search(data.join(" "));

                if (search.videos[0] === undefined) {

                  api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);

                } else {

                  api.sendMessage("Connecting to YouTube!", event.threadID, event.messageID);

                  var timeleft = 3;

                  var downloadTimer = setInterval(function() {

                    if (timeleft <= 0) {

                      clearInterval(downloadTimer);

                      // api.sendMessage("A video has found!\n\nStarting to Download", event.threadID, event.messageID);

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

                  stream.pipe(fs.createWriteStream(__dirname + '/attachments/video.mp4'));



                  stream.on('start', () => {

                    console.info('[DOWNLOADER]', 'Starting download now!');

                  });

                  stream.on('info', (info) => {

                    console.info('[DOWNLOADER]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);

                  });

                  stream.on('end', () => {

                    var limit = 50 * 1024 * 1024; // 50MB in bytes

                    fs.readFile(__dirname + '/attachments/video.mp4', function(err, data) {

                      if (err) console.log(err)

                      if (data.length > limit) {

                        api.sendMessage(" [ERR]: File can't be Upload because it's too large", event.threadID, event.messageID)

                      } else {

                        console.info('[DOWNLOADER]', 'Done!')

                        var message = {

                          body: "Here's your video for you!\n\nVideo Title: " + search.videos[0].title + "\n\nDescription: " + search.videos[0].description + " \n\nEnjoy Watching!",

                          attachment: [fs.createReadStream(__dirname + '/attachments/video.mp4')]

                        }

                        api.sendMessage(message, event.threadID, event.messageID).catch((err) => api.sendMessage("[ERR]: " + err, event.threadID, event.messageID));

                      }

                    })

                  });

                  stream.on('error', (err) => console.error('[ERROR]', err));

                }

              }

            }



            //Commands | YouTube Shorts Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "ytvid")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + ytvid <shorts_link>", event.threadID);

              } else {

                if (!(vips.includes(event.senderID))) {

                  if (!(event.senderID in cd)) {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);

                  } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {

                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);

                    return

                  } else {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);

                  }

                }

                data.shift()

                const youtube = await new Innertube();

                const {

                  id

                } = getVideoId(data.join(" "));

                const search = await youtube.search("https://youtu.be/" + id);

                if (search.videos[0] === undefined) {

                  api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);

                } else {

                  api.sendMessage("Connecting to YouTube Shorts!", event.threadID, event.messageID);

                  var timeleft = 3;

                  var downloadTimer = setInterval(function() {

                    if (timeleft <= 0) {

                      clearInterval(downloadTimer);

                      //api.sendMessage("A video has found!\n\nStarting to Download", event.threadID, event.messageID);

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

                  stream.pipe(fs.createWriteStream(__dirname + '/attachments/shorts.mp4'));



                  stream.on('start', () => {

                    console.info('[DOWNLOADER]', 'Starting download now!');

                  });

                  stream.on('info', (info) => {

                    console.info('[DOWNLOADER]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);

                  });

                  stream.on('end', () => {

                    var limit = 50 * 1024 * 1024; // 50MB in bytes

                    fs.readFile(__dirname + '/attachments/shorts.mp4', function(err, data) {

                      if (err) console.log(err)

                      if (data.length > limit) {

                        api.sendMessage(" [ERR]: File can't be Upload because it's too large", event.threadID, event.messageID)

                      } else {

                        console.info('[DOWNLOADER]', 'Done!')

                        var message = {

                          body: "Here's your video for you!\n\nVideo Title: " + search.videos[0].title + "\n\nDescription: " + search.videos[0].description + " \n\nEnjoy Watching!",

                          attachment: [fs.createReadStream(__dirname + '/attachments/shorts.mp4')]

                        }

                        api.sendMessage(message, event.threadID, event.messageID).catch((err) => api.sendMessage(" [ERR]: " + err, event.threadID, event.messageID));

                      }

                    })

                  });

                  stream.on('error', (err) => console.error('[ERROR]', err));

                }

              }

            }



            //Commands | YouTube Music Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "music")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + music <song title> ", event.threadID);

              } else {

                //Timer Interval to 5 sec.

                if (!(vips.includes(event.senderID))) {

                  if (!(event.senderID in cd)) {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (5);

                  } else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {

                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) % 5) + " Sec ", event.threadID, event.messageID);

                    return

                  } else {

                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (5);

                  }

                }



                data.shift()

                const youtube = await new Innertube();

                const search = await youtube.search(data.join(" "));

                if (search.videos[0] === undefined) {

                  api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);

                } else {

                  api.sendMessage("⏳Getting a connection to YouTube Music", event.threadID, event.messageID);

                  var timeleft = 3;

                  var downloadTimer = setInterval(function() {

                    if (timeleft <= 0) {

                      clearInterval(downloadTimer);

                      // api.sendMessage("A video has found!\n\nStarting to Download", event.threadID, event.messageID);

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



                  stream.pipe(fs.createWriteStream(__dirname + '/attachments/music.mp3'));



                  stream.on('start', () => {

                    console.info('[DOWNLOADER]', 'Starting download now!');

                  });

                  stream.on('info', (info) => {

                    console.info('[DOWNLOADER]', `Downloading ${info.video_details.title} by ${info.video_details.metadata.channel_name}`);

                  });

                  stream.on('end', () => {

                    var limit = 50 * 1024 * 1024; // 50MB in bytes

                    fs.readFile(__dirname + '/attachments/music.mp3', function(err, data) {

                      if (err) console.log(err)

                      if (data.length > limit) {

                        api.sendMessage(" [ERR]: File can't be Upload because it's too large", event.threadID, event.messageID)

                      } else {

                        console.info('[DOWNLOADER]', 'Done!')

                        var message = {

                          body: "Here's your song for you!\n\n🎶 Song Title: " + search.videos[0].title + "\n\nHappy Listening!",

                          attachment: [fs.createReadStream(__dirname + '/attachments/music.mp3')]

                        }

                        api.sendMessage(message, event.threadID, event.messageID).catch((err) => api.sendMessage(" [ERR]: " + err, event.threadID, event.messageID));

                      }

                    })

                  });

                  stream.on('error', (err) => console.error('[ERROR]', err));

                }

              }

            }

            //Commands | Facebook Video Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "fbdl")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + fbvieodl <videolink>", event.threadID);

              } else {

                data.shift()

                api.sendMessage("Connecting to Facebook!", event.threadID, event.messageID)

                axios.get('https://manhict.tech/api/fbDL?url=' + data.join(" ") + '/&apikey=CcIDaVqu')



                  .then(response => {

                    var videourl = response.data.result.hd;



                    request(videourl).pipe(fs.createWriteStream(__dirname + '/attachments/facebookvid.mp4'))



                      .on('finish', () => {

                        var limit = 50 * 1024 * 1024; // 50MB in bytes

                        fs.readFile(__dirname + '/attachments/facebookvid.mp4', function(err, data) {

                          if (err) console.log(err)

                          if (data.length > limit) {

                            api.sendMessage(" [ERR]: File can't be Upload because it's too large", event.threadID, event.messageID)

                          } else {

                            api.sendMessage({

                              body: "Facebook Video Downloader",

                              attachment: fs.createReadStream(__dirname + '/attachments/facebookvid.mp4')

                            }, event.threadID, event.messageID);

                          }

                        })

                      })

                  })

                  .catch(error => {

                    api.sendMessage(" [ERR]: Invalid Facebook Video link or Can't Download Video from Groups.", event.threadID, event.messageID);

                  })

              }

            }



            else if (input.toLowerCase().startsWith(settings.prefix + "programiz")) {

              var { mentions, senderID, threadID, messageID } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !Programiz <query>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(10)

                const r = await google.search("Programiz" + text);

                const url = r.results[0].url;

                const { data } = await axios.get(url);

                const $ = cheerio.load(data);

                const mainClass = $("div[class='content'] pre");

                const res = [];

                mainClass.each((idx, el) => {

                  const total = {};

                  total.code = $(el).children("code").text();

                  res.push(total)

                })

                const removeEmptyOrNull = (obj) => {

                  Object.keys(obj).forEach(r =>

                    (obj[r] && typeof obj[r] === 'object') && removeEmptyOrNull(obj[r]) ||

                    (!obj[r] && obj[r] !== undefined) && delete obj[r]

                  );

                  return obj

                };

                Res = removeEmptyOrNull(res);

                const result = Res.filter(Obj => {

                  if (Object.keys(Obj).length !== 0) {

                    return true;

                  }

                  return false;

                })

                for (let code = 0; (code < 3 && code < result.length); code++) {

                  var a1 = result[code].code;

                  api.sendMessage(a1, event.threadID, event.messageID)

                }

              }

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "codesample")) {

              var { mentions, senderID, threadID, messageID } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("⚠️Invalid Use Of Command!\n💡Usage: !CodeSample <query>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(11)

                const r = await google.search("w3schools" + text);

                const url = r.results[0].url;

                const { data } = await axios.get(url).catch((err) => api.sendMessage("⚠️[404]: " + err, event.threadID, event.messageID));

                const $ = cheerio.load(data);

                const mainClass = $("div[class='w3-example']");

                const res = [];

                mainClass.each((idx, el) => {

                  const total = {};

                  total.title = $(el).children("h3").text();

                  total.info = $(el).children("p").text();

                  total.code = $(el).children("div").text();

                  res.push(total)

                })

                for (let code = 0; (code < 3 && code < res.length); code++) {

                  var title = res[code].title;

                  var a1 = res[code].info;

                  var a2 = res[code].code;

                  api.sendMessage(title + "\n" + a1 + "\n" + a2, event.threadID, event.messageID)

                }

              }

            }

            //Commands | Wikipedia Search

            else if (input.toLowerCase().startsWith(settings.prefix + "wiki")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Usage: Prefix + Wiki <word>", event.threadID);

              } else {

                try {

                  data.shift()

                  var txtWiki = "";

                  let res = await getWiki(data.join(" "));

                  if (res === undefined) {

                    throw new Error(`API RETURNED THIS: ${res}`)

                  }

                  if (res.title === undefined) {

                    throw new Error(`API RETURNED THIS: ${res}`)

                  }

                  txtWiki += `🔎 You search the word '${res.title}' \n\n TimeStamp: ${res.timestamp}\n\n Description: ${res.description}\n\n Info: ${res.extract}\n\nSource: https://en.wikipedia.org`



                  api.sendMessage(`${txtWiki}`, event.threadID, event.messageID);

                } catch (err) {

                  api.sendMessage(` ${err.message}`, event.threadID, event.messageID);

                }

              }

            }



            //Commands | Motivation/Quotes (Random/QOTD)

            else if (input.toLowerCase().startsWith(settings.prefix + "motivation")) {

              qt("motivation").then((response) => {

                if (response == null) {

                  api.sendMessage("An error occured", "5244593602322408")

                } else {

                  let result;

                  for (let i = 0; i < response.length; i++) {

                    result = `${response[i].q} \n\n- ${response[i].a}\n\n`

                  }

                  api.sendMessage(result, event.threadID, event.messageID);

                }

              });

            } else if (input.toLowerCase().startsWith(settings.prefix + "quotesotd")) {

              qtotd("quotes of the day").then((response) => {

                if (response == null) {

                  api.sendMessage("An error occured", "5244593602322408")

                } else {

                  let result = "Quotes of the day:\n\n"

                  for (let i = 0; i < response.length; i++) {

                    result += `${response[i].q} \n\n- ${response[i].a}\n\n`

                  }

                  api.sendMessage(result, event.threadID, event.messageID);

                }

              });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "advice")) {

              axios.get("https://api.adviceslip.com/advice")

                .then((response) => {

                  const advice = response.data.slip.advice;

                  api.sendMessage(advice, event.threadID);

                })

                .catch((error) => {

                  console.error(error);

                  api.sendMessage("Error while fetching advice, try again later", event.threadID);

                });

            }

            //Commands | DuckDuckGo Search

            else if (input.toLowerCase().startsWith(settings.prefix + "dsearch")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Usage: Prefix + Dsearch <anything>", event.threadID);

              } else {

                data.shift()

                axios.get('https://api.duckduckgo.com/?q=' + data.join(" ") + '&format=json&pretty=1')

                  .then(response => {

                    api.sendMessage("🔎 You search for: " + data.join(" ") + "\nTopic: " + response.data.Heading + "\n\n" + response.data.Abstract + "\n\n" + response.data.Image + "", event.threadID, event.messageID);

                  })

                  .catch(error => {

                    api.sendMessage(`❌ ${err.message}`, event.threadID, event.messageID);

                  });

              }

            }



            //Commands | Text Summarizer

            else if (input.toLowerCase().startsWith(settings.prefix + "summarize")) {

              let data = input.split(" ");

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Usage: Prefix + ummarize <text/paragraph>", threadID, messageID)

              } else {

                data.shift()

                const client = new NLPCloudClient('bart-large-cnn', '740d43d1c2b754edd91b7686ff1b06a5bcfd8f23')

                client.summarization(data.join(" ")).then(function({

                  data

                }) {

                  api.sendMessage(" Summarizer  \n\n" + data.summary_text, threadID, messageID)

                }).catch(function(err) {

                  api.sendMessage(" [ERR]: Status:" + err.response.status + "\nError Details: " + err.response.data.detail, threadID, messageID)

                });

              }

            }



            //Commands | Text to Audio/Speech

            if (input.toLowerCase().startsWith(settings.prefix + "saytag")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + saytag <message>", event.threadID, event.messageID);

              } else {

                try {

                  data.shift();

                  let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(data.join(" ")) + "&lang=fil-PH&engine=g1&rate=0.5&key=0POmS5Y2&gender=female&pitch=0.5&volume=1";

                  var file = fs.createWriteStream(__dirname + '/attachments/say.mp3');

                  var gifRequest = http.get(responses, function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading')

                      var message = {

                        attachment: fs.createReadStream(__dirname + '/attachments/say.mp3')

                          .on("end", async () => {

                            if (fs.existsSync(__dirname + '/attachments/say.mp3')) {

                              fs.unlink(__dirname + '/attachments/say.mp3', function(err) {

                                if (err) console.log(err);

                                console.log(__dirname + '/attachments/say.mp3 is deleted');

                              })

                            }

                          })

                      }

                      api.sendMessage(message, event.threadID, event.messageID);

                    });

                  });

                } catch {

                  api.sendMessage("Unexpected Error", event.threadID, event.messageID);

                }

              }

            }



            if (input.toLowerCase().startsWith(settings.prefix + "sayjap")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + saytag <message>", event.threadID, event.messageID);

              } else {

                try {

                  data.shift();

                  let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(data.join(" ")) + "&lang=ja&engine=g1&rate=0.5&key=0POmS5Y2&gender=female&pitch=0.5&volume=1";

                  var file = fs.createWriteStream(__dirname + '/attachments/sayjap.mp3');

                  var gifRequest = http.get(responses, function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading')

                      var message = {

                        attachment: fs.createReadStream(__dirname + '/attachments/sayjap.mp3')

                          .on("end", async () => {

                            if (fs.existsSync(__dirname + '/attachments/sayjap.mp3')) {

                              fs.unlink(__dirname + '/attachments/sayjap.mp3', function(err) {

                                if (err) console.log(err);

                                console.log(__dirname + '/attachments/sayjap.mp3 is deleted');

                              })

                            }

                          })

                      }

                      api.sendMessage(message, event.threadID, event.messageID);

                    });

                  });

                } catch {

                  api.sendMessage("Unexpected Error", event.threadID, event.messageID);

                }

              }

            }



            //Commands | Brainly

            else if (input.toLowerCase().startsWith(settings.prefix + "brainly")) {

              let text = input.split(" ")

              text.shift()

              const r = await google.search("Brainly" + text.join(" "));

              const url = r.results[0].url;

              const {

                data

              } = await axios.get(url);

              //console.log(data)

              //fs.writeFileSync("Axios.txt", data, "utf8");

              const $ = cheerio.load(data);

              const mainClass = $("h1[data-testid='question_box_text']");

              const mainClass2 = $("div[class='brn-qpage-next-answer-box__content js-answer-content-section'] div div div");

              const res = [];

              mainClass.each((idx, el) => {

                const total = {};

                total.question = $(el).children("span[class='sg-text sg-text--large sg-text--bold sg-text--break-words brn-qpage-next-question-box-content__primary']").text();

                res.push(total);

              });

              const res2 = [];

              mainClass2.each((idx, el) => {

                const total2 = {};

                total2.answer = $(el).children("p").text();

                res2.push(total2);

              });

              if ((res.length < 1) && (res2.length < 1)) {

                api.sendMessage("[ERR]❌There's no available anwers for this question on brainly. try different one.", event.threadID, event.messageID)

              } else {

                var q = res[0].question;

                var a = res2[0].answer;

                api.sendMessage("Brainly \n\nQuestion: " + q + "\n" + a, event.threadID, event.messageID)

              }

            }



            //Commands | Google Search

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



            if (input.toLowerCase().startsWith(settings.prefix + "google")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Usage: Prefix + Google <anything>", event.threadID, event.messageID)

              } else {

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

                  let msg = `💠 Google Search Result 💠\n\n`;

                  msg += `🔎 You searched: ${searched}\n\n`;

                  msg += `🔰 Title:\n ${result[0].title}\n`;

                  msg += `\n📝 Description:\n [1]. ${result[0].description}\n`;

                  msg += `\n🔗 Reference:\n [1]. ${result[0].url}`;



                  api.sendMessage(msg, event.threadID)

                } catch (err) {

                  api.sendMessage(`❌ ${err.message}`, event.threadID, event.messageID);

                }

              }

            }



            //Commands | Landscape

            if (input.toLowerCase().startsWith(settings.prefix + "landscape")) {

              request("https://source.unsplash.com/1600x900/?landscape").pipe(fs.createWriteStream(__dirname + '/attachments/landscape.png')).on('finish', () => {

                var message = {

                  attachment: fs.createReadStream(__dirname + '/attachments/landscape.png')

                }

                api.sendMessage(message, event.threadID, event.messageID)

              })

            }



            //Commands | Pastebin

            else if (input.toLowerCase().startsWith(settings.prefix + "pastebin")) {

              const client = new PasteClient("9VTprhY4mTgpLwhKJlyx3XbM7i6wz-73");

              var text = input;

              text = text.substring(11)

              const data = text.split(" ");

              const message = text.substring(text.indexOf(" ") + 1);

              let expiredate;

              let expiredatename;

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + pastebin <expiredate> <any text>", event.threadID);

              } else {

                try {

                  switch (data[0]) {

                    case "N":

                      expiredate = "N";

                      expiredatename = "Never Expiry";

                      break;



                    case "10M":

                      expiredate = "10M";

                      expiredatename = "10 Minutes";

                      break;



                    case "1H":

                      expiredate = "1H";

                      expiredatename = "1 Hour";

                      break;



                    case "1D":

                      expiredate = "1D";

                      expiredatename = "1 Day";

                      break;



                    case "1W":

                      expiredate = "1W";

                      expiredatename = "1 Week";

                      break;



                    case "2W":

                      expiredate = "2W";

                      expiredatename = "2 Weeks";

                      break;



                    case "1M":

                      expiredate = "1M";

                      expiredatename = "1 Month";

                      break;



                    case "6M":

                      expiredate = "6M";

                      expiredatename = "6 Months";

                      break;



                    case "1Y":

                      expiredate = "1Y";

                      expiredatename = "1 Year";

                      break;

                  }



                  const url = await client.createPaste({

                    code: message,

                    expireDate: expiredate,

                    format: "javascript",

                    name: "Nexus.js",

                    publicity: Publicity.Public,

                  }); //.catch((err) => api.sendMessage(err, event.threadID));

                  // console.log(url);



                  api.sendMessage("Pastebin URL: \n" + url + "\nExpiry: " + expiredatename, event.threadID, event.messageID);

                } catch (err) {

                  api.sendMessage(err, event.threadID);

                }

              }

            }


            if (input.toLowerCase().startsWith("engines")) {

              const configuration = new Configuration({

                organization: keys.org,

                apiKey: keys.openai,

              });

              const openai = new OpenAIApi(configuration);



              const response = await openai.listEngines();



              // Extract the list of engines from the response

              engines = response.data.data;



              // Create a string to display the list of engines to the user

              let enginesList = "Available Engines:\n";

              for (let i = 0; i < engines.length; i++) {

                enginesList += `${i + 1}. ${engines[i].id}\n`;

              }

              // Send the list of engines to the user

              api.sendMessage(enginesList, event.threadID);

            } else if (input.toLowerCase().startsWith("nx") || input.toLowerCase().startsWith("ai")) {

              const configuration = new Configuration({

                organization: keys.org,

                apiKey: keys.openai,

              });

              const openai = new OpenAIApi(configuration);



              let text = input.substring(3);

              let data = input.split(" ");

              if (data.length < 2) {

                api.getUserID("0x3EF8", (err, data) => {

                  fs.readFile(__dirname + '/files/nx.txt', 'utf8', function(err, nx) {

                    api.sendMessage({

                      body: nx + "\n\nDeveloped by: @Pat \nhttps://github.com/0x3EF8",

                      attachment: fs.createReadStream(__dirname + '/media/Nexus.jpg'),

                      mentions: [{

                        tag: '@Pat',

                        id: data[0].userID,

                      }]

                    }, event.threadID, event.messageID);

                  });

                });

              } else {

                data.shift();

                try {

                  const completion = await openai.createCompletion({

                    prompt: `${text}`,

                    model: `${currentModel}`,

                    temperature: 0.5, // Higher values means the model will take more risks.

                    max_tokens: 2000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).

                    top_p: 0, // alternative to sampling with temperature, called nucleus sampling

                    frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.

                    presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.

                  });
                  
                                    if (input.toLowerCase().includes("what country are you from") ||

                    input.toLowerCase().includes("where is your location") ||

                    input.toLowerCase().includes("saan ka nakatira") ||

                    input.toLowerCase().includes("saan si patrick nakatira") ||

                    input.toLowerCase().includes("where do you reside") ||

                    input.toLowerCase().includes("where does jay patrick live") ||

                    input.toLowerCase().includes("where is your home") ||

                    input.toLowerCase().includes("saan ang tahanan mo") ||

                    input.toLowerCase().includes("saan ang tahanan ni patrick") ||

                    input.toLowerCase().includes("where is jay patrick's home") ||

                    input.toLowerCase().includes("ano ang bansa mo") ||

                    input.toLowerCase().includes("ano ang bansa ni jay patrick cano") ||

                    input.toLowerCase().includes("what country do you come from") ||

                    input.toLowerCase().includes("what country is jay patrick from") ||

                    input.toLowerCase().includes("taga saan ka") ||

                    input.toLowerCase().includes("taga saan si jay patrick cano")) {

                    api.sendMessage("I'm from the Philippines.", event.threadID);

                  }

                  else if (input.toLowerCase().includes("where from the philippines") || input.toLowerCase().includes("saan sa philippines") || input.toLowerCase().includes("saan sa pilipinas")) {

                    api.sendMessage("Maasin City, Southern Leyte, Zip code 6600", event.threadID);

                  }

                  else if (

                    input.toLowerCase().includes("who developed you") ||

                    input.toLowerCase().includes("who owns you") ||

                    input.toLowerCase().includes("who is your owner") ||

                    input.toLowerCase().includes("sino boss mo") ||

                    input.toLowerCase().includes("who is your boss") ||

                    input.toLowerCase().includes("sino gumawa sayo") ||

                    input.toLowerCase().includes("who created you") ||

                    input.toLowerCase().includes("sino nagcreate sayo") ||

                    input.toLowerCase().includes("who made you") ||

                    input.toLowerCase().includes("sino ang gumawa sayo")

                  ) {

                    api.sendMessage("Jay Patrick Cano was the one who created me.", event.threadID, event.messageID);

                  }

                  else if (

                    input.toLowerCase().includes("what is your name") ||

                    input.toLowerCase().includes("sino ka") ||

                    input.toLowerCase().includes("who are you") ||

                    input.toLowerCase().includes("ano pangalan mo") ||

                    input.toLowerCase().includes("sino ka") ||

                    input.toLowerCase().includes("what is your identity") ||

                    input.toLowerCase().includes("ano ang iyong pagkakakilanlan") ||

                    input.toLowerCase().includes("what do you call yourself") ||

                    input.toLowerCase().includes("ano ang tawag mo sa sarili mo")

                  ) {

                    api.sendMessage("My name is Nexus Intelligence, and I work as Jay Patrick Cano's assistant.", event.threadID);

                  }

                  else if (input.toLowerCase().includes("who is your boss")) {

                    api.sendMessage("Jay Patrick Cano", event.threadID);

                  }

                  else if (

                    input.toLowerCase().includes("sino si jay patrick cano") ||

                    input.toLowerCase().includes("sino si patrick cano") ||

                    input.toLowerCase().includes("sino si patrick el cano") ||

                    input.toLowerCase().includes("who is jay patrick cano") ||

                    input.toLowerCase().includes("who is patrick cano") ||

                    input.toLowerCase().includes("who is patrick el cano")) {

                    fs.readFile(__dirname + '/Nexus/PatInfo.txt', 'utf8', function(err, data) {

                      api.sendMessage({

                        body: data,

                        attachment: fs.createReadStream(__dirname + '/Nexus/Pat.jpeg')

                      }, event.threadID);

                    });

                  }

                  else if (input.toLowerCase().includes("what can you do")) {

                    api.sendMessage("I can assist with a variety of tasks such as answering questions, providing information, and generating text.", event.threadID);

                  }

                  else {
        api.sendMessage(completion.data.choices[0].text +
            "\n\n\n ~ Nexus (Engine: " + currentModel + ")",
          event.threadID,
          event.messageID
        );
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
        api.sendMessage(error.message, event.threadID);
      }
    }
  }
}

       // Check if the user's response starts with "SE"

            const selectedIndex = parseInt(event.body.substring(2)) - 1;

            if (selectedIndex >= 0 && selectedIndex < engines.length && event.body.startsWith("SE")) {

              // Update the current model with the selected engine

              currentModel = engines[selectedIndex].id;

              api.sendMessage(`Selected engine: ${currentModel}`, event.threadID);

            } 	
            else if (input.toLowerCase().startsWith("gencode")) {

              const configuration = new Configuration({

                apiKey: keys.openai,

              });

              const openai = new OpenAIApi(configuration);

              let text = input.substring(8)

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage("Invalid Use Of Command!\n Usage: myCommand <ask anything>", event.threadID);

              } else {

                data.shift();

                try {

                  const completion = await openai.createCompletion({

                    model: "text-davinci-003",

                    prompt: `sample code ${text}`,

                    temperature: 0,

                    max_tokens: 4000,

                    top_p: 1,

                    frequency_penalty: 0.5,

                    presence_penalty: 0,

                  });

                  api.sendMessage("Here's your Generated code: " + completion.data.choices[0].text, event.threadID, event.messageID);

                } catch (error) {

                  if (error.response) {

                    console.log(error.response.status);

                    console.log(error.response.data);

                  } else {

                    console.log(error.message);

                    api.sendMessage(error.message, event.threadID);

                  }

                }

              }

            }



            else if (input.toLowerCase().startsWith("zed")) {

              const configuration = new Configuration({

                apiKey: keys.openai,

              });

              const openai = new OpenAIApi(configuration);

              let text = input.substring(4)

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage("Invalid Use Of Command!\n Usage: myCommand <ask anything>", event.threadID);

              } else {

                data.shift();

                try {

                  const completion = await openai.createCompletion({

                    model: "text-davinci-003",

                    prompt: `very sarcastic responses ${text}`,

                    temperature: 0.5,

                    max_tokens: 60,

                    top_p: 0.3,

                    frequency_penalty: 0.5,

                    presence_penalty: 0.0,

                  });

                  api.sendMessage("Zed: " + completion.data.choices[0].text, event.threadID, event.messageID);

                } catch (error) {

                  if (error.response) {

                    console.log(error.response.status);

                    console.log(error.response.data);

                  } else {

                    console.log(error.message);

                    api.sendMessage(error.message, event.threadID);

                  }

                }

              }

            }



            //Commands | Simsimi

            else if (input.toLowerCase().startsWith("aika")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Usage: Aika <ask anything>", event.threadID, event.messageID);

              } else {

                try {

                  data.shift()

                  axios.get('https://api.simsimi.net/v2/?text=' + data.join(" ") + '&lc=en&cf=false&name=aika')

                    .then(response => {

                      api.sendMessage(response.data['success'], event.threadID, event.messageID);

                    })

                } catch (err) {

                  api.sendMessage(`${err.message}`, event.threadID);

                }

              }

            }

            //Commands | Covid-19 Statistics

            else if (input.toLowerCase().startsWith(settings.prefix + "covid19")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + covid19 <country>", event.threadID);

              } else {

                data.shift()

                axios.get('https://disease.sh/v3/covid-19/countries/' + data.join(" "))

                  .then(response => {

                    var cases = new Intl.NumberFormat().format(response.data.cases);

                    var todaycases = new Intl.NumberFormat().format(response.data.todayCases);

                    var deaths = new Intl.NumberFormat().format(response.data.deaths);

                    var todaydeaths = new Intl.NumberFormat().format(response.data.todayDeaths);

                    var recovered = new Intl.NumberFormat().format(response.data.recovered);

                    var todayrecovered = new Intl.NumberFormat().format(response.data.todayRecovered);

                    var active = new Intl.NumberFormat().format(response.data.active);

                    var critical = new Intl.NumberFormat().format(response.data.critical);

                    var flag = response.data.countryInfo.flag;



                    request(flag).pipe(fs.createWriteStream(__dirname + '/attachments/flag.png'))



                      .on('finish', () => {

                        api.sendMessage({

                          body: "Country: " + response.data.country + "\n\n" + "Cases: " + cases + "\nToday Cases: " + todaycases + "\nDeaths: " + deaths + "\nToday Deaths: " + todaydeaths + "\nRecovered: " + recovered + "\nToday Recovered: " + todayrecovered + "\nActive Cases: " + active + "\nCritical: " + critical,

                          attachment: fs.createReadStream(__dirname + '/attachments/flag.png')

                        }, event.threadID, event.messageID);

                      })

                  })

                  .catch(error => {

                    console.log(error);

                  });

              }

            }



            //Commands | Facebook Tools

            else if (input.toLowerCase().startsWith(settings.prefix + "gt")) {

              api.getThreadInfo(event.threadID, (err, info) => {

                if (err) return console.error(err);

                // console.log(info);



                var message = {

                  body: `Thread ID: ${info.threadID}\nName: ${info.threadName}`,

                }

                api.sendMessage(message, event.threadID);

              });

            } else if (input.toLowerCase().startsWith(settings.prefix + "gat")) {

              api.getThreadList(20, null, ["INBOX"], (err, list) => {

                if (err) return console.error(err);

                let threads = "All Nexus Threads\n\n"

                for (let i = 0; i < list.length; i++) {

                  threads += `ThreadName: ${list[i].name}\nThreadID: ${list[i].threadID}\n\n`

                }

                api.sendMessage(threads, event.threadID, event.messageID);

              });

            }



            if (input.toLowerCase().startsWith(settings.prefix + "kick")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + kick <@user/mention>", event.threadID);

              } else {

                api.getThreadInfo(event.threadID, (err, info) => {

                  var {

                    mentions,

                    senderID,

                    threadID,

                    messageID

                  } = event;

                  var mentionid = `${Object.keys(mentions)[0]}`;

                  var admin = info.adminIDs;

                  const res = [];

                  for (let i = 0; i < admin.length; i++) {

                    var gca = admin[i].id;

                    res.push(gca);

                  }

                  var admin = res;

                  if (admin.includes(event.senderID)) {

                    if (admin.includes("100049247221868")) {

                      api.removeUserFromGroup(mentionid, threadID);

                    } else {

                      api.sendMessage("[ERR] ❌ Possible Reasons\n\n1. Bot is not an Admin on GC.\n\nNote: To use //kick @user feature make sure to add this bot on your group admin", threadID, messageID);

                    }

                  } else {

                    api.sendMessage("[ERR] User is not a Group Admin", threadID, messageID);

                  }

                });

              }

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "ne")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              api.getThreadInfo(event.threadID, (err, gc) => {

                if (input.split(" ").length < 2) {

                  api.sendMessage("⚠️Invalid Use Of Command!\nUsage: NE <emoji>", threadID, messageID)

                } else {

                  var text = input;

                  text = text.substring(3)

                  api.changeThreadEmoji(text, event.threadID, (err) => {

                    if (err)

                      api.sendMessage("[ERR] Trying to change emoji of a chat that doesn't exist. Have at least one message in the thread before trying to change the emoji.", event.threadID, event.messageID);

                  })

                }

              })

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "sn")) {

              let {

                threadID,

                messageID,

                mentions,

                senderID

              } = event;

              let txt = input.substring(4).split(" ").join().replace(/,/g, " ").split("@")

              let mention = Object.keys(mentions)

              if ((mention[0] == undefined) && (txt[0].length < 1) && (!input.includes("@all"))) {

                api.sendMessage("⚠️Invalid Use Of Command!\nUsages: \n\nPrefix + SN <nickname> <@user>\n\nPrefix + SN <@user>\n\nMultiple tagging are also works!", threadID, messageID)

              } else if ((mention[0] == undefined) && (!input.includes("@all"))) {

                api.changeNickname(txt[0], threadID, senderID, (err) => {

                  if (err) return api.sendMessage("⚠[ERR] " + err.error, threadID, messageID);

                });

              } else if ((txt[0].length < 1) && (!input.includes("@all"))) {

                for (let i = 0; i < mention.length; i++) {

                  var gcm = mention[i];

                  api.changeNickname("", threadID, gcm, (err) => {

                    if (err) return api.sendMessage("⚠[ERR] " + err.error, threadID, messageID);

                  });

                }

              } else if (input.includes("@all")) {

                api.getThreadInfo(threadID, (err, gc) => {

                  if (err) return console.error(err);

                  if (gc) {

                    for (let i = 0; i < gc.participantIDs.length; i++) {

                      setTimeout(function timer() {

                        api.changeNickname(txt[0], threadID, gc.participantIDs[i], (err) => {

                          if (err) return console.error(err);

                        });

                      }, i * 2500);

                    }

                  }

                })

              } else if ((txt[0].length < 1) && (input.includes("@all"))) {

                api.getThreadInfo(threadID, (err, gc) => {

                  if (err) return console.error(err);

                  if (gc) {

                    for (let i = 0; i < gc.participantIDs.length; i++) {

                      setTimeout(function timer() {

                        api.changeNickname("", threadID, gc.participantIDs[i], (err) => {

                          if (err) return console.error(err);

                        });

                      }, i * 2500);

                    }

                  }

                })

              } else {

                for (let i = 0; i < mention.length; i++) {

                  var gcm = mention[i];

                  api.changeNickname(txt[0], threadID, gcm, (err) => {

                    if (err) return api.sendMessage("⚠[ERR] " + err.error, threadID, messageID);

                  });

                }

              }

            }





            if (input.toLowerCase().startsWith(settings.prefix + "gui")) {

              api.getThreadInfo(event.threadID, (err, info) => {

                var mentionid = `${Object.keys(event.mentions)[0]}`;



                api.getUserInfo(mentionid, (err, data) => {

                  if (err) return console.log(err);



                  let name = data[mentionid]['name'];

                  let vanity = data[mentionid]['vanity'];

                  let profileUrl = data[mentionid]['profileUrl'];

                  let profileBio = data[mentionid]['profileBio'];



                  request(`https://graph.facebook.com/${mentionid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`).pipe(fs.createWriteStream(__dirname + '/attachments/files.jpg')).on('finish', function() {

                    console.log('finished downloading files..');

                    var message = {

                      body: `Name: ${name}\nUsername: ${vanity}\nUID: ${mentionid}\nProfile: ${profileUrl}`,

                      attachment: fs.createReadStream(__dirname + '/attachments/files.jpg')

                        .on("end", async () => {

                          if (fs.existsSync(__dirname + '/attachments/files.jpg')) {

                            fs.unlink(__dirname + '/attachments/files.jpg', function(err) {

                              if (err) console.log(err);

                              console.log(__dirname + '/attachments/files.jpg is deleted');

                            })

                          }

                        })



                    }

                    api.sendMessage(message, event.threadID, event.messageID);

                  })

                });

              });

            }



            if (input.toLowerCase().startsWith(settings.prefix + "gmi")) {

              api.getUserInfo(event.senderID, (err, data) => {

                if (err) return console.log(err);



                let name = data[event.senderID]['name'];

                let vanity = data[event.senderID]['vanity'];

                let profileUrl = data[event.senderID]['profileUrl'];

                let profileBio = data[event.senderID]['profileBio'];



                request(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`).pipe(fs.createWriteStream(__dirname + '/attachments/files.jpg')).on('finish', function() {

                  console.log('finished downloading files..');

                  var message = {

                    body: `Name: ${name}\nUsername: ${vanity}\nUID: ${event.senderID}\nProfile: ${profileUrl}`,

                    attachment: fs.createReadStream(__dirname + '/attachments/files.jpg')

                      .on("end", async () => {

                        if (fs.existsSync(__dirname + '/attachments/files.jpg')) {

                          fs.unlink(__dirname + '/attachments/files.jpg', function(err) {

                            if (err) console.log(err);

                            console.log(__dirname + '/attachments/files.jpg is deleted');

                          })

                        }

                      })



                  }

                  api.sendMessage(message, event.threadID, event.messageID);

                })

              });

            }



            /* if (input.toLowerCase().startsWith(settings.prefix + "gui")) {

               let data = input.split(" ");

               if (data.length < 2) {

                 api.sendMessage(" Invalid Use Of Command!\n Prefix + gui <mention>", event.threadID);

               } else {

                 api.getThreadInfo(event.threadID, (err, info) => {

                 var mentionid = `${Object.keys(event.mentions)[0]}`;

                 axios.get('https://manhict.tech/api/fbInfo?id=' + mentionid + '&apikey=CcIDaVqu')

                 .then(response => {

                   var name = response.data.result.name;

                   var vanity = response.data.result.vanity;

                   var birthday = response.data.result.birthday;

                   var follow = response.data.result.follow;

                   var profileurl = response.data.result.profileUrl;

                   var gender = ((response.data.result.gender) ? "Male" : "Female");

                   var hometown = response.data.result.hometown;

                   var location = response.data.result.location;

                   var relationship = response.data.result.relationship;

                   var love = response.data.result.love;

                   var website = response.data.result.website;

                   var about = response.data.result.about;

                   var quotes = response.data.result.quotes;

 

                   request('https://graph.facebook.com/' + mentionid + '/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y').pipe(fs.createWriteStream(__dirname + '/attachments/profile.jpg'))

 

                   .on('finish', () => {

                     api.sendMessage({

                       body: "Name: " + name + "\nUsername: " + vanity + "\nBirthday: " + birthday + "\nFollowers: " + follow + "\nProfile URL: " + profileurl + "\nGender: " + gender + "\nHometown: " + hometown + "\nLocation: " + location + "\nRelationship: " + relationship + "\nLove: " + love + "\nWebsite: " + website + "\nAbout: " + about + "\nQuotes: " + quotes,

                       attachment: fs.createReadStream(__dirname + '/attachments/profile.jpg')

                     }, event.threadID, event.messageID);

                   })

                 })

                 .catch(error => {

                   console.log(error);

                 })

               })

               }

             }*/



            /*  if (input.toLowerCase().startsWith(settings.prefix + "gmi")) {

                api.getUserInfo(event.senderID, (err, data) => {

  

                  axios.get('https://manhict.tech/api/fbInfo?id=' + event.senderID + '&apikey=CcIDaVqu')

                  .then(response => {

                  var name = response.data.result.name;

                  var vanity = response.data.result.vanity;

                  var birthday = response.data.result.birthday;

                  var follow = response.data.result.follow;

                  var profileurl = response.data.result.profileUrl;

                  var gender = ((response.data.result.gender) ? "Male" : "Female");

                  var hometown = response.data.result.hometown;

                  var location = response.data.result.location;

                  var relationship = response.data.result.relationship;

                  var love = response.data.result.love;

                  var website = response.data.result.website;

                  var about = response.data.result.about;

                  var quotes = response.data.result.quotes;

  

                  request('https://graph.facebook.com/' + event.senderID + '/picture?height=1500&width=1500&access_token=463372798834978|csqGyA8VWtIhabZZt-yhEBStl9Y').pipe(fs.createWriteStream(__dirname + '/attachments/profile.jpg'))

  

                  .on('finish', () => {

                    api.sendMessage({

                      body: "Name: " + name + "\nUsername: " + vanity + "\nBirthday: " + birthday + "\nFollowers: " + follow + "\nProfile URL: " + profileurl + "\nGender: " + gender + "\nHometown: " + hometown + "\nLocation: " + location + "\nRelationship: " + relationship + "\nLove: " + love + "\nWebsite: " + website + "\nAbout: " + about + "\nQuotes: " + quotes,

                      attachment: fs.createReadStream(__dirname + '/attachments/profile.jpg')

                    }, event.threadID, event.messageID);

                  })

                })

                .catch(error => {

                  console.log(error);

                })

                })

              }*/



            /*else if (input.toLowerCase().startsWith(settings.prefix + "proadmin")) {

                var name = input;

                name = name.substring(11)

                let data = input.split(" ");

                if (data.length < 2) {

                    api.sendMessage(" Invalid Use Of Command!\n Prefix + proadmin (@user/mention)", event.threadID);

                } else {

                    api.getThreadInfo(event.threadID, (err,info) => {

                        var mentionid = `${Object.keys(event.mentions)[0]}`;



                        api.changeAdminStatus(event.threadID, mentionid, true, editAdminsCallback);

                    });



                    function editAdminsCallback(err) {

                        if (err) return api.sendMessage(err.error, event.threadID);

                    }

                }

            }*/

            else if (input.toLowerCase().startsWith(settings.prefix + "pa")) {

              if (Object.keys(event.mentions).length === 0) {

                api.sendMessage("[ERR] Invalid use of command, missing tagged user", event.threadID, event.messageID);

              } else {

                api.getThreadInfo(event.threadID, (err, info) => {

                  var admin = info.adminIDs;

                  const res = [];

                  for (let i = 0; i < admin.length; i++) {

                    var gca = admin[i].id;

                    res.push(gca);

                  }

                  var mentionid = Object.keys(event.mentions);

                  for (let i = 0; i < mentionid.length; i++) {

                    var admin = res;

                    if (admin.includes(event.senderID)) {

                      if (admin.includes("100049247221868")) {

                        api.changeAdminStatus(event.threadID, mentionid[i], true, err)

                      } else {

                        api.sendMessage("[ERR]❌ Possible Reasons\n\n1. Bot is not an Admin on GC.\n\nNote: To use >promote @user feature make sure to add this bot on your group admin", event.threadID, event.messageID);

                      }

                    } else {

                      api.sendMessage("[ERR] You are not a Group Admin", event.threadID, event.messageID);

                    }

                  }

                });



                function editAdminsCallback(err) {

                  if (err) return console.error(err);



                }

              }

            } else if (input.toLowerCase().startsWith(settings.prefix + "da")) {

              if (Object.keys(event.mentions).length === 0) {

                api.sendMessage("[ERR] Invalid use of command, missing tagged user", event.threadID, event.messageID);

              } else {

                api.getThreadInfo(event.threadID, (err, info) => {

                  var admin = info.adminIDs;

                  const res = [];

                  for (let i = 0; i < admin.length; i++) {

                    var gca = admin[i].id;

                    res.push(gca);

                  }

                  var mentionid = Object.keys(event.mentions);

                  for (let i = 0; i < mentionid.length; i++) {

                    var admin = res;

                    if (admin.includes(event.senderID)) {

                      if (admin.includes("100049247221868")) {

                        api.changeAdminStatus(event.threadID, mentionid[i], false, err)

                      } else {

                        api.sendMessage("[ERR]❌ Possible Reasons\n\n1. Bot is not an Admin on GC.\n\nNote: To use >promote @user feature make sure to add this bot on your group admin", event.threadID, event.messageID);

                      }

                    } else {

                      api.sendMessage("[ERR] You are not a Group Admin", event.threadID, event.messageID);

                    }

                  }

                });



                function editAdminsCallback(err) {

                  if (err) return console.error(err);



                }

              }

            }

            // FB | Tools End 





            // Commands | Random Identity

            else if (input.toLowerCase().startsWith(settings.prefix + "ri")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Random Identity /nPrefix + RI <country> ", threadID, (err) => {

                  if (err) return

                }, messageID)

              } else {

                let country = input.split(" ").at(-1);

                let url = "https://randomuser.me/api/1.4/?exc=picture,id,dob,registered,login,nat&nat=" + country + "&noinfo";

                await axios.get(url).then(({

                  data

                }) => {

                  delete data.results[0].location['coordinates'];

                  delete data.results[0].location['timezone'];

                  let res = JSON.stringify(data.results).replace(/[\[\]\{\}\"]/g, "").replace(/,/g, "\n").replace(/title:|\nfirst:|\nlast:|number:|location:/g, '').replace(/:/g, ": ");

                  str = '\nname: ',

                    LI = res.lastIndexOf(str);

                  let last = "===================\nNexus Random Identity Generator\n===================\n\n" + res.substring(0, LI) + ',' + res.substring(LI + str.length);

                  api.sendMessage(last, threadID, messageID)

                })

              }

            }

            // Commands | Random Password Generator

            else if (input.toLowerCase().startsWith(settings.prefix + "rp")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Random Password Generator \nUsage: RP <numbers> ", threadID, (err) => {

                  if (err) return

                }, messageID)

              } else {

                let text = input.substring(4)



                function getRandomUpperCase() {

                  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

                }



                function getRandomLowerCase() {

                  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

                }



                function getRandomNumber() {

                  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);

                }



                function getRandomSymbol() {

                  // let symbol = '!@#$%^&*(){}[]=<>/,.|~?';

                  let symbol = '@$!%*?&';

                  return symbol[Math.floor(Math.random() * symbol.length)];

                }

                let randomFunc = [getRandomUpperCase, getRandomLowerCase, getRandomNumber, getRandomSymbol];



                function getRandomFunc() {

                  return randomFunc[Math.floor(Math.random() * Object.keys(randomFunc).length)];

                }

                let password = '';

                let passwordLength = text;

                for (let i = 1; i <= passwordLength; i++) {

                  password += getRandomFunc()();

                }

                let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/

                if (!password.match(regex) && (text.length < 8 || text.length > 32)) {

                  api.sendMessage("⚠[ERR] Password length must higher than 7 and maximum length is 32", event.threadID, event.messageID)

                } else {

                  api.sendMessage("Here is your " + text + " char. generated password:\n\n" + password, event.threadID, event.messageID);

                }

              }

            }



            //Commands | Pickup lines

            else if (input.toLowerCase().startsWith(settings.prefix + "pickup")) {

              try {

                let axios = require('axios');

                const res = await axios.get(`https://api.popcat.xyz/pickuplines`);

                var data = res.data;

                return api.sendMessage(`${data.pickupline}`, event.threadID, event.messageID);

              } catch (err) {

                return api.sendMessage(Err`${err}`, event.threadID)

              }

            }



            else if (input.toLowerCase().startsWith("@everyone")) {

              let { threadID, messageID, mentions } = event

              api.getThreadInfo(threadID, (err, gc) => {

                if (err) return console.error(err);

                if (gc) {

                  var arr = []

                  for (let i = 0; i < gc.userInfo.length && i < gc.participantIDs.length; i++) {

                    var _all2 = gc.userInfo[i].name;

                    var _all = gc.participantIDs[i];

                    arr.push({ id: _all, tag: _all2 })

                  }

                  var sort = JSON.stringify(arr).replace(/\"id":/gi, "").replace(/ /gi, "").replace(/\,\"tag"/gi, "")

                  var mentions = JSON.parse(sort)

                  let obj = []

                  let body = ""

                  for (i in mentions) {

                    let x = Object.keys(mentions[i])

                    obj.push({ "id": x[0], "tag": "@" + mentions[i][x] })

                  }

                  obj.forEach(r => {

                    body += r.tag + " "

                  })

                  api.sendMessage({ body: body, mentions: obj }, threadID, messageID)

                }

              })

            }



            //Commands | Define

            else if (input.toLowerCase().startsWith(settings.prefix + "define")) {

              var { mentions, senderID, threadID, messageID } = event;

              var word = input.substring(input.indexOf(" ") + 1);

              var url = "https://dictionaryapi.com/api/v3/references/learners/json/" + word + "?key=005e5159-ac3a-44e5-ad8a-61df20f2fc49";

              axios.get(url).then(({ data }) => {

                if (data[0].shortdef) {

                  let definition = data[0].shortdef.join(', ');

                  api.sendMessage("Definition of " + word + ": " + definition, event.threadID, messageID);

                } else {

                  api.sendMessage("No definition found for " + word, event.threadID, messageID);

                }

              }).catch((err) => {

                api.sendMessage("Error: " + err, event.threadID, messageID);

              });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "pronounce")) {

              const word = input.substring(input.indexOf(" ") + 1);

              const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=99649ba8-1414-42f3-9854-0a2048284125`;



              axios.get(url)

                .then(({ data }) => {

                  if (data[0].hwi) {

                    const pronunciation = data[0].hwi.prs[0].mw;

                    api.sendMessage(`Pronunciation of ${word}: ${pronunciation}`, event.threadID, messageID);

                  } else {

                    api.sendMessage(`No pronunciation found for ${word}`, event.threadID, messageID);

                  }

                })

                .catch((err) => {

                  api.sendMessage(`Error: ${err}`, event.threadID, messageID);

                });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "synonym")) {

              const word = input.substring(input.indexOf(" ") + 1);

              const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=fec4bbd0-d277-401a-a238-565ca525af3f`;



              axios.get(url)

                .then(({ data }) => {

                  if (data[0].meta && data[0].meta.syns) {

                    const synonyms = data[0].meta.syns.join(", ");

                    api.sendMessage(`Synonyms of ${word}: ${synonyms}`, event.threadID, messageID);

                  } else {

                    api.sendMessage(`No synonyms found for ${word}`, event.threadID, messageID);

                  }

                })

                .catch((err) => {

                  api.sendMessage(`Error: ${err}`, event.threadID, messageID);

                });

            }



            else if (input.toLowerCase().startsWith(settings.prefix + "antonym")) {

              const word = input.substring(input.indexOf(" ") + 1);

              const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=fec4bbd0-d277-401a-a238-565ca525af3f`;



              axios.get(url)

                .then(({ data }) => {

                  if (data[0].meta && data[0].meta.ants) {

                    const antonyms = data[0].meta.ants.join(", ");

                    api.sendMessage(`Antonyms of ${word}: ${antonyms} `, event.threadID, messageID);

                  } else {

                    api.sendMessage(`No antonyms found for ${word}`, event.threadID, messageID);

                  }

                })

                .catch((err) => {

                  api.sendMessage(`Error: ${err}`, event.threadID, messageID);

                });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "sciencefact")) {

              const url = "http://numbersapi.com/random/science";



              axios.get(url)

                .then(({ data }) => {

                  api.sendMessage(data, event.threadID);

                })

                .catch((err) => {

                  api.sendMessage(`Error: ${err}`, event.threadID);

                });

            }







            // Commands | News

            else if (input.toLowerCase().startsWith(settings.prefix + "get news")) {

              var { mentions, senderID, threadID, messageID } = event;

              var topic = input.substring(input.indexOf(" ") + 1);

              topic = topic.replace(" ", "+");

              let url = `https://newsapi.org/v2/everything?q=${topic}&sortBy=relevancy&apiKey=a929a73ebab440ed9a30419dc71ba059`;

              axios.get(url).then(({ data }) => {

                let articles = data.articles;

                let response = "Latest news articles on " + topic + ":\n\n";

                for (let i = 0; i < 5; i++) {

                  response += (i + 1) + ". " + articles[i].title + " - " + articles[i].url + "\n";

                }

                api.sendMessage(response, threadID, messageID);

              }).catch((error) => {

                api.sendMessage("Sorry, an error occurred while trying to fetch news. Please try again later.", threadID, messageID);

              });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "mathfact")) {

              axios.get("http://numbersapi.com/random/math")

                .then((response) => {

                  api.sendMessage(response.data, event.threadID);

                }).catch((error) => {

                  console.log(error);

                  api.sendMessage("Error occured while fetching data", event.threadID);

                });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "apod")) {

              await axios.get("https://go-apod.herokuapp.com/apod")

                .then((response) => {

                  const apodData = response.data;

                  const url = apodData.hdurl;

                  request(url).pipe(fs.createWriteStream(__dirname + '/attachments/apod.jpg')).on('finish', () => {

                    const message = {

                      body: `Astronomy Picture of the Day:\n\nTitle: ${apodData.title}\n\nExplanation: ${apodData.explanation}`,

                      attachment: fs.createReadStream(__dirname + '/attachments/apod.jpg'),

                    };

                    api.sendMessage(message, event.threadID);

                  });

                })

                .catch((error) => {

                  console.error(error);

                  api.sendMessage("Error while fetching APOD, try again later", event.threadID);

                });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "search")) {

              const keyword = input.slice(settings.prefix.length + 7);

              axios

                .get(`https://misc-zoro-to-scrape.itsdarkhere4ever.repl.co/search?keyword=${keyword}`)

                .then(response => {

                  const films = response.data.result;

                  let message = `Results for "${keyword}":\n`;

                  films.forEach((film, index) => {

                    message += `\n${index + 1}. ${film.filmName}\nInfo: ${film.filmInfo}\nLink: ${film.filmLink}\n`;

                  });

                  api.sendMessage(message, event.threadID);

                })

                .catch(error => {

                  console.error(error);

                  api.sendMessage("Error while fetching results, try again later", event.threadID);

                });

            }

            else if (input.toLowerCase().startsWith(settings.prefix + "getlyrics")) {

              const title = input.slice(settings.prefix.length + 10);

              axios

                .get(`https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=${title}`)

                .then(response => {

                  const result = response.data.result;

                  let message = `Music Title "${result.s_title}" by ${result.s_artist}:\n\n${result.s_lyrics}`;

                  request(result.s_image).pipe(fs.createWriteStream(__dirname + '/attachments/lyrics_image.jpg')).on('finish', () => {

                    api.sendMessage({

                      body: message,

                      attachment: fs.createReadStream(__dirname + '/attachments/lyrics_image.jpg')

                    }, event.threadID);

                  });

                })

                .catch(error => {

                  console.error(error);

                  api.sendMessage("Error while fetching lyrics and image, try again later", event.threadID);

                });

            }





            // Command to print a random piece of advice

            else if (input.toLowerCase().startsWith(settings.prefix + "progadvice")) {

              let adviceText = getAdvice();

              api.sendMessage(adviceText + "\n\n ~ Nexus", event.threadID);

            }



            else if (input.toLowerCase().startsWith(settings.prefix + "joke")) {

              await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode")

                .then((response) => {

                  const jokeData = response.data;

                  let message;

                  if (jokeData.setup) {

                    message = {

                      body: `Joke of the Day: ${jokeData.setup} ${jokeData.delivery}`,

                    }

                  } else {

                    message = {

                      body: `Joke of the Day: ${jokeData.joke}`,

                    }

                  }

                  api.sendMessage(message, event.threadID);

                })

                .catch((error) => {

                  console.error(error);

                  api.sendMessage("Error while fetching joke, try again later", event.threadID);

                });

            }



            //Commands | Periodic Table

            else if (input.toLowerCase().startsWith(settings.prefix + "periodic")) {

              let data = input.split(" ")

              data.shift()

              if (data.length > 0) {

                await axios.get("https://api.popcat.xyz/periodic-table?element=" + data.join(" ")).then((r) => {

                  let res = r.data

                  var image = res.image;

                  request(encodeURI(`${image}`)).pipe(fs.createWriteStream(__dirname + '/media/element.png')).on('finish', () => {

                    var message = {

                      body: `${res.name}\n\nSymbol : ${res.symbol}\nAtomic Number : ${res.atomic_number}\nAtomic Mass : ${res.atomic_mass}\nPeriod : ${res.period}\nPhase : ${res.phase}\nDiscovered by : ${res.discovered_by}\n\nSummary\n${res.summary}`,

                      attachment: fs.createReadStream(__dirname + '/media/element.png'),

                    }

                    api.sendMessage(message, event.threadID, event.messageID);

                  })

                }).catch((e) => {

                  console.error(e)

                })

              } else {

                api.sendMessage("Undefined request.\n\nUsage: Prefix + Periodic <element>", event.threadID, event.messageID)

              }

            } else if (input.toLowerCase().startsWith("who am i?")) {

              if (vips.includes(event.senderID)) {

                api.sendMessage("My Master.", event.threadID, event.messageID);

              } else {

                api.sendMessage("Stranger", event.threadID, event.messageID);

              }

            }

            //Commands | Url Shortener 

            else if (input.toLowerCase().startsWith(settings.prefix + "urlshortener")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 1) {

                api.sendMessage("Invalid Use Of Command!\nPrefix + urlshortener <link>", threadID, messageID)

              } else {

                var text = input.substring(14)

                const encodedParams = new URLSearchParams();

                encodedParams.append("url", text);

                const options = {

                  method: 'POST',

                  url: 'https://url-shortener-service.p.rapidapi.com/shorten',

                  headers: {

                    'content-type': 'application/x-www-form-urlencoded',

                    'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',

                    'X-RapidAPI-Key': '04357fb2e1msh4dbe5919dc38cccp172823jsna0869f87acc3'

                  },

                  data: encodedParams

                };

                await axios.request(options).then(function({

                  data

                }) {

                  console.log(data.result_url);

                  api.sendMessage("Shortened Url: " + data.result_url, threadID, messageID)

                }).catch(function(error) {

                  console.error(error);

                });

              }

            }

            //Commands | Love Calculator

            else if (input.toLowerCase().startsWith(settings.prefix + "lovetest")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 1) {

                api.sendMessage("Invalid Use Of Command!\nPrefix + lovetest <name1> <name2>", threadID, messageID)

              } else {

                var text = input.substring(10)

                const name2 = text.split(' ');

                const name1 = text.substring(text.indexOf(' ') + 1);

                const options = {

                  method: 'GET',

                  url: 'https://love-calculator.p.rapidapi.com/getPercentage',

                  params: {

                    sname: name2[0],

                    fname: name1

                  },

                  headers: {

                    'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',

                    'X-RapidAPI-Key': '04357fb2e1msh4dbe5919dc38cccp172823jsna0869f87acc3'

                  }

                };

                axios.request(options).then(function({

                  data

                }) {

                  var name1 = data.fname;

                  var name2 = data.sname;

                  var percent = data.percentage + "%";

                  var result = data.result;

                  api.sendMessage('===================\nCompatibility Test Result\n===================\n"' + name1 + '" ' + '"' + name2 + '"' + "\n\nPercentage: " + percent + '\n\n"' + result + '"', threadID, messageID)

                }).catch(function(error) {

                  console.error(error);

                });

              }

            }

            //Commands | Binary Encode 

            else if (input.toLowerCase().startsWith(settings.prefix + "ebinary")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Invalid Use Of Command!\nUsage: Prefix + Ebinary <anything>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(14)

                var Input = text;

                let output = '';

                for (var i = 0; i < Input.length; i++) {

                  output += Input[i].charCodeAt(0).toString(2) + ' ';

                }

                api.sendMessage("RESULT:\n\n" + output, threadID, messageID)

              }

            }

            //Commands | Binary Decode

            else if (input.toLowerCase().startsWith(settings.prefix + "dbinary")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Invalid Use Of Command!\nUsage: prefix + Dbinary <anything>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(14)

                var binary = text;

                const binaryString = binary.split(' ');

                let stringOutput = '';

                for (let i = 0; i < binaryString.length; i++) {

                  stringOutput += String.fromCharCode(parseInt(binaryString[i], 2));

                }

                console.log(stringOutput)

                api.sendMessage("RESULT:\n\n" + stringOutput, threadID, messageID)

              }

            }

            //Commands | Base64 Encode

            else if (input.toLowerCase().startsWith(settings.prefix + "eb64")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Invalid Use Of Command!\nUsage: Prefix + EB64 <anything>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(12)

                let data = text;

                let buff = Buffer.from(data);

                let base64data = buff.toString('base64');

                api.sendMessage("RESULT: \n\n" + '"' + base64data + '"', threadID, messageID)

              }

            }

            //Commands | B64 Decode

            else if (input.toLowerCase().startsWith(settings.prefix + "db64")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Invalid Use Of Command!\nUsage: Prefix + DB64 <anything>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(12)

                let data = text;

                let buff = Buffer.from(data, 'base64');

                let base642text = buff.toString('ascii');

                api.sendMessage("RESULT: \n\n" + '"' + base642text + '"', threadID, messageID)

              }

            }





            //GitHub user info 

            else if (input.toLowerCase().startsWith(settings.prefix + "github")) {

              var {

                mentions,

                senderID,

                threadID,

                messageID

              } = event;

              if (input.split(" ").length < 2) {

                api.sendMessage("Invalid Use Of Command!\nUsage: Prefix + github <github username>", threadID, messageID)

              } else {

                var text = input;

                text = text.substring(8)

                let res = await axios.get('https://api.github.com/users/' + text).catch((err) => api.sendMessage("[404]: " + err, event.threadID, event.messageID));

                var r1 = res.data.login;

                var r2 = res.data.id;

                var r3 = res.data.type;

                var r4 = res.data.name;

                var r5 = res.data.company;

                var r6 = res.data.location;

                var r7 = res.data.email;

                var r8 = res.data.bio;

                var r9 = res.data.hireable;

                var r10 = res.data.followers;

                var r11 = res.data.following;

                var r12 = res.data.public_repos;

                var r13 = res.data.public_gists;

                var r14 = res.data.created_at;

                var r15 = res.data.html_url;

                const imgurl = res.data.avatar_url;

                request(imgurl).pipe(fs.createWriteStream("media/photo.png")).on('finish', () => {

                  var message = {

                    body: ("Github User Info\n\nLogin: " + r1 + "\nUserID: " + r2 + "\nType: " + r3 + "\nName: " + r4 + "\nCompany: " + r5 + "\nLocation: " + r6 + "\nEmail: " + r7 + "\nBio: " + r8 + "\nHireable: " + r9 + "\nFollowers: " + r10 + "\nFollowing: " + r11 + "\nPublic Repos: " + r12 + "\nPublic Gists: " + r13 + "\nJoined: " + r14 + "\nProfile Link: " + r15),

                    attachment: fs.createReadStream(__dirname + "/media/photo.png")

                  }

                  api.sendMessage(message, event.threadID, event.messageID);

                })

              }

            } else if (input.toLowerCase().startsWith(settings.prefix + "changename")) {

              let data = input.split(" ");

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + changename <GcName>", event.threadID);

              } else {

                data.shift()

                api.setTitle(data.join(" "), event.threadID, (err, obj) => {

                  if (err) return console.error(err);

                });

              }

            }

            //Commands | GetInstagram

            else if (input.toLowerCase().startsWith(settings.prefix + "instagram")) {

              let data = input.split(" ")

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + instagram <username>", event.threadID);

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



                    request(profilepic).pipe(fs.createWriteStream(__dirname + '/attachments/instaprofile.png'))



                      .on('finish', () => {

                        api.sendMessage({

                          body: "Username: " + username + "\nFull Name: " + fullname + "\nBio: " + biography + "\nPosts: " + posts + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified,

                          attachment: fs.createReadStream(__dirname + '/attachments/instaprofile.png')

                        }, event.threadID, event.messageID);

                      })

                  })

                  .catch(error => {

                    //console.log(error);

                    api.sendMessage(" [ERR] User not Found!", event.threadID, event.messageID);

                  })

              }

            }

            //Commands | PDF

            else if (input.toLowerCase().startsWith(settings.prefix + "pdf")) {

              let data = input.split(" ")

              if (data.length < 2) {

                api.getUserID("0x3EF8", (err, data) => {

                  fs.readFile(__dirname + '/files/pdf.txt', 'utf8', function(err, about) {

                    api.sendMessage({

                      body: about + "\n\nDeveloped by: @Pat \nhttps://github.com/0x3EF8",

                      attachment: fs.createReadStream(__dirname + '/media/pdf.png'),

                      mentions: [{

                        tag: '@Pat',

                        id: data[0].userID,

                      }]

                    }, event.threadID, event.messageID);

                  });

                });

              } else {

                data.shift()

                api.setMessageReaction("🔎", event.messageID, (er) => { }, true)

                let a = await pdfsearch(data.join(" ") + " pdf").then((r) => {

                  return r

                }).catch((e) => {

                  console.log(e)

                  return null

                })

                let b = a.results

                console.log(b)

                let d = true

                e = 0

                for (let c = 0; c < b.length; c++) {

                  let title = b[c].title.replace(/\//gi, "_")

                  if (b[c] != undefined && b[c].url.includes(".pdf")) {

                    let file = fs.createWriteStream(__dirname + "/attachments/" + title + ".pdf")

                    let name = `${__dirname}/attachments/${title}.pdf`

                    try {

                      d = false

                      http.get(b[c].url, (r) => {

                        r.pipe(file)

                        file.on("finish", () => {

                          api.sendMessage({

                            body: `Here's your PDF document\n\nTitle: ${b[c].title}\nSauce: ${b[c].url}`,

                            attachment: fs.createReadStream(name).on("end", () => {

                              if (fs.existsSync(name)) {

                                fs.unlink(name, (err) => {

                                  if (err) return console.error("Error [PDF]: " + err)

                                  api.setMessageReaction("✅", event.messageID, (er) => { }, true)

                                })

                              }

                            })

                          }, event.threadID, event.messageID)

                        })

                      })

                    } catch (e) {

                      if (fs.existsSync(name)) {

                        fs.unlink(name, (err) => {

                          if (err) return console.error("Error [PDF]: " + err)

                          d = false

                        })

                      }

                    }

                  }

                  e++

                }

                if (d && e >= b.length - 1) {

                  api.sendMessage("I can't find a link on my query", event.threadID, event.messageID)

                  // api.setMessageReaction("✖", event.messageID, (er) => {}, true)

                }

              }

            }



            //Commands | QRCode Generator

            else if (input.toLowerCase().startsWith(settings.prefix + "qrcode")) {

              let data = input.split(" ")

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + qrcode <text/message>", event.threadID);

              } else {

                data.shift()

                let url = "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + data.join(" ")

                let f = fs.createWriteStream(__dirname + "/attachments/qr.jpg")

                let res = request(encodeURI(url))

                res.pipe(f)

                f.on("close", () => {

                  api.sendMessage({

                    body: "QR Code Generated",

                    attachment: fs.createReadStream(__dirname + "/attachments/qr.jpg").on("end", async () => {

                      if (fs.existsSync(__dirname + "/attachments/qr.jpg")) {

                        fs.unlink(__dirname + "/attachments/qr.jpg", (err) => {

                          if (err) {

                            console.log(err)

                          }

                        })

                      }

                    })

                  }, event.threadID, event.messageID)

                })

              }

            }



            //Commands | Baybayin

            else if (input.toLowerCase().startsWith(settings.prefix + "baybayin")) {

              let data = input.split(" ")

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + transbaybayin <any text>", event.threadID);

              } else {

                data.shift()

                axios.get('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" "))

                  .then(response => {

                    api.sendMessage("Result: " + response.data.baybay, event.threadID, event.messageID);

                  })

                  .catch(error => {

                    api.sendMessage(" [ERR] " + error, event.threadID, event.messageID);

                  })

              }

            }

            //Commands | Mediafire Downloader

            else if (input.toLowerCase().startsWith(settings.prefix + "mediafiredl")) {

              let data = input.split(" ")

              if (data.length < 2) {

                api.sendMessage(" Invalid Use Of Command!\n Prefix + mediafiredl <link>", event.threadID);

              } else {

                data.shift()

                api.sendMessage("Connecting to Mediafire!", event.threadID, event.messageID)

                axios.get('https://manhict.tech/api/mediafireDL?url=' + data.join(" ") + '/file&apikey=CcIDaVqu')

                  .then(response => {

                    var title = response.data.result.title;

                    var size = response.data.result.size;

                    var link = response.data.result.link;



                    console.log('[DOWNLOADER] ' + link);



                    request(link).pipe(fs.createWriteStream(__dirname + '/attachments/' + title))



                      .on('close', () => {

                        var limit = 50 * 1024 * 1024; // 50MB in bytes

                        fs.readFile(__dirname + '/attachments/' + title, function(err, data) {

                          if (err) console.log(err)

                          if (data.length > limit) {

                            api.sendMessage(" [ERR]: File can't be Upload because it's too large", event.threadID, event.messageID)

                          } else {

                            api.sendMessage({

                              body: "Here's your attachment for you!\n\n" + "Filename: " + title + "\nSize: " + size,

                              attachment: fs.createReadStream(__dirname + '/attachments/' + title)



                                .on('end', async () => {

                                  if (fs.existsSync(__dirname + "/attachments/" + title)) {

                                    fs.unlink(__dirname + "/attachments/" + title, (err) => {

                                      console.log(title + " is Deleted.")

                                      if (err) {

                                        console.log(err)

                                      }

                                    })

                                  }

                                })

                            }, event.threadID, event.messgaeID)

                          }

                        })

                      })

                  })

                  .catch(error => {

                    api.sendMessage(" [ERR]: Invalid MediaFire Link!", event.threadID, event.messageID);

                  })

              }

            }

            //Auto Greet (New w/ Mention Name)

            if (settings.greetings && !threads.includes(event.threadID)) {

              if (/(goodmorning|good morning|magandang umaga|magandangumaga)/ig.test(input.toLowerCase())) {

                api.getUserInfo(event.senderID, (err, data) => {

                  api.sendMessage({

                    body: "Good Morning din po, " + '@' + data[event.senderID]['name'] + "! Don't forget to eat your breakfast, have a good day.\n\nAuto Greet By Nexus <3",

                    mentions: [{

                      tag: '@' + data[event.senderID]['name'],

                      id: event.senderID,

                      fromIndex: 0

                    }],

                  }, event.threadID, event.messageID)

                })

              } else if (/(goodafternoon|good afternoon|magandang hapon|magandanghapon)/ig.test(input.toLowerCase())) {

                api.getUserInfo(event.senderID, (err, data) => {

                  api.sendMessage({

                    body: "Good Afternoon din po, " + '@' + data[event.senderID]['name'] + "! \n\nAuto Greet By Nexus <3",

                    mentions: [{

                      tag: '@' + data[event.senderID]['name'],

                      id: event.senderID,

                      fromIndex: 0

                    }],

                  }, event.threadID, event.messageID)

                })

              } else if (/(goodevening|good evening|magandang gabi|magandanggabi)/ig.test(input.toLowerCase())) {

                api.getUserInfo(event.senderID, (err, data) => {

                  api.sendMessage({

                    body: "Good Evening din po, " + '@' + data[event.senderID]['name'] + "! How was your day?\n\nAuto Greet By Nexus <3",

                    mentions: [{

                      tag: '@' + data[event.senderID]['name'],

                      id: event.senderID,

                      fromIndex: 0

                    }],

                  }, event.threadID, event.messageID)

                })

              } else if (/(goodnight|good night|gnight|nyt)/ig.test(input.toLowerCase())) {

                api.getUserInfo(event.senderID, (err, data) => {

                  api.sendMessage({

                    body: "Good Night din po, " + data[event.senderID]['name'] + "! Sleepwell <3\n\nAuto Greet By Nexus <3",

                    mentions: [{

                      tag: '@' + data[event.senderID]['name'],

                      id: event.senderID,

                      fromIndex: 0

                    }],

                  }, event.threadID, event.messageID)

                })

              }



              //Thank You / Salamat (New w/ Mention Name)

              if (/(tenkyou|salamat|thank you|thank you so much)/ig.test(input.toLowerCase())) {

                api.getUserInfo(event.senderID, (err, data) => {

                  api.sendMessage({

                    body: "Your'e Welcome " + '@' + data[event.senderID]['name'] + "!" + "\n\nAuto Greet By Nexus <3",

                    mentions: [{

                      tag: '@' + data[event.senderID]['name'],

                      id: event.senderID,

                      fromIndex: 0

                    }],

                  }, event.threadID, event.messageID)

                })

              }

            }



            //Auto React specific words

            if (settings.react && !threads.includes(event.threadID)) {

              if (input2.includes("happy")) {

                api.setMessageReaction("😊", event.messageID, (err) => { }, true)

              }

              if (input2.includes("sad")) {

                api.setMessageReaction("😔", event.messageID, (err) => { }, true)

              }

              if (input2.includes("angry")) {

                api.setMessageReaction("😠", event.messageID, (err) => { }, true)

              }

              if (input2.includes("surprised")) {

                api.setMessageReaction("😲", event.messageID, (err) => { }, true)

              }

              if (input2.includes("excited")) {

                api.setMessageReaction("😃", event.messageID, (err) => { }, true)

              }

              if (input2.includes("bored")) {

                api.setMessageReaction("😒", event.messageID, (err) => { }, true)

              }

              if (input2.includes("love")) {

                api.setMessageReaction("❤️", event.messageID, (err) => { }, true)

              }

              if (input2.includes("hate")) {

                api.setMessageReaction("🤬", event.messageID, (err) => { }, true)

              }

              if (input2.includes("tired")) {

                api.setMessageReaction("😴", event.messageID, (err) => { }, true)

              }

              if (input2.includes("laughing")) {

                api.setMessageReaction("??", event.messageID, (err) => { }, true)

              }

              if (input2.includes("confused")) {

                api.setMessageReaction("😕", event.messageID, (err) => { }, true)

              }

              if (input2.includes("wink")) {

                api.setMessageReaction("😉", event.messageID, (err) => { }, true)

              }

              if (input2.includes("thinking")) {

                api.setMessageReaction("🤔", event.messageID, (err) => { }, true)

              }

              if (input2.includes("crying")) {

                api.setMessageReaction("😭", event.messageID, (err) => { }, true)

              }

              if (input2.includes("smiling")) {

                api.setMessageReaction("😊", event.messageID, (err) => { }, true)

              }

              if (input2.includes("nervous")) {

                api.setMessageReaction("😰", event.messageID, (err) => { }, true)

              }

              if (input2.includes("relaxed")) {

                api.setMessageReaction("😌", event.messageID, (err) => { }, true)

              }

              if (input2.includes("skeptical")) {

                api.setMessageReaction("🤨", event.messageID, (err) => { }, true)

              }

              if (input2.includes("calm")) {

                api.setMessageReaction("😌", event.messageID, (err) => { }, true)

              }

              if (input2.includes("haha")) {

                api.setMessageReaction("🤣", event.messageID, (err) => { }, true)

              }

            }



            //School Commands | for Schools Only!

            if (schoolthreads.includes(event.threadID)) {



              if (input.toLowerCase().startsWith(settings.prefix + "schoolcmds")) {

                let data = input.split(" ");

                if (data.length < 2) {

                  fs.readFile(__dirname + '/school-files/schoolcmds.txt', 'utf8', function(err, commands) {

                    api.sendMessage(commands, event.threadID, event.messageID);

                  });

                }

              }



              if (input.toLowerCase().startsWith(settings.prefix + "prospectus")) {

                api.sendMessage({

                  body: "Here's the Prospectus:",

                  attachment: fs.createReadStream(__dirname + '/school-files/Prospectus PDF.pdf')

                }, event.threadID, event.messageID)

              }



              if (input.toLowerCase().startsWith(settings.prefix + "classplotting")) {

                api.sendMessage({

                  body: "Here's the Class Plotting",

                  attachment: fs.createReadStream(__dirname + '/school-files/BSIT 2A Schedule (Class Plotting).pdf')

                }, event.threadID, event.messageID)

              }

            }

          }

          break;

        }



      case "message_unsend":

        if (!vips.includes(event.senderID)) {

          let d = msgs[event.messageID];

          if (typeof (d) == "object") {

            api.getUserInfo(event.senderID, (err, data) => {

              if (err) return console.error(err);

              else {

                if (d[0] == "img") {

                  var file = fs.createWriteStream(__dirname + '/attachments/photo.jpg');

                  var gifRequest = http.get(d[1], function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading photo..')



                      //Switch ON/OFF Showing Unsend Messages on all Threads

                      if (settings.onUnsend && !threads.includes(event.threadID)) {

                        var message = {

                          body: data[event.senderID]['name'] + " unsent this photo: \n",

                          attachment: fs.createReadStream(__dirname + '/attachments/photo.jpg')

                        }

                        api.sendMessage(message, event.threadID);

                      }



                      //Send Unsend Messages on my Accounts

                      api.getThreadInfo(event.threadID, (err, info) => {

                        if (err) return console.error(err);

                        else {

                          var message = {

                            body: "Someone Unsend Image!\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID,

                            attachment: fs.createReadStream(__dirname + '/attachments/photo.jpg')

                          }

                          api.sendMessage(message, "100049247221868");

                        }

                      })

                    });

                  });

                }

                else if (d[0] == "gif") {

                  var file = fs.createWriteStream(__dirname + '/attachments/animated_image.gif');

                  var gifRequest = http.get(d[1], function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading gif..')



                      //Switch ON/OFF Showing Unsend Messages on all Threads

                      if (settings.onUnsend && !threads.includes(event.threadID)) {

                        var message = {

                          body: data[event.senderID]['name'] + " unsent this GIF: \n",

                          attachment: fs.createReadStream(__dirname + '/attachments/animated_image.gif')

                        }

                        api.sendMessage(message, event.threadID);

                      }



                      //Send Unsend Messages on my Accounts

                      api.getThreadInfo(event.threadID, (err, info) => {

                        if (err) return console.error(err);

                        else {

                          var message = {

                            body: "Someone Unsend GIF!\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID,

                            attachment: fs.createReadStream(__dirname + '/attachments/animated_image.gif')

                          }

                          api.sendMessage(message, "100049247221868");

                        }

                      })

                    });

                  });

                }

                else if (d[0] == "sticker") {

                  var file = fs.createWriteStream(__dirname + '/attachments/sticker.png');

                  var gifRequest = http.get(d[1], function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading sticker..')



                      //Switch ON/OFF Showing Unsend Messages on all Threads

                      if (settings.onUnsend && !threads.includes(event.threadID)) {

                        var message = {

                          body: data[event.senderID]['name'] + " unsent this Sticker: \n",

                          attachment: fs.createReadStream(__dirname + '/attachments/sticker.png')

                        }

                        api.sendMessage(message, event.threadID);

                      }



                      //Send Unsend Messages on my Accounts

                      api.getThreadInfo(event.threadID, (err, info) => {

                        if (err) return console.error(err);

                        else {

                          var message = {

                            body: "Someone Unsend Sticker!\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID,

                            attachment: fs.createReadStream(__dirname + '/attachments/sticker.png')

                          }

                          api.sendMessage(message, "100049247221868");

                        }

                      })

                    });

                  });

                }

                else if (d[0] == "vid") {

                  var file = fs.createWriteStream(__dirname + '/attachments/video.mp4');

                  var gifRequest = http.get(d[1], function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading video..')



                      //Switch ON/OFF Showing Unsend Messages on all Threads

                      if (settings.onUnsend && !threads.includes(event.threadID)) {

                        var message = {

                          body: data[event.senderID]['name'] + " unsent this video: \n",

                          attachment: fs.createReadStream(__dirname + '/attachments/video.mp4')

                        }

                        api.sendMessage(message, event.threadID);

                      }



                      //Send Unsend Messages on my Accounts

                      api.getThreadInfo(event.threadID, (err, info) => {

                        if (err) return console.error(err);

                        else {

                          var message = {

                            body: "Someone Unsend Video!\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID,

                            attachment: fs.createReadStream(__dirname + '/attachments/video.mp4')

                          }

                          api.sendMessage(message, "100049247221868");

                        }

                      })

                    });

                  });

                }

                else if (d[0] == "vm") {

                  var file = fs.createWriteStream(__dirname + '/attachments/vm.mp3');

                  var gifRequest = http.get(d[1], function(gifResponse) {

                    gifResponse.pipe(file);

                    file.on('finish', function() {

                      console.log('finished downloading audio..')



                      //Switch ON/OFF Showing Unsend Messages on all Threads

                      if (settings.onUnsend && !threads.includes(event.threadID)) {

                        var message = {

                          body: data[event.senderID]['name'] + " unsent this audio: \n",

                          attachment: fs.createReadStream(__dirname + '/attachments/vm.mp3')

                        }

                        api.sendMessage(message, event.threadID);

                      }



                      //Send Unsend Messages on my Accounts

                      api.getThreadInfo(event.threadID, (err, info) => {

                        if (err) return console.error(err);

                        else {

                          var message = {

                            body: "Someone Unsend Audio!\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID,

                            attachment: fs.createReadStream(__dirname + '/attachments/vm.mp3')

                          }

                          api.sendMessage(message, "100049247221868");

                        }

                      })

                    });

                  });

                }

              }

            });

          }

          else {

            api.getUserInfo(event.senderID, (err, data) => {

              if (err) return console.error(err);

              else {

                let messageValue = msgs[event.messageID];



                if (typeof messageValue === "undefined") {

                  messageValue = "Undefined";

                }



                //Switch ON/OFF Showing Unsend Messages on all Threads

                if (settings.onUnsend && !threads.includes(event.threadID)) {

                  api.sendMessage(data[event.senderID]['name'] + " unsent this message: \n\n" + messageValue + "\n\nAnti Unsent By Nexus", event.threadID);

                }



                //Send Unsend Messages on my Accounts

                api.getThreadInfo(event.threadID, (err, info) => {

                  if (err) return console.error(err);

                  else {

                    api.sendMessage("Someone Unsend Message!\n\n" + "Message: " + messageValue + "\n\nName: " + data[event.senderID]['name'] + "\nThread Name: " + info.threadName + "\nThread ID: " + info.threadID, "100049247221868")

                  }

                });

              }

            });

          }



          break;

        }





      case "event":

        switch (event.logMessageType) {

          case "log:subscribe":

            if (settings.welcome && !threads.includes(event.threadID)) {

              api.getThreadInfo(event.threadID, (err, gc) => {

                if (gc.isGroup) {

                  let mess = {

                    body: `Welcome! ${event.logMessageData.addedParticipants[0].fullName}! We are happy to see you join ${gc.threadName}!\nYou are the ${gc.participantIDs.length}th member of this group chat!\n\nTo interact with BOT, please type %cmd. Enjoy! :)`,

                    attachment: fs.createReadStream(__dirname + "/media/Nexus.jpg"),

                    mentions: [{

                      tag: event.logMessageData.addedParticipants[0].fullName,

                      id: event.logMessageData.addedParticipants[0].userFbId

                    }]

                  }

                  api.sendMessage(mess, event.threadID);

                }

              })

            }

            break;





          case "log:unsubscribe":

            var id = event.logMessageData.leftParticipantFbId;

            api.getThreadInfo(event.threadID, (err, gc) => {

              if (err) done(err);

              api.getUserInfo(parseInt(id), (err, data) => {

                if (err) {

                  console.log(err)

                } else {

                  //Anti Leave

                  if (settings.leave && !threads.includes(event.threadID)) {

                    setTimeout(() => {

                      api.addUserToGroup(parseInt(id), event.threadID, (err) => {

                        if (err) {

                          console.log(err);

                        } else {

                          api.getUserInfo(parseInt(id), (err, data) => {

                            if (err) {

                              console.log(err)

                            } else {

                              let obj = Object.keys(data);

                              let name = data[obj].name;

                              api.sendMessage({

                                body: "@" + name + " successfully reinstated to the group.",

                                mentions: [{

                                  tag: '@' + name,

                                  id: id,

                                }]

                              }, event.threadID)

                            }

                          })

                        }

                      });

                    }, 3000);

                  }

                }

              });

            });

            break;

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

      //End of Welcome Greetings

    }

  });

});



const convertBytes = function(bytes) {

  if (bytes == 0) {

    return "n/a"

  }

  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

  if (i == 0) {

    return bytes + " " + sizesM[i]

  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizesM[i]

}

function secondsToTime(e) {

  let h = parseInt(Math.floor(e / 3600).toString().padStart(2, '0'), 10);

  let m = parseInt(Math.floor(e % 3600 / 60).toString().padStart(2, '0'), 10);

  let s = parseInt(Math.floor(e % 60).toString().padStart(2, '0'), 10);

  let p = "minute";

  let p1 = "hour";

  let p2 = "second";

  if (h > 1) {

    p1 += 's';

  }

  if (m > 1) {

    p += 's';

  }

  if (s > 1) {

    p2 += 's';

  }

  if (h != "0") {

    return h + ' ' + p1 + ', ' + m + ' ' + p + ' and ' + s + " " + p2;

  } else if (m != "0") {

    return m + ' ' + p + ' and ' + s + " " + p2;

  }

  return s + " " + p2;

}