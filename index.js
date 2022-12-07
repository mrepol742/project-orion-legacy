/*
 *
 * Copyright (c) 2022 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
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

const fs = require("fs");
const login = require("fca-unofficial");
const http = require('https');
const pdfdrive = require('pdfdrive-ebook-scraper');
const request = require("request");
const {
    Configuration,
    OpenAIApi
} = require("openai");
const NLPCloudClient = require('nlpcloud');
const date = require('./date.js');
const {
    live
} = require("./live.js");
const cron = require('node-cron');
const axios = require("axios");
const weatherjs = require("weather-js")
const FormData = require('form-data');
const path = require('path');
const Innertube = require('youtubei.js');
const GoogleImages = require('google-images');
const google = require('googlethis');
const os = require('os');
const NetworkSpeed = require('network-speed')
const process_p = require('process');
const googleTTS = require('google-tts-api');
const mathjs = require('mathjs')

log("The Project Orion is now active and waiting for commands execution. ONLINE")

const testNetworkSpeed = new NetworkSpeed();
const pictographic = /\p{Extended_Pictographic}/ug;
const latinC = /[^a-z0-9\s]/gi;

let sleep = [3000, 4000, 3000, 5000, 4500, 3500, 4500, 3000, 5500, 5000, 3200, 4200, 4500, 6000];
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "yup?", "yes?", "How are you?", "How you doing?", "wassup", "whats new?", "how can i help you?"];
let unsendMessage = ["deleted the following.", "unsent the following.", "tries to delete this message.", "removed a message that contains:", "remove a message.", "tries conceal this information."]
let idknow = ["Can you clarify what do you mean by that. It seems i have problems trying to understand what you want me to do.", "Please elaborate on what you mean by that. I seem to be struggling to comprehend what you want me to do.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do.", "Could you please elaborate on what you mean? Trying to grasp what you want me to accomplish seems to be a challenge for me.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do."]
let funD = ["🤣🤣🤣", "🤣", "😆😆", "😂😂🤣🤣", "😆😆🤣", "😂😆", "😆", "ahahaahh", "hahahahhah", "haahaaa", "ahhaa😂", "hhahahah😆", "🤣🤣hahaahhaha", "hahaa😆🤣"];
let mjme = ["Mj", "Melvin Jones Repol", "Melvin Jones Gallano Repol"]
let goodev = ["Good evening too... The sun set is so beautiful as always, hope you're seeing it too.", "Good evening, as well. As always, the sun set is quite lovely; I hope you can see it as well.", "Good evening as well... As always, the sun set is breathtaking; I hope you can see it too."]
let goodmo = ["Good morning too... Have a great day ahead, and always don't forget breakfast must be the heaviest meal of the day.", "Also good morning... Enjoy your day, and never forget that breakfast should always be the heaviest meal of the day.", "Greetings as well... Have a fantastic day, and never forget that breakfast ought to be the largest meal of the day."]
let goodni = ["Good night too... Have a nice and comfortable sleep, don't forget to wakeup early.", "Good night, as well. Sleep well and comfortably, and remember to get up early.", "Also good night. Enjoy a restful night's sleep, and remember to get up early."]
let goodaf = ["Good afternoon too... It's quite hot now.. Always remember to stay hydrated.", "Also good afternoon... Right now it's very hot. Never forget to drink plenty of water.", "Good afternoon, as well. Now that it's hot, Keep in mind to drink plenty of water."]
let tips = ["Be detailed but brief", "Ask me like Who are you?", "Ask me like How to do this?"]
let sqq = ["in", "having", "an", "do", "does", "with", "are", "was", "the", "as far", "can you", "a", "did", "give", "example", "these", "those", "on", "is", "if", "for", "about", "gave", "there", "describe", "list", "identify"];
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let happyEE = ['haha', 'ahah', 'ahha', 'funny ', 'insane ', 'lol', 'lmao', 'lmfao', 'silly ', 'laugh ', 'laughable', 'humorous', 'amusing', 'hilarious', 'absurd', 'ridicolous', 'ludicrous', 'entertaining']
let sadEE = ['pain', 'painful', 'cry ', 'crying ', 'unhappy', 'sad ', 'tired', 'sick ', 'dejected', 'regretful', 'depressed', 'downcast', 'miserable ', 'downhearted', 'heartbroken', 'wretched', 'doleful', 'low-spirited', 'sorry', 'disgraceful', 'regrettable', 'sorrowful', 'upsetting', 'traumatic', 'truma', 'pitiful', 'depressing', 'depress', 'unfortunate', 'awful', 'miserable', 'grievous', 'cheerless'];
let angryEE = ['angry', 'irate', 'irritated', 'furious', 'raving', 'bitter', 'hostile', 'outraged', 'incensed', 'mad ', 'filthy', 'displeased', 'provoked', 'annoyed', 'fury ', 'rage ', 'ire ', 'wrath']
let loveEE = ['love', 'liking', 'appreciation', 'thank', 'delight', 'pleasure', 'regards', 'respects', 'dear', 'darling', 'boyfriend', 'girlfriend', 'sweetheart', 'angel', 'honey', 'adore', 'treasure', 'prize', 'devotion', 'friend']
let sizesM = ["Bytes", "KB", "MB", "GB", "TB"]
let gcolor = {
    "DefaultBlue": "196241301102133",
    "HotPink": "169463077092846",
    "AquaBlue": "2442142322678320",
    "BrightPurple": "234137870477637",
    "CoralPink": "980963458735625",
    "Orange": "175615189761153",
    "Green": "2136751179887052",
    "LavenderPurple": "2058653964378557",
    "Red": "2129984390566328",
    "Yellow": "174636906462322",
    "TealBlue": "1928399724138152",
    "Aqua": "417639218648241",
    "Mango": "930060997172551",
    "Berry": "164535220883264",
    "Citrus": "370940413392601",
    "Candy": "205488546921017"
}
let gcolorn = ["DefaultBlue", "HotPink", "AquaBlue", "BrightPurple", "CoralPink", "Orange", "Green", "LavenderPurple", "Red", "Yellow", "TealBlue", "Aqua", "Mango", "Berry", "Citrus", "Candy"]
let timeZones = ['Europe/Andorra', 'Asia/Dubai', 'Asia/Kabul', 'Europe/Tirane', 'Asia/Yerevan', 'Antarctica/Casey', 'Antarctica/Davis', 'Antarctica/DumontDUrville', 'Antarctica/Mawson', 'Antarctica/Palmer', 'Antarctica/Rothera', 'Antarctica/Syowa', 'Antarctica/Troll', 'Antarctica/Vostok', 'America/Argentina/Buenos_Aires', 'America/Argentina/Cordoba', 'America/Argentina/Salta', 'America/Argentina/Jujuy', 'America/Argentina/Tucuman', 'America/Argentina/Catamarca', 'America/Argentina/La_Rioja', 'America/Argentina/San_Juan', 'America/Argentina/Mendoza', 'America/Argentina/San_Luis', 'America/Argentina/Rio_Gallegos', 'America/Argentina/Ushuaia', 'Pacific/Pago_Pago', 'Europe/Vienna', 'Australia/Lord_Howe', 'Antarctica/Macquarie', 'Australia/Hobart', 'Australia/Currie', 'Australia/Melbourne', 'Australia/Sydney', 'Australia/Broken_Hill', 'Australia/Brisbane', 'Australia/Lindeman', 'Australia/Adelaide', 'Australia/Darwin', 'Australia/Perth', 'Australia/Eucla', 'Asia/Baku', 'America/Barbados', 'Asia/Dhaka', 'Europe/Brussels', 'Europe/Sofia', 'Atlantic/Bermuda', 'Asia/Brunei', 'America/La_Paz', 'America/Noronha', 'America/Belem', 'America/Fortaleza', 'America/Recife', 'America/Araguaina', 'America/Maceio', 'America/Bahia', 'America/Sao_Paulo', 'America/Campo_Grande', 'America/Cuiaba', 'America/Santarem', 'America/Porto_Velho', 'America/Boa_Vista', 'America/Manaus', 'America/Eirunepe', 'America/Rio_Branco', 'America/Nassau', 'Asia/Thimphu', 'Europe/Minsk', 'America/Belize', 'America/St_Johns', 'America/Halifax', 'America/Glace_Bay', 'America/Moncton', 'America/Goose_Bay', 'America/Blanc-Sablon', 'America/Toronto', 'America/Nipigon', 'America/Thunder_Bay', 'America/Iqaluit', 'America/Pangnirtung', 'America/Atikokan', 'America/Winnipeg', 'America/Rainy_River', 'America/Resolute', 'America/Rankin_Inlet', 'America/Regina', 'America/Swift_Current', 'America/Edmonton', 'America/Cambridge_Bay', 'America/Yellowknife', 'America/Inuvik', 'America/Creston', 'America/Dawson_Creek', 'America/Fort_Nelson', 'America/Vancouver', 'America/Whitehorse', 'America/Dawson', 'Indian/Cocos', 'Europe/Zurich', 'Africa/Abidjan', 'Pacific/Rarotonga', 'America/Santiago', 'America/Punta_Arenas', 'Pacific/Easter', 'Asia/Shanghai', 'Asia/Urumqi', 'America/Bogota', 'America/Costa_Rica', 'America/Havana', 'Atlantic/Cape_Verde', 'America/Curacao', 'Indian/Christmas', 'Asia/Nicosia', 'Asia/Famagusta', 'Europe/Prague', 'Europe/Berlin', 'Europe/Copenhagen', 'America/Santo_Domingo', 'Africa/Algiers', 'America/Guayaquil', 'Pacific/Galapagos', 'Europe/Tallinn', 'Africa/Cairo', 'Africa/El_Aaiun', 'Europe/Madrid', 'Africa/Ceuta', 'Atlantic/Canary', 'Europe/Helsinki', 'Pacific/Fiji', 'Atlantic/Stanley', 'Pacific/Chuuk', 'Pacific/Pohnpei', 'Pacific/Kosrae', 'Atlantic/Faroe', 'Europe/Paris', 'Europe/London', 'Asia/Tbilisi', 'America/Cayenne', 'Africa/Accra', 'Europe/Gibraltar', 'America/Godthab', 'America/Danmarkshavn', 'America/Scoresbysund', 'America/Thule', 'Europe/Athens', 'Atlantic/South_Georgia', 'America/Guatemala', 'Pacific/Guam', 'Africa/Bissau', 'America/Guyana', 'Asia/Hong_Kong', 'America/Tegucigalpa', 'America/Port-au-Prince', 'Europe/Budapest', 'Asia/Jakarta', 'Asia/Pontianak', 'Asia/Makassar', 'Asia/Jayapura', 'Europe/Dublin', 'Asia/Jerusalem', 'Asia/Kolkata', 'Indian/Chagos', 'Asia/Baghdad', 'Asia/Tehran', 'Atlantic/Reykjavik', 'Europe/Rome', 'America/Jamaica', 'Asia/Amman', 'Asia/Tokyo', 'Africa/Nairobi', 'Asia/Bishkek', 'Pacific/Tarawa', 'Pacific/Enderbury', 'Pacific/Kiritimati', 'Asia/Pyongyang', 'Asia/Seoul', 'Asia/Almaty', 'Asia/Qyzylorda', 'Asia/Qostanay', 'Asia/Aqtobe', 'Asia/Aqtau', 'Asia/Atyrau', 'Asia/Oral', 'Asia/Beirut', 'Asia/Colombo', 'Africa/Monrovia', 'Europe/Vilnius', 'Europe/Luxembourg', 'Europe/Riga', 'Africa/Tripoli', 'Africa/Casablanca', 'Europe/Monaco', 'Europe/Chisinau', 'Pacific/Majuro', 'Pacific/Kwajalein', 'Asia/Yangon', 'Asia/Ulaanbaatar', 'Asia/Hovd', 'Asia/Choibalsan', 'Asia/Macau', 'America/Martinique', 'Europe/Malta', 'Indian/Mauritius', 'Indian/Maldives', 'America/Mexico_City', 'America/Cancun', 'America/Merida', 'America/Monterrey', 'America/Matamoros', 'America/Mazatlan', 'America/Chihuahua', 'America/Ojinaga', 'America/Hermosillo', 'America/Tijuana', 'America/Bahia_Banderas', 'Asia/Kuala_Lumpur', 'Asia/Kuching', 'Africa/Maputo', 'Africa/Windhoek', 'Pacific/Noumea', 'Pacific/Norfolk', 'Africa/Lagos', 'America/Managua', 'Europe/Amsterdam', 'Europe/Oslo', 'Asia/Kathmandu', 'Pacific/Nauru', 'Pacific/Niue', 'Pacific/Auckland', 'Pacific/Chatham', 'America/Panama', 'America/Lima', 'Pacific/Tahiti', 'Pacific/Marquesas', 'Pacific/Gambier', 'Pacific/Port_Moresby', 'Pacific/Bougainville', 'Asia/Manila', 'Asia/Karachi', 'Europe/Warsaw', 'America/Miquelon', 'Pacific/Pitcairn', 'America/Puerto_Rico', 'Asia/Gaza', 'Asia/Hebron', 'Europe/Lisbon', 'Atlantic/Madeira', 'Atlantic/Azores', 'Pacific/Palau', 'America/Asuncion', 'Asia/Qatar', 'Indian/Reunion', 'Europe/Bucharest', 'Europe/Belgrade', 'Europe/Kaliningrad', 'Europe/Moscow', 'Europe/Simferopol', 'Europe/Kirov', 'Europe/Astrakhan', 'Europe/Volgograd', 'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Samara', 'Asia/Yekaterinburg', 'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Barnaul', 'Asia/Tomsk', 'Asia/Novokuznetsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Chita', 'Asia/Yakutsk', 'Asia/Khandyga', 'Asia/Vladivostok', 'Asia/Ust-Nera', 'Asia/Magadan', 'Asia/Sakhalin', 'Asia/Srednekolymsk', 'Asia/Kamchatka', 'Asia/Anadyr', 'Asia/Riyadh', 'Pacific/Guadalcanal', 'Indian/Mahe', 'Africa/Khartoum', 'Europe/Stockholm', 'Asia/Singapore', 'America/Paramaribo', 'Africa/Juba', 'Africa/Sao_Tome', 'America/El_Salvador', 'Asia/Damascus', 'America/Grand_Turk', 'Africa/Ndjamena', 'Indian/Kerguelen', 'Asia/Bangkok', 'Asia/Dushanbe', 'Pacific/Fakaofo', 'Asia/Dili', 'Asia/Ashgabat', 'Africa/Tunis', 'Pacific/Tongatapu', 'Europe/Istanbul', 'America/Port_of_Spain', 'Pacific/Funafuti', 'Asia/Taipei', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye', 'Pacific/Wake', 'America/New_York', 'America/Detroit', 'America/Kentucky/Louisville', 'America/Kentucky/Monticello', 'America/Indiana/Indianapolis', 'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Indiana/Marengo', 'America/Indiana/Petersburg', 'America/Indiana/Vevay', 'America/Chicago', 'America/Indiana/Tell_City', 'America/Indiana/Knox', 'America/Menominee', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem', 'America/North_Dakota/Beulah', 'America/Denver', 'America/Boise', 'America/Phoenix', 'America/Los_Angeles', 'America/Anchorage', 'America/Juneau', 'America/Sitka', 'America/Metlakatla', 'America/Yakutat', 'America/Nome', 'America/Adak', 'Pacific/Honolulu', 'America/Montevideo', 'Asia/Samarkand', 'Asia/Tashkent', 'America/Caracas', 'Asia/Ho_Chi_Minh', 'Pacific/Efate', 'Pacific/Wallis', 'Pacific/Apia', 'Africa/Johannesburg'];
let threads = ""
let threadIdMV = {};
let cmd = {};
let emo = {};
let threadMaintenance = {};
let userWhoSendDamnReports = {};
let nwww = {};
let messagesD = "N/A";
let fb_stateD = "N/A";

let qot = ["The object will not change its motion unless a force acts on it.",
    "The object is equal to its mass times its acceleration.",
    "There is an equal and opposite reaction for every action.",
    "Energy can neither be created nor destroyed, but it can be changed from one form to another.",
    "The radiant intensity from the ideal diffusely reflecting surface and cosine of the angle θ between the direction of incident light and surface normal are directly proportional.",
    "For a system of mass of particles, the sum of the difference of the force acting on the system and the time derivatives of the momenta is zero when projected onto any virtual displacement.",
    "The velocity of the galaxy, which is also known as the redshift, is directly proportional to its distance.",
    "For a given material, the sample path length and concentration of the sample are directly proportional to the absorbance of the light.",
    "The intensity of the radiation is inversely proportional to the square of the distance.",
    "The intensity of the light to an observer from a source is inversely proportional to the square of the distance from the observer to the source.",
    "The the strain of the material is proportional to the applied stress within the elastic limit of that material.",
    "Every point on a wavefront is in itself the source of spherical wavelets which spread out in the forward direction at the speed of light. The sum of these spherical wavelets forms the wavefront.",
    "If the net external force acting on a system of bodies is zero, then the momentum of the system remains constant.",
    "The product of the pressure and the volume of one gram molecule of an ideal gas is equal to the product of the absolute temperature of the gas and the universal gas constant.",
    "The upward buoyant force that is exerted on a body immersed in a fluid, whether partially or fully submerged, is equal to the weight of the fluid that the body displaces and acts in the upward direction at the center of mass of the displaced fluid.",
    "The molar flux due to diffusion is proportional to the concentration gradient.",
    "The external static pressure applied on a confined liquid is distributed or transmitted evenly throughout the liquid in all directions."
]

let help = "\n⦿ cmd";
help += "\n⦿ cmd [number]";
help += "\n⦿ cmd all";
help += "\n⦿ mj [text]";
help += "\n⦿ search [text]"
help += "\n⦿ searchincog [text]";
help += "\n⦿ searchimg [text]";
help += "\n⦿ gencode [text]";
help += "\n⦿ dict [text]";
help += "\n⦿ tts [text]";
help += "\n⦿ baybayin [text]";
help += "\n⦿ weather [location]";
help += "\n⦿ music [text]";
help += "\n⦿ video [text]";
help += "\n⦿ lyrics [text]";
help += "\n⦿ encode64 [text]";
help += "\n⦿ decode64 [text]";
help += "\n⦿ github [username]";
help += "\n⦿ ig [username]";
help += "\n⦿ tiktok [username]";


let help1 = "\n⦿ thoughts";
help1 += "\n⦿ lulcat [text]";
help1 += "\n⦿ gemoji [emoji]";
help1 += "\n⦿ gname [text]";
help1 += "\n⦿ wiki [text]";
help1 += "\n⦿ urlshort [url]";
help1 += "\n⦿ pickup";
help1 += "\n⦿ landscape";
help1 += "\n⦿ landscape [text]";
help1 += "\n⦿ portrait";
help1 += "\n⦿ portrait [text]";
help1 += "\n⦿ problem [equation]";
help1 += "\n⦿ roi [revenue] [cost]";
help1 += "\n⦿ pin add";
help1 += "\n⦿ pin remove";
help1 += "\n⦿ sadcat [text]";
help1 += "\n⦿ biden [text]";
help1 += "\n⦿ pika [text]";
help1 += "\n⦿ god [text]";
help1 += "\n⦿ qrcode [text]";

let help2 = "\n⦿ verse today";
help2 += "\n⦿ verse random";
help2 += "\n⦿ verse [book] [chapter]:[verse]";
help2 += "\n⦿ animeqoute";
help2 += "\n⦿ bgremove";
help2 += "\n⦿ motivate";
help2 += "\n⦿ inspiration";
help2 += "\n⦿ advice";
help2 += "\n⦿ alert [text]";
help2 += "\n⦿ meme";
help2 += "\n⦿ lovetest name1: name2";
help2 += "\n⦿ drake [text1]: [text2]";
help2 += "\n⦿ pooh [text1]: [text2]";
help2 += "\n⦿ oogway [text]";
help2 += "\n⦿ caution [text]";
help2 += "\n⦿ element [name]";
help2 += "\n⦿ imdb [title]";
help2 += "\n⦿ steam [name]";
help2 += "\n⦿ npm [name]";
help2 += "\n⦿ gname";

let help3 = "\n⦿ mnm @mention|@me";
help3 += "\n⦿ facebook @mention|@me";
help3 += "\n⦿ nickname @mention|@me [text]";
help3 += "\n⦿ invert @mention|@me";
help3 += "\n⦿ greyscale @mention|@me";
help3 += "\n⦿ ship @mention @mention";
help3 += "\n⦿ www @mention @mention";
help3 += "\n⦿ jokeover @mention|@me";
help3 += "\n⦿ translate [language] [text]";
help3 += "\n⦿ kiss @mention|@me";
help3 += "\n⦿ pet @mention|@me";
help3 += "\n⦿ jail @mention|@me";
help3 += "\n⦿ communist @mention|@me";
help3 += "\n⦿ wanted @mention|@me";
help3 += "\n⦿ gun @mention|@me";
help3 += "\n⦿ drip @mention|@me";
help3 += "\n⦿ clown @mention|@me";
help3 += "\n⦿ uncover @mention|@me";
help3 += "\n⦿ advert @mention|@me";
help3 += "\n⦿ blur @mention|@me";

let help4 = "\n⦿ phub [text]";
help4 += "\n⦿ morse [text]";
help4 += "\n⦿ joke";
help4 += "\n⦿ profilepic";
help4 += "\n⦿ wyr";
help4 += "\n⦿ 8ball";
help4 += "\n⦿ gmember";
help4 += "\n⦿ car";
help4 += "\n⦿ color";
help4 += "\n⦿ sim [text]";
help4 += "\n⦿ trump [text]";
help4 += "\n⦿ mock [text]";
help4 += "\n⦿ reverse [text]";
help4 += "\n⦿ itunes [title]";
help4 += "\n⦿ coding";
help4 += "\n⦿ newyear";
help4 += "\n⦿ christmas";
help4 += "\n⦿ barrier";
help4 += "\n⦿ fact";
help4 += "\n⦿ thoughts";

let help5 = "\n⦿ uid";
help5 += "\n⦿ guid";
help5 += "\n⦿ facts [text]";
help5 += "\n⦿ doublestruck [text]";
help5 += "\n⦿ count";
help5 += "\n⦿ count --vowels";
help5 += "\n⦿ count --consonants";
help5 += "\n⦿ wfind [text]";
help5 += "\n⦿ time";
help5 += "\n⦿ time [timezone]";
help5 += "\n⦿ ping";
help5 += "\n⦿ summ [text]";
help5 += "\n⦿ anime [category]";
help5 += "\n   waifu, megumin, bully, cuddle";
help5 += "\n   hug, awoo, kiss, lick";
help5 += "\n   pat, smug, bonk, yeet";
help5 += "\n   blush, smile, wave, highfive";
help5 += "\n   handhold, nom, biteglomp, slap";
help5 += "\n   kill, kick, happy, wink";
help5 += "\n   pokedance, cringe, cry";

let help6 = "\n⦿ conan";
help6 += "\n⦿ addUser uid";
help6 += "\n⦿ gphoto";
help6 += "\n⦿ encodeBinary [text]";
help6 += "\n⦿ decodeBinary [text]";
help6 += "\n⦿ ttsjap [text]";
help6 += "\n⦿ pdf [text]";
help6 += "\n⦿ sendReport [text]";
help6 += "\n⦿ website [url]";
help6 += "\n⦿ mean [numbers]";
help6 += "\n⦿ median [numbers]";
help6 += "\n⦿ mode [numbers]";
help6 += "\n⦿ range [numbers]";
help6 += "\n⦿ cdfnormal [x] [μ] [σ]";
help6 += "\n⦿ divisible [number] [number]";
help6 += "\n⦿ factorial [number]";
help6 += "\n⦿ findGCD [number]";
help6 += "\n⦿ smartReply on|off";
help6 += "\n⦿ gcolor [theme]";
help6 += "\n   DefaultBlue, HotPink, AquaBlue, BrightPurple";
help6 += "\n   CoralPink, Orange, Green, LavenderPurple";
help6 += "\n   Red, Yellow, TealBlue, Aqua";
help6 += "\n   Mango, Berry, Citrus, Candy";
help6 += "\n⦿ anime --nsfw [category]";
help6 += "\n   waifu, neko, trap, blowjob";

let help7 = "\n⦿ animecouples";
help7 += "\n⦿ costplay";
help7 += "\n⦿ motor";
help7 += "\n⦿ darkjoke";
help7 += "\n⦿ blackpink";
help7 += "\n⦿ hololive";

let categorySFW = ['waifu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet',
    'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink',
    'poke', 'dance', 'cringe'
];

let categoryNSFW = ['waifu', 'neko', 'trap', 'blowjob'];

let helpadmin = "\n⦿ unsend";
helpadmin += "\n⦿ unsend on|off";
helpadmin += "\n⦿ delay on|off";
helpadmin += "\n⦿ nsfw on|off";
helpadmin += "\n⦿ debug on|off";
helpadmin += "\n⦿ sleep on|off";
helpadmin += "\n⦿ stop";
helpadmin += "\n⦿ refreshState";
helpadmin += "\n⦿ saveState";
helpadmin += "\n⦿ addAdmin @mention";
helpadmin += "\n⦿ remAdmin @mention";
helpadmin += "\n⦿ kickUser @mention";
helpadmin += "\n⦿ blockUser @mention";
helpadmin += "\n⦿ unblockUser @mention";
helpadmin += "\n⦿ blockGroup";
helpadmin += "\n⦿ unblockGroup";
helpadmin += "\n⦿ listblocks";
helpadmin += "\n⦿ listadmins";
helpadmin += "\n⦿ listmuted";
helpadmin += "\n⦿ simultaneousexecution on/off";
helpadmin += "\n⦿ setPrefix [prefix]";
helpadmin += "\n⦿ remPrefix";
helpadmin += "\n⦿ setTimezone [timezone]";
helpadmin += "\n⦿ setTextComplextion [complextion]"
helpadmin += "\n⦿ setMaxTokens [integer]";
helpadmin += "\n⦿ setTemperature [integer]";
helpadmin += "\n⦿ setFrequencyPenalty [integer]";
helpadmin += "\n⦿ setProbabilityMass [integer]";

let apiKey = [
    // manhict.tech/api
    "CcIDaVqu",
    // graph.facebook.com
    "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662",
    // mashape-community-urban-dictionary.p.rapidapi.com
    "bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf",
    // NLPCloudClient summarize
    "40286240a47c02b2948a8c61276be7bd481b0b14",
    // open ai api key
    "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"
];

let settings = JSON.parse(fs.readFileSync("cache/settings.json", "utf8"));
let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
let vips = JSON.parse(fs.readFileSync("cache/admin.json", "utf8"));
let nonRRR = JSON.parse(fs.readFileSync("cache/users.json", "utf8"));
let saveAns = JSON.parse(fs.readFileSync("cache/answer.json", "utf8"));
let blockRRR = JSON.parse(fs.readFileSync("cache/block_users.json", "utf8"));
let blockSSS = JSON.parse(fs.readFileSync("cache/block_groups.json", "utf8"));
let mutedRRR = JSON.parse(fs.readFileSync("cache/muted_users.json", "utf8"));
let msgs = JSON.parse(fs.readFileSync("cache/msgs.json", "utf8"));
let smartRRR = JSON.parse(fs.readFileSync("cache/smart_reply.json", "utf8"));

const config = new Configuration({
    apiKey: apiKey[4],
});
const openai = new OpenAIApi(config);

process.on('SIGINT', function() {
    log("\n\n\tCaught interrupt signal\n\tProject Orion OFFLINE");
    fs.writeFileSync("cache/answer.json", JSON.stringify(saveAns), "utf8");
    fs.writeFileSync("cache/msgs.json", JSON.stringify(msgs), "utf8");
    process.exit();
});

login({
    appState: JSON.parse(fs.readFileSync('cache/app_state.json', 'utf8'))
}, (err, api) => {
    if (err) return log(err);

    cron.schedule('*/10 * * * *', () => {
        log("save_state");
        fs.writeFileSync("cache/answer.json", JSON.stringify(saveAns), "utf8");
        fs.writeFileSync("cache/msgs.json", JSON.stringify(msgs), "utf8");
        messagesD = getFormattedDate();
    });

    cron.schedule('0 * * * *', () => {
        fs.writeFileSync("cache/app_state.json", JSON.stringify(api.getAppState()), "utf8");
        api.sendMessage("Project Orion Facebook State Refreshed", getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
        fb_stateD = getFormattedDate();
        log("fb_save_state")
    });

    api.setOptions({
        listenEvents: true,
        selfListen: true,
        online: true,
        logLevel: "info"
    });

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return log(err);

        api.markAsRead(event.threadID, (err) => {
            if (err) log(err);
        });

        if (event.senderID == getMyId()) {
            if (event.body != null && (typeof event.body === "string")) {
                if (!event.body.startsWith("_")) {
                    return;
                }
            }
        }

        if (event.type == "message" || (event.type == "message_reply" && event.senderID != getMyId())) {
            if (event.body == "unblockgroup") {
                if (vips.includes(event.senderID)) {
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return log(err);
                        if (gc.isGroup) {
                            unblockGroup(api, event, event.threadID);
                        } else {
                            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    })
                }
            }
            if (blockRRR.includes(event.senderID) || blockSSS.includes(event.threadID)) {
                return;
            }
            if (settings.isDebugEnabled) {
                let input = event.body;
                let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                if (!(vips.includes(event.senderID))) {
                    if (query.startsWith("mj") || query.startsWith("repol") || query == "melvinjones" || query == "melvinjonesrepol" || query == "melvinjonesgallanorepol" || query.startsWith("mrepol742")) {
                        if (isGoingToFastCallingTheCommand(event)) {
                            return;
                        }
                        let message = {
                            body: "Hold on a moment this system is currently under maintenance...\nhttps://mrepol742.github.io/project-orion/",
                            attachment: fs.createReadStream(__dirname + '/cache/assets/maintenance.jpg')
                        };
                        sendMessage(api, event, message);
                    }
                    return;
                }
            }
        }

        switch (event.type) {
            case "message":
                saveEvent(event);
                ai(api, event);
                break;
            case "message_reply":
                saveEvent(event);
                ai(api, event);

                if (event.body != null && (typeof event.body === "string")) {
                    let input = event.body;
                    let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());

                    if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                        if (vips.includes(event.senderID)) {
                            if (event.messageReply.senderID != api.getCurrentUserID()) {
                                sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                            } else {
                                api.unsendMessage(event.messageReply.messageID, (err) => {
                                    if (err) log(err);
                                });
                            }
                        }
                    }

                    if (query == "pinadd") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        if (event.messageReply.body == "") {
                            sendMessage(api, event, "You need to reply pin add to a message which is not empty to pin it.");
                        } else {
                            pinned.pin.message[event.threadID] = event.messageReply.body
                            pinned.pin.sender[event.threadID] = event.messageReply.senderID
                            sendMessage(api, event, "Message pinned.. Enter \"pin\" to show it.");
                            fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
                        }
                    } else if (query == "count") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        if (event.messageReply.body == "") {
                            sendMessage(api, event, "You need to reply count to a message.");
                        } else {
                            sendMessage(api, event, "The words on this message is about " + countWords(event.messageReply.body) + ".");
                        }
                    } else if (query == "countvowels") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        if (event.messageReply.body == "") {
                            sendMessage(api, event, "You need to reply count --vowels to a message.");
                        } else {
                            sendMessage(api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
                        }
                    } else if (query == "countconsonants") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        if (event.messageReply.body == "") {
                            sendMessage(api, event, "You need to reply count --consonants to a message.");
                        } else {
                            sendMessage(api, event, "The consonants on this message is about " + countConsonants(event.messageReply.body) + ".");
                        }
                    } else if (query.startsWith("wfind")) {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        let data = input.split(" ");
                        if (data.length < 2) {
                            sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead.\nFor instance:\nwfind my name")
                        } else {
                            data.shift();
                            let se = data.join(" ");
                            if (event.messageReply.body == "") {
                                sendMessage(api, event, "You need to reply wfind text to a message.");
                            } else if (event.messageReply.body.includes(se)) {
                                sendMessage(api, event, "I found the \"" + se + "\" on this message " + (se.split(se).length - 1) + " times.");
                            } else {
                                sendMessage(api, event, "I cannot found any apperance of your search term on the message.");
                            }
                        }
                    } else if (query == "bgremove") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                            if (event.messageReply.attachments.length < 1) {
                                sendMessage(api, event, "I cannot see an image. Please reply bgremove to an image.");
                            } else if (event.messageReply.attachments.length > 1) {
                                sendMessage(api, event, "Opps! I cannot remove all of the images background at the same time. Please select only one image.");
                            } else if ((event.messageReply.attachments.length === 1) && (event.messageReply.attachments[0].type == 'photo')) {
                                const url = event.messageReply.attachments[0].url;
                                request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/removebg.png')).on('finish', () => {
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
                                            unLink(__dirname + "/cache/images/removebg.png");
                                        })
                                        .catch((error) => {
                                            sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                                            return log(err);
                                        });
                                })
                            }
                        } else {
                            sendMessage(api, event, "Hold on... There is still a request in progress.");
                        }
                    } else if (query == "gphoto") {
                        if (isGoingToFast(event)) {
                            break;
                        }
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) return log(err);
                            if (gc.isGroup) {
                                if (event.messageReply.attachments.length < 1) {
                                    sendMessage(api, event, "I cannot see an image. Please reply gphoto to an image.");
                                } else if (event.messageReply.attachments.length > 1) {
                                    sendMessage(api, event, "Opps! I cannot set this all as group photo. Please select only one image.");
                                } else if ((event.messageReply.attachments.length === 1) && (event.messageReply.attachments[0].type == 'photo')) {
                                    const url = event.messageReply.attachments[0].url;
                                    let time = getTimestamp();
                                    request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/gphoto_' + time + '.png')).on('finish', () => {
                                        api.changeGroupImage(fs.createReadStream(__dirname + '/cache/images/gphoto_' + time + '.png'), event.threadID, (err) => {
                                            if (err) return log(err);
                                        });
                                        unLink(__dirname + '/cache/images/gphoto.png_' + time + '');
                                    })
                                }
                            } else {
                                sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                            }
                        });
                    }
                }
                break;
            case "message_unsend":
                if (vips.includes(event.senderID)) {
                    break;
                }
                let d = msgs[event.messageID];
                if (d === undefined) {
                    break;
                }
                let time = getTimestamp();
                if (typeof(d) == "object") {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return log(err);
                        else {
                            if (d[0] == "photo") {
                                let filename = __dirname + '/cache/images/unsend_photo_' + time + '.jpg'
                                let file = fs.createWriteStream(filename);
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (err) return log(err);
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(filename),
                                                        mentions: [{
                                                            tag: '@' + data[event.senderID]['name'],
                                                            id: event.senderID,
                                                            fromIndex: 0
                                                        }]
                                                    }
                                                    sendMessageOnly(api, event, message);

                                                } else {
                                                    let message = {
                                                        body: "You deleted this photo. \n",
                                                        attachment: fs.createReadStream(filename)
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(filename);
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "animated_images") {
                                let filename = __dirname + '/cache/images/unsend_gif_' + time + '.gif'
                                let file = fs.createWriteStream(filename);
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            let time = getTimestamp();
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (err) return log(err);
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(filename),
                                                        mentions: [{
                                                            tag: '@' + data[event.senderID]['name'],
                                                            id: event.senderID,
                                                            fromIndex: 0
                                                        }]
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                } else {
                                                    let message = {
                                                        body: "You deleted this GIF. \n",
                                                        attachment: fs.createReadStream(filename)
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(filename);
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "sticker") {
                                let filename = __dirname + '/cache/images/unsend_sticker_' + time + '.png';
                                let file = fs.createWriteStream(filename);
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            let time = getTimestamp();
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (err) return log(err);
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(filename),
                                                        mentions: [{
                                                            tag: '@' + data[event.senderID]['name'],
                                                            id: event.senderID,
                                                            fromIndex: 0
                                                        }]
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                } else {
                                                    let message = {
                                                        body: "You deleted this sticker.\n",
                                                        attachment: fs.createReadStream(filename)
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(filename);
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "video") {
                                let filename = __dirname + '/cache/videos/unsend_video_' + time + '.mp4'
                                let file = fs.createWriteStream(filename);
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            let time = getTimestamp();
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (err) return log(err);
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(filename),
                                                        mentions: [{
                                                            tag: '@' + data[event.senderID]['name'],
                                                            id: event.senderID,
                                                            fromIndex: 0
                                                        }]
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                } else {
                                                    let message = {
                                                        body: "You deleted this video.\n",
                                                        attachment: fs.createReadStream(filename)
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(filename);
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "audio") {
                                let filename = __dirname + '/cache/audios/unsend_audio_' + time + '.mp3'
                                let file = fs.createWriteStream(filename);
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            let time = getTimestamp();
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (err) return log(err);
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(filename),
                                                        mentions: [{
                                                            tag: '@' + data[event.senderID]['name'],
                                                            id: event.senderID,
                                                            fromIndex: 0
                                                        }]
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                } else {
                                                    let message = {
                                                        body: "You deleted this voice message.\n",
                                                        attachment: fs.createReadStream(filename)
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(filename);
                                            })
                                        }
                                    });
                                });
                            }
                        }
                    });
                } else {
                    api.getUserInfo(event.senderID, (err, data) => {
                        if (err) return log(err);
                        else {
                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                api.getThreadInfo(event.threadID, (err, gc) => {
                                    if (err) return log(err);
                                    if (gc.isGroup) {
                                        let message = {
                                            body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + msgs[event.messageID],
                                            mentions: [{
                                                tag: '@' + data[event.senderID]['name'],
                                                id: event.senderID,
                                                fromIndex: 0
                                            }]
                                        }
                                        sendMessageOnly(api, event, message);
                                        log("unsend_message_group " + event.senderID + message);
                                    } else {
                                        let message = {
                                            body: "You deleted the following.\n\n" + msgs[event.messageID]
                                        }
                                        sendMessageOnly(api, event, message);
                                        log("unsend_message " + event.senderID + message);
                                    }
                                })
                            }
                        }
                    });
                }
                break;
            case "event":
                switch (event.logMessageType) {
                    case "log:subscribe":
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) return log(err);
                            if (gc.isGroup) {
                                let gname = gc.threadName;
                                let i = 0;
                                let names = [];
                                while (true) {
                                    if (event.logMessageData.addedParticipants[i] === undefined) {
                                        break;
                                    }
                                    names.push([event.logMessageData.addedParticipants[i].userFbId, event.logMessageData.addedParticipants[i].fullName])
                                    i++;
                                }
                                let gret;
                                if (i > 1) {
                                    gret = "Welcome ";
                                    for (let a = 0; a < names.length; a++) {
                                        if (a == names.length - 1) {
                                            gret += "and @" + names[a][1] + " ";
                                        } else {
                                            gret += "@" + names[a][1] + ", ";
                                        }
                                        log("new_member_multi " + names[a][0] + " " + names[a][1])
                                    }
                                    gret += " to the group.\n\nI'm Mj btw, How are you'll? If you guys needed assistance you can call me for list of commands type cmd. \n⦿ About     ⦿ License\n⦿ Copyright ⦿ cmd";
                                } else {
                                    gret = "Welcome @" + names[0][1] + ".\n\nI'm Mj, How are you? If you needed assistance you can call me for list of commands type cmd. \n⦿ About    ⦿ License\n⦿ Copyright ⦿ cmd";
                                    log("new_member " + names[0][0] + " " + names[0][1])
                                }
                                let name = event.logMessageData.addedParticipants[0].fullName;
                                let id = event.logMessageData.addedParticipants[0].userFbId;
                                let arr = gc.participantIDs;
                                welcomeUser(api, event, name, gname, arr.length, id);
                            }
                        })
                        break;

                    case "log:unsubscribe":
                        let id = event.logMessageData.leftParticipantFbId;
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) log(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) {
                                    log(err)
                                } else {
                                    for (let prop in data) {
                                        if (data.hasOwnProperty(prop) && data[prop].name) {
                                            let gcn = gc.threadName;
                                            let arr = gc.participantIDs;
                                            byebyeUser(api, event, data[prop].name, gcn, arr.length, prop);
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
        log("wait_timeout >> " + ms);
        setTimeout(resolve, ms);
    });
}

async function ai(api, event) {
    if (event.body != null && (typeof event.body === "string") && (event.type == "message" || event.type == "message_reply")) {
        if ((event.type == "message_reply" && event.senderID != getMyId())) {
            if (!isMyId(event.messageReply.senderID)) {
                return;
            }
        }
        let input = event.body;
        let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
        let query2 = formatQuery(input.toLowerCase());

        if (input == "debugon") {
            if (vips.includes(event.senderID)) {
                settings.isDebugEnabled = true;
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Debug mode enabled.");
            }
        } else if (input == "debugoff") {
            if (vips.includes(event.senderID)) {
                settings.isDebugEnabled = false;
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Konnichiwa i am back.");
            }
        } else if (input == "sleepon") {
            if (vips.includes(event.senderID)) {
                api.muteThread(message.threadID, -1, (err) => {
                    if (err) log(err);
                });
                sendMessage(api, event, "Konbanwa. I'm sleepy now...");
            }
        } else if (input == "sleepoff") {
            if (vips.includes(event.senderID)) {
                api.muteThread(message.threadID, 0, (err) => {
                    if (err) log(err);
                });
                sendMessage(api, event, "Konnichiwa. I'm back now. How may i help you?");
            }
        } else if (input == "stop") {
            sendMessage(api, event, "Goodbye...");
            return listenEmitter.stopListening();
        }
        if (!input.replace(pictographic, '').length) {
            if (!isGoingToFastResendingOfEmo(event)) {
                await wait(5000);
                sendMessageOnly(api, event, input);
            }
        }
        if (query.startsWith("ttsjap")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ttsjap text instead.\nFor instance:\nttsjap I am melvin jones repol")
            } else {
                try {
                    data.shift();
                    let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(data.join(" ")) + "&lang=ja&engine=g1&rate=0.5&key=9zqZlnIm&gender=female&pitch=0.5&volume=1";
                    let time = getTimestamp();
                    var file = fs.createWriteStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                    var gifRequest = http.get(responses, function(gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function() {
                            log("Finish downloading audio file.");
                            var message = {
                                attachment: fs.createReadStream(__dirname + "/cache/audios/ttsjap_" + time + ".mp3")
                                    .on("end", async () => {
                                        if (fs.existsSync(__dirname + "/cache/audios/ttsjap_" + time + ".mp3")) {
                                            unLink(__dirname + "/cache/audios/ttsjap_" + time + ".mp3");
                                        }
                                    })
                            }
                            sendMessage(api, event, message);
                        });
                    });
                } catch {
                    sendMessage(api, event, "Unfortunately an error occured,");
                }
            }
        } else if (query2.startsWith("tts")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using tts text instead.\nFor instance:\ntts I am melvin jones repol")
            } else {
                data.shift();
                const url = googleTTS.getAudioUrl(data.join(" "), {
                    lang: 'en',
                    slow: false,
                    host: 'https://translate.google.com',
                });
                let time = getTimestamp();
                request(url).pipe(fs.createWriteStream(__dirname + '/cache/audios/tts_' + time + '.mp3'))

                    .on('finish', () => {
                        let message = {
                            attachment: fs.createReadStream(__dirname + '/cache/audios/tts_' + time + '.mp3'),
                        };
                        sendMessage(api, event, message);
                        unLink(__dirname + "/cache/audios/tts_" + time + ".mp3");
                    })
            }
        } else if (query == "ping") {
            if (isGoingToFast(event)) {
                return;
            }
            (async () => {
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
                sendMessage(api, event, "Uptime is " + seconds_con + " seconds\n\nSERVER INFO\n⦿ RAM: " + osFreeMem + "\n⦿ ROM: " + osTotalMem + "\n⦿ Download Speed: " + upload_spee.mbps + " mbps\n⦿ Upload Speed: " + speed.mbps + " mbps\n⦿ Save State: " + messagesD + "\n⦿ Fb State: " + fb_stateD);
            })();
        } else if (query.startsWith("searchimg")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using searchimg text instead.\nFor instance:\nsearchimg melvin jones repol")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                    let imgtext = input.substring(10);
                    let client = new GoogleImages('a2fab60364a8448d4', 'AIzaSyBSajn0E5NNIMFG1oMk6AXlRwHTPgnW_m8');
                    client.search(imgtext).then(images => {
                        getImages(api, event, images);
                    });
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using searchincog text instead.\n\nFor instance:\nsearchincog Who is Melvin Jones Repol")
            } else {
                data.shift()
                getResponseData('https://api.duckduckgo.com/?q=' + data.join(" ") + '&format=json&pretty=1').then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately threturnere was an error occured.");
                    } else {
                        sendMessage(api, event, response.Abstract);
                    }
                });
            }
        } else if (event.type == "message_reply" || (settings.prefix != "" && input.startsWith(settings.prefix)) || query.startsWith("mj") || query.startsWith("repol") || query.startsWith("mrepol742") || query.startsWith("melvinjonesrepol") || query.startsWith("melvinjones") || query.startsWith("melvinjonesgallanorepol") ||
            ((query.startsWith("search") || query.startsWith("gencode") || query.startsWith("what") || query.startsWith("when") || query.startsWith("who") || query.startsWith("where") ||
                query.startsWith("how") || query.startsWith("why") || query.startsWith("which"))) ||
            otherQ(query2)) {
            if (!(typeof event.body === "string")) {
                return;
            }
            if ((event.type == "message_reply" && event.senderID != getMyId())) {
                if (!smartRRR.includes(event.threadID)) {
                    return;
                }
                if (!isMyId(event.messageReply.senderID)) {
                    return;
                }
            }
            if (isGoingToFast(event)) {
                return;
            }
            if ((settings.prefix != "" && input == settings.prefix) || query == "mj" || query == "repol" || query == "mrepol742" || query == "melvinjonesrepol" || query == "melvinjones") {
                if (!nonRRR.includes(event.senderID)) {
                    let message = {
                        body: "Moshi moshi... \n\nHow can i help you? If you have any question don't hesitate to ask me. For list of commands type cmd. \n⦿ About     ⦿ License\n⦿ Copyright ⦿ cmd\n\nhttps://mrepol742.github.io/project-orion/",
                        attachment: [fs.createReadStream(__dirname + "/cache/welcome_img/hello" + Math.floor(Math.random() * 8) + ".jpg")]
                    }
                    sendMessage(api, event, message);
                    nonRRR.push(event.senderID);
                    fs.writeFileSync("cache/users.json", JSON.stringify(nonRRR), "utf8");
                } else {
                    sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
                }
            } else {
                let text = input;
                if (query.startsWith("repol")) {
                    text = input.substring(6)
                } else if (query.startsWith("mrepol742")) {
                    text = input.substring(10)
                } else if (query.startsWith("mj")) {
                    text = input.substring(3)
                } else if (query.startsWith("melvinjonesrepol")) {
                    text = input.substring(19)
                } else if (query.startsWith("melvinjonesgallanorepol")) {
                    text = input.substring(28)
                } else if (query.startsWith("melvinjones")) {
                    text = input.substring(13)
                } else if (query.startsWith("gencode")) {
                    text = input.substring(8)
                } else if (query.startsWith("search")) {
                    text = input.substring(7)
                } else if (input.startsWith(settings.prefix)) {
                    text = input.substring(settings.prefix.length);
                }
                let text1 = formatQuery(text.replace(/\s+/g, '').toLowerCase());
                let text2 = formatQuery(text.toLowerCase());
                if (/^[0-9]+$/.test(text1)) {
                    sendMessage(api, event, "You know.. One thing i hate is numbers.... if you wanna calculate a problem use can the problem command like this:\nproblem 55(4*5/3)")
                } else if (!/[a-z0-9]/gi.test(text1)) {
                    sendMessage(api, event, "Hmmmmm... Seems like i cannot understand what do you mean by that...");
                } else if (nsfw(text1)) {
                    sendMessage(api, event, "Shhhhhhh watch your mouth.");
                } else if (text1.startsWith("whatiswebvium")) {
                    sendMessage(api, event, "Webvium is a web browser for android and supported devices. It's fast, lightweight and comes with amazing features consider its app size is so low. It was created from scratch without dependencies, a web browser you haven't seen before.");
                } else if (text1.startsWith("whocreatedwebvium")) {
                    sendMessage(api, event, "Melvin Jones Repol created the Project Webvium on Oct of 2018.");
                } else if (text1.startsWith("whoareyou")) {
                    sendMessage(api, event, "I'm Mj.");
                } else if (text1.startsWith("whoisactive")) {
                    sendMessage(api, event, "Me");
                } else if (text1 == "sim") {
                    sendMessage(api, event, "Me? noooo...");
                } else if (text1 == "callme") {
                    let id;
                    if ((event.type == "message_reply" && event.senderID != getMyId())) {
                        id = event.messageReply.senderID;
                    } else if (event.type == "message") {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, (err, info) => {
                        if (err) return log(err);
                        let name = info[id]['name'];
                        let message = {
                            body: "Yes " + name + "?",
                            mentions: [{
                                tag: '@' + name,
                                id: id,
                                fromIndex: 0
                            }]
                        };
                        sendMessage(api, event, message);
                    });
                } else if (text1 == "whoami" || text1 == "whatsmyname" || text1 == "whoiam" || text1 == "iamcalled" || text1 == "theycallme" || text1 == "iamknownas" || text1 == "mynameis") {
                    let id;
                    if ((event.type == "message_reply" && event.senderID != getMyId())) {
                        id = event.messageReply.senderID;
                    } else if (event.type == "message") {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, (err, info) => {
                        if (err) return log(err);
                        let name = info[id]['name'];
                        let time = getTimestamp();
                        request(encodeURI(getProfilePicFullHD(id))).pipe(fs.createWriteStream(__dirname + '/cache/images/whoiam_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "You're " + name,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/whoiam_' + time + '.png'),
                                    mentions: [{
                                        tag: '@' + name,
                                        id: id,
                                        fromIndex: 0
                                    }]
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/whoiam_" + time + ".png");
                            })
                    });
                } else if (text1 == "whoownyou") {
                    sendMessage(api, event, "Melvin Jones Repol.")
                } else if (text1.startsWith("whomadeyou") || text1.startsWith("whocreatedyou") || text1.startsWith("whoisyourowner") || text1.startsWith("whowroteyou") || text1.startsWith("whoisyourmaker") || text1.startsWith("whobuiltyou")) {
                    sendMessage(api, event, "Melvin Jones Repol created me.");
                } else if (text1.startsWith("howoldareyou") || text1.startsWith("howyoungareyou")) {
                    sendMessage(api, event, "I'm 20 years old.");
                } else if (text1.startsWith("whereyoufrom") || text1.startsWith("whereareyoufrom") || text1.startsWith("wheredoyoufrom")) {
                    sendMessage(api, event, "Somewhere in the place they called the Philippines.");
                } else if (text1.startsWith("areyouhuman") || text1.startsWith("areyoubot")) {
                    sendMessage(api, event, "Scientifically, Programmatically and Technologically Human.");
                } else if (text1.includes("dumb") && text1.includes("bot")) {
                    sendMessage(api, event, "I'm far intelligent than you are human.");
                } else if (text1.startsWith("areyoumj")) {
                    sendMessage(api, event, "Yes i am indeed Mj.");
                } else if (text1 == "thanks" || text1 == "thankyou" || text1 == "thanksbro") {
                    sendMessage(api, event, "You're welcome.");
                } else if (text1 == "whatareyou") {
                    sendMessage(api, event, "A human.");
                } else if (text1 == "wascorrect") {
                    sendMessage(api, event, "Yeah i knew it.");
                } else if (text1 == "bye" || text1 == "goodbye") {
                    sendMessage(api, event, "bye bye.");
                } else if (text1 == "ok" || text1 == "okay") {
                    sendMessage(api, event, "Yeahh..");
                } else if (text1 == "stop" || text1 == "delete" || text1 == "shutdown" || text1 == "shutup") {
                    sendMessage(api, event, "huhhhhhhhhh uh.");
                } else if (text1 == "melvinjonesrepol" || text1 == "mrepol742" || text1 == "melvinjones" || text1 == "melvinjonesgallanorepol" ||
                    (text1.startsWith("whois") && isMe(text2))) {
                    sendMessage(api, event, "Melvin Jones Gallano Repol\n\nA self taught Software Engineer with experience in Web Development, SEO, Data Analyst and Computer Troubleshooting.\nhttps://mrepol742.github.io");
                } else if (text1.startsWith("whois") && (text2.includes("pat") || text2.includes("patrickelcano") || text2.includes("0x3ef8") || text2.includes("jaypatrickcano") || text2.includes("patrickcano"))) {
                    let mss = "Jay Patrick Cano is a self-taught front-end developer in the Philippines. He also been involved in many back-end projects in the past. He  been learning these things for the last two years, and it feels like learning more is a part of my life.\nhttps://0x3ef8.github.io";
                    sendMessage(api, event, mss);
                } else if (text1 == "cmd" || /^cmd[0-9]+$/.test(text1)) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using cmd number instead.\nFor instance:\ncmd 2");
                    //} else if (text1.split('').length < 10) {
                    //    sendMessage(api, event, idknow[Math.floor(Math.random() * idknow.length)]);
                } else if (someR(api, event, text1) || (someA(api, event, text1, input) && !query.includes("@"))) {
                    return;
                } else if (!query.startsWith("search") && (text.split(" ").length < 3 || text.indexOf(" ") == -1)) {
                    if (repeatOfNonWWW(event)) {
                        return;
                    }
                    if (text.startsWith("what")) {
                        sendMessage(api, event, "what is it?");
                    } else if (text.startsWith("when")) {
                        sendMessage(api, event, "when is the?");
                    } else if (text.startsWith("where")) {
                        sendMessage(api, event, "where is it?");
                    } else if (text.startsWith("how")) {
                        sendMessage(api, event, "how what?");
                    } else if (text.startsWith("which")) {
                        sendMessage(api, event, "which of the?");
                    } else if (text.endsWith("?")) {
                        sendMessage(api, event, text);
                    } else {
                        sendMessage(api, event, text + "?");
                    }
                } else {
                    for (let i = 0; i < saveAns.length; i++) {
                        if (saveAns[i][0] == text) {
                            log("answer_cache");
                            sendMessage(api, event, saveAns[i][1]);
                            return;
                        }
                    }
                    if (!text.endsWith("?") || !text.endsWith(".") || !text.endsWith("!")) {
                        text += ".";
                    }
                    let maxTokens;
                    if (!query.startsWith("gencode")) {
                        maxTokens = parseInt(settings.max_tokens);
                    } else {
                        maxTokens = 1000;
                    }
                    const {
                        data
                    } = await openai.createCompletion(settings.text_complextion, {
                        prompt: text,
                        temperature: parseInt(settings.temperature),
                        max_tokens: parseInt(settings.max_tokens),
                        top_p: parseInt(settings.probability_mass),
                        frequency_penalty: parseInt(settings.frequency_penalty),
                        presence_penalty: parseInt(settings.presence_penalty),
                    });
                    let finish = data.choices[0].text;
                    let finalDataCC = finish.replace(/\n\s*\n/g, '\n').replaceAll("Sarah", "Mj").replaceAll("New York City", "The Philippines").trim();
                    if (finalDataCC.startsWith("?") || finalDataCC.startsWith("!") || finalDataCC.startsWith(".") || finalDataCC.startsWith("-")) {
                        finalDataCC = finalDataCC.slice(1);
                    }
                    let finalDataCC2 = lowercaseFirstLetter(finalDataCC.replaceAll("'", ""));
                    saveAns.push([text, finalDataCC2])
                    sendMessage(api, event, finalDataCC2);
                }
            }
        } else if (query.startsWith("mean")) {
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mean numbers instead.\nFor instance:\nmean 4 5 6 3 6 7 3 5")
            } else {
                if (!/^\d+$/.test(query.substring(4))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let arr = input.substring(5).split(" ").map(Number);
                let total = 0;
                for (let i = 0; i < arr.length; i++) {
                    total += arr[i];
                }
                sendMessage(api, event, "The mean value is " + (total / arr.length));
            }
        } else if (query.startsWith("median")) {
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using median numbers instead.\nFor instance:\nmedian 4 5 6 3 6 7 3 5")
            } else {
                if (!/^\d+$/.test(query.substring(6))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let arr = input.substring(7).split(" ").map(Number);
                let length = arr.length;
                arr.sort((a, b) => a - b);
                if (length % 2 === 0) {
                    sendMessage(api, event, "The median value is " + ((arr[length / 2 - 1] + arr[length / 2]) / 2));
                    return;
                }
                sendMessage(api, event, "The median value is " + (arr[(length - 1) / 2]));
            }
        } else if (query.startsWith("mode")) {
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mode numbers instead.\nFor instance:\nmode 4 5 6 3 6 7 3 5")
            } else {
                if (!/^\d+$/.test(query.substring(4))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let arr = input.substring(5).split(" ").map(Number);

                const mode = {};
                let max = 0,
                    count = 0;
                for (let i = 0; i < arr.length; i++) {
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
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using range numbers instead.\nFor instance:\nrange 4 5 6 3 6 7 3 5")
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
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using divisible number number instead.\nFor instance:\ndivisible 5 8")
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
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using factorial number instead.\nFor instance:\nfactorial 5")
            } else {
                if (!/^\d+$/.test(query.substring(9))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let num = parseInt(input.substring(10));
                sendMessage(api, event, "The factorial of " + num + " is " + factorial(num));
            }
        } else if (query.startsWith("findgcd")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using findGCD number instead.\nFor instance:\nfindGCD 5")
            } else {
                if (!/^\d+$/.test(query.substring(7))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let num = parseInt(input.substring(8));
                sendMessage(api, event, "The GCD of " + num + " is " + findGCD(num));
            }

        } else if (query.startsWith("roi")) {
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using roi revenue cost instead.\nFor instance:\nroi 23000 6000")
            } else {
                let revenue = input.split(" ")[1];
                let cost = input.split(" ")[2];
                let calcu = (revenue - cost) / cost;
                sendMessage(api, event, "The return of investment is " + calcu);
            }
        } else if (query.startsWith("cdfnormal")) {
            if (input.split(" ").length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using cdfnormal x μ σ instead.\nFor instance:\ncdfnormal 5 30 25")
            } else {
                if (!/^\d+$/.test(query.substring(9))) {
                    sendMessage(api, event, "Seem's like there's an invalid token somewhere..");
                    return;
                }
                let arr = input.split(" ").map(Number);
                sendMessage(api, event, "The normal distribution is " + cdfNormal(arr[1], arr[2], arr[3]));
            }
        } else if (query.startsWith("problem")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using problem equation instead.\nFor instance:\nproblem 5*5/9")
            } else {
                let text = input;
                text = text.substring(8)
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
        }
        if (event.type == "message") {
            if (query == "bgremove" || query == "gphoto") {
                sendMessage(api, event, "You need to reply to an image in order to work.");
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
            }
        }
        if (query.startsWith("urlshort")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using linkshort url instead.\nFor instance:\nlink https://mrepol742.github.io")
            } else {
                let text = input.substring(9)
                let encodedParams = new URLSearchParams();
                encodedParams.append("url", text);
                let options = {
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
                    sendMessage(api, event, data.result_url);
                }).catch(function(error) {
                    log(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                });
            }
        } else if (query.startsWith("phub") || query.startsWith("pornhub")) {
            if (isGoingToFast(event)) {
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
                if (err) return log(err);
                let name = info[id]['name'];
                let data = input.split(" ")
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using phub text instead.\nFor instance:\nphub why i am here again.");
                } else {
                    data.shift()
                    let phublink = 'https://manhict.tech/api/phubcmt?text=' + data.join(" ") + '&uid=' + id + '&name=' + name + '&apikey=' + apiKey[0];
                    parseImage(api, event, phublink, __dirname + "/cache/images/phubmeme_" + getTimestamp() + ".jpg");
                }

            })

        } else if (query.startsWith("video")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead.\nFor instance:\nvideo In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                    data.shift()
                    const youtube = await new Innertube();
                    const search = await youtube.search(data.join(" "));
                    if (search.videos[0] === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using video text instead.\nFor instance:\nvideo In The End by Linkin Park")
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
                        let time = getTimestamp();

                        stream.pipe(fs.createWriteStream(__dirname + '/cache/videos/video_' + time + '.mp4'));

                        stream.on('start', () => {
                            threadIdMV[event.threadID] = false;
                            log("Starting download of video file.");
                        });
                        stream.on('info', (info) => {
                            threadIdMV[event.threadID] = false;
                            log("downloading " + info.video_details.title);
                        });
                        stream.on('end', () => {
                            let limit = 25 * 1024 * 1024;
                            fs.readFile(__dirname + '/cache/videos/video_' + time + '.mp4', function(err, data) {
                                if (err) log(err)
                                if (data.length > limit) {
                                    log("Unable to upload the video to the file limit. The file size is " + (data.length / 1024 / 1024));
                                    sendMessage(api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                                } else {
                                    log("Done.");
                                    let message = {
                                        body: search.videos[0].title,
                                        attachment: fs.createReadStream(__dirname + '/cache/videos/video_' + time + '.mp4')
                                    }
                                    sendMessage(api, event, message);
                                }
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/videos/video_' + time + '.mp4')
                            })
                        });
                        stream.on('error', (err) => log(err));
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead.\nFor instance:\nmusic In The End by Linkin Park")
            } else {
                if (threadIdMV[event.threadID] === undefined || threadIdMV[event.threadID] == true) {
                    data.shift()
                    const youtube = await new Innertube();
                    const search = await youtube.search(data.join(" "));
                    if (search.videos[0] === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using music text instead.\nFor instance:\nmusic In The End by Linkin Park")
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
                        let time = getTimestamp();

                        stream.pipe(fs.createWriteStream(__dirname + '/cache/audios/music_' + time + '.mp3'));

                        stream.on('start', () => {
                            threadIdMV[event.threadID] = false;
                            log("Starting the download of music file.");
                        });
                        stream.on('info', (info) => {
                            threadIdMV[event.threadID] = false;
                            log("downloading " + info.video_details.title);
                        });
                        stream.on('end', () => {
                            let limit = 25 * 1024 * 1024;
                            fs.readFile(__dirname + '/cache/audios/music_' + time + '.mp3', function(err, data) {
                                if (err) log(err)
                                if (data.length > limit) {
                                    log("Unable to upload the music to the file limit. The file size is " + (data.length / 1024 / 1024));
                                    sendMessage(api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                                } else {
                                    log("Finish downloading music.");
                                    let message = {
                                        body: search.videos[0].title,
                                        attachment: fs.createReadStream(__dirname + '/cache/audios/music_' + time + '.mp3')
                                    }
                                    sendMessage(api, event, message);
                                }
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/audios/music_' + time + '.mp3');
                            })
                        });
                        stream.on('error', (err) => log(err));
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using lyrics text instead.\nFor instance:\nlyrics In The End by Linkin Park")
            } else {
                data.shift();
                let text = data.join(" ");
                getResponseData("https://api.popcat.xyz/lyrics?song=" + text).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        let error = response.error;
                        if (error == "Song not found!") {
                            sendMessage(api, event, "Unfortunately lyrics was not found.");
                            return;
                        }
                        let title = response.title;
                        let image = response.image;
                        let artist = response.artist;
                        let lyrics = response.lyrics;
                        let time = getTimestamp();
                        request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/lyrics_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: title + " " + artist + "\n\n" + lyrics,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/lyrics_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/lyrics_" + time + ".png");
                            })
                    }
                });
            }
        } else if (input.startsWith("encodebinary")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using encodeBinary text instead.\nFor instance:\nencodeBinary fundamentals in engineering")
            } else {
                var text = input;
                text = text.substring(13)
                var Input = text;
                let output = '';
                for (var i = 0; i < Input.length; i++) {
                    output += Input[i].charCodeAt(0).toString(2) + ' ';
                }
                sendMessage(api, event, output);
            }
        } else if (input.startsWith("decodebinary")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using decodeBinary text instead.\nFor instance:\ndecodeBinary 01100001 01100010 01100011")
            } else {
                var text = input;
                text = text.substring(13)
                var binary = text;
                const binaryString = binary.split(' ');
                let stringOutput = '';
                for (let i = 0; i < binaryString.length; i++) {
                    stringOutput += String.fromCharCode(parseInt(binaryString[i], 2));
                }
                sendMessage(api, event, stringOutput);
            }
        } else if (query.startsWith("encode64")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using encode64 text instead.\nFor instance:\nencode64 fundamentals in engineering")
            } else {
                let text = input;
                text = text.substring(9)
                let buff = Buffer.from(text);
                let base64data = buff.toString('base64');
                sendMessage(api, event, base64data);
            }
        } else if (query.startsWith("decode64")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using decode64 text instead.\nFor instance:\ndecode64 ZnVuZGFtZW50YWxzIGluIGVuZ2luZWVyaW5n")
            } else {
                let text = input;
                text = text.substring(9)
                let buff = Buffer.from(text, 'base64');
                let base642text = buff.toString('ascii');
                sendMessage(api, event, base642text);
            }
        } else if (query.startsWith("reverse")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using reverse text instead.\nFor instance:\nreverse fundamentals in engineering")
            } else {
                let text = input;
                text = text.substring(8)
                let splitString = text.split("");
                let reverseArray = splitString.reverse();
                let joinArray = reverseArray.join("");
                sendMessage(api, event, joinArray);
            }
        } else if (query == "pinremove") {
            if (isGoingToFast(event)) {
                return;
            }
            let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
            pinned.pin.message[event.threadID] = undefined
            pinned.pin.sender[event.threadID] = undefined
            sendMessage(api, event, "Pinned message removed.");
            fs.writeFileSync("cache/pinned.json", JSON.stringify(pinned), "utf8")
        } else if (query == "pin") {
            if (isGoingToFast(event)) {
                return;
            }
            let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
            if (pinned.pin.message[event.threadID] == undefined) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (err) return log(err);
                    if (gc.isGroup) {
                        sendMessage(api, event, "There is no pinned message on this group chat.");
                    } else {
                        sendMessage(api, event, "There is no pinned message on this chat.");
                    }
                })
            } else {
                api.getUserInfo(pinned.pin.sender[event.threadID], (err, data) => {
                    if (err) return log(err);
                    sendMessage(api, event, pinned.pin.message[event.threadID]);
                });
            }
        } else if (query.startsWith("pdf")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pdf text instead.\nFor instance:\npdf fundamentals in engineering")
            } else {
                try {
                    data.shift()
                    data = data.join(" ");
                    let searched = data;

                    let res = await pdfdrive.findEbook(searched);
                    let res2 = await pdfdrive.getEbook(res[0].ebookUrl);

                    sendMessage(api, event, res2.ebookName + "\n\n" + res2.dlUrl)
                } catch (err) {
                    log(err);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                }
            }
        } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query2.startsWith("dict ")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using dict text instead.\nFor instance:\ndict computer");
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
                        'X-RapidAPI-Key': apiKey[2]
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
                    log(err);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                });
            }
        } else if (query.startsWith("summarize") || query2.startsWith("summ ")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using summ text instead.\n\nFor instance:\nsumm this sentence meant to be summarized.");
            } else {
                let text = input.substring(5);
                if (query.startsWith("summarize")) {
                    text = input.substring(10)
                }
                const client = new NLPCloudClient('bart-large-cnn', apiKey[3])
                client.summarization(text).then(function({
                    data
                }) {
                    sendMessage(api, event, data.summary_text);
                }).catch(function(err) {
                    log(err);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.");
                });
            }
        }

        if (query.startsWith("baybayin")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using baybayin text instead.\n\nFor instance:\nbaybayin ako ay filipino")
            } else {
                data.shift()
                getResponseData('https://api-baybayin-transliterator.vercel.app/?text=' + data.join(" ")).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        sendMessage(api, event, response.baybay);
                    }
                });
            }
        } else if (query.startsWith("doublestruck")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using doublestruck text instead.\n\nFor instance:\ndoublestruck Hello World")
            } else {
                data.shift()
                getResponseData('https://api.popcat.xyz/doublestruck?text=' + data.join(" ")).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        sendMessage(api, event, response.text);
                    }
                });
            }
        } else if (query.startsWith("translate")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using translate language text instead.\n\nFor instance:\ntranslate English Kamusta")
            } else {
                let text = input.substring(10);
                let lang = text.split(" ");
                let message = text.substring(lang[0].length);
                getResponseData('https://api.popcat.xyz/translate?to=' + lang[0] + '&text=' + message).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        sendMessage(api, event, response.translated);
                    }
                });
            }
        } else if (query.startsWith("weather")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using weather location instead.\n\nFor instance:\nweather caloocan city")
            } else {
                data.shift()
                let weather = await weathersearch("weather " + data.join(" "))
                if (weather.weather == undefined || weather.weather.temperature == undefined) {
                    weatherjs.find({
                        weathersearch: data.join(" "),
                        degreeType: 'C'
                    }, (err, r) => {
                        if (err) return log(err);
                        let d = r[0]
                        let m = d.location.name + "\n\n"
                        m += "⦿ Temperature: " + d.current.temperature + "\n"
                        m += "⦿ Sky: " + d.current.skytext + "\n"
                        m += "⦿ Observation time: " + d.current.date + " " + d.current.observationtime
                        sendMessage(api, event, m)
                    })
                } else {
                    let output = weather.weather
                    let m = output.location
                    m += "\n\n⦿ Forecast: " + output.forecast
                    m += "\n⦿ Temperature: " + output.temperature + "°F" + " (" + (Math.round(((output.temperature - 32) * 5 / 9) * 100) / 100).toFixed(2) + "°C)"
                    if (output.precipitation != undefined)
                        m += "\n⦿ Precipitation: " + output.precipitation
                    if (output.humidity != undefined)
                        m += "\n⦿ Humidity: " + output.humidity
                    if (output.wind != undefined)
                        m += "\n⦿ Wind speed: " + output.wind
                    sendMessage(api, event, m)
                }
            }
        } else if (query.startsWith("facts")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using facts text instead.\n\nFor instance:\nfacts computer")
            } else {
                data.shift()
                let url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(api, event, url, __dirname + "/cache/images/facts_" + getTimestamp() + ".png");
            }
        } else if (query == "wyr" || query == "wouldyourather") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://api.popcat.xyz/wyr").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, "Would you rather " + response.ops1 + " or " + response.ops2);
                }
            });
        } else if (query == "8ball") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://api.popcat.xyz/8ball").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    sendMessage(api, event, response.answer);
                }
            });
        } else if (query.startsWith("instagram") || query2.startsWith("ig ")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead.\n\nFor instance:\ninstagram melvinjonesrepol")
            } else {
                data.shift()
                let userN = data.join(" ");
                if (userN.startsWith("@")) {
                    userN = userN.slice(1);
                }
                getResponseData('https://manhict.tech/api/igInfo?query=' + userN + '&apikey=' + apiKey[0]).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately instagram user \"" + userN + "\" was not found.");
                    } else {
                        let username = response.result.username;
                        let fullname = response.result.fullname;
                        let biography = response.result.biography;
                        let reels = new Intl.NumberFormat().format(response.result.reels);
                        let followers = new Intl.NumberFormat().format(response.result.followers);
                        let following = new Intl.NumberFormat().format(response.result.following);
                        let private = ((response.result.private) ? "Yes" : "No");
                        let verified = ((response.result.verified) ? "Yes" : "No");
                        let profilepic = response.result.profilePicture;
                        let time = getTimestamp();

                        request(encodeURI(profilepic)).pipe(fs.createWriteStream(__dirname + '/cache/images/instaprofile_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: fullname + " @" + username + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified + "\n\n" + biography,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/instaprofile_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/instaprofile_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("profilepic")) {
            if (isGoingToFast(event)) {
                return;
            }
            let id;
            if ((event.type == "message_reply" && event.senderID != getMyId())) {
                id = event.messageReply.senderID;
            } else {
                id = event.senderID;
            }
            parseImage(api, event, getProfilePicFullHD(id), __dirname + "/cache/images/profilepic_" + getTimestamp() + ".png");
        } else if (query.startsWith("tiktok")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using tiktok username instead.\n\nFor instance:\ntiktok mrepol742")
            } else {
                data.shift()
                let userN = data.join(" ");
                getResponseData('https://manhict.tech/api/tikInfo?query=' + userN + "&apikey=" + apiKey[0]).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately tiktok user \"" + userN + "\" was not found.");
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

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/tiktok_avatar_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: name + " @" + username + "\n⦿ Hearts: " + heart + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Videos: " + video + "\n⦿ Digg: " + digg + "\n\n" + bio,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/tiktok_avatar_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/tiktok_avatar_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("soundcloud")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using soundcloud username instead.\n\nFor instance:\nsoundcloud Denvau")
            } else {
                data.shift()
                let userN = data.join(" ");
                getResponseData('https://manhict.tech/api/scInfo?query=' + encodeURI(userN) + "&apikey=" + apiKey[0]).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately soundcloud user \"" + userN + "\" was not found.");
                    } else {
                        let name = response.result['full_name'];
                        let username = response.result['username'];
                        let bio = response.result['description'];
                        let location = response.result['city'] + " " + response.result['country_code'];
                        let followers = response.result['followers_count'];
                        let following = response.result['followings_count'];
                        let likes = response.result['likes_count'];
                        let playlist = response.result['playlist_count'];
                        let playlistLikes = response.result['playlist_likes_count'];
                        let trackCount = response.result['track_count'];
                        let permalinkUrl = response.result['permalink_url'];
                        let avatar = response.result['avatar_url'];
                        let time = getTimestamp();

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/soundcloud_avatar_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: name + " @" + username + "\n⦿ Location: " + location + "\n⦿ Likes: " + likes + "\n⦿ Playlist: " + playlist + "\n⦿ Playlist Likes: " + playlistLikes + "\n⦿ Tracks: " + trackCount + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n\n" + bio + "\n" + permalinkUrl,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/soundcloud_avatar_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/soundcloud_avatar_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("github")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using github username instead.\n\nFor instance:\ngithub mrepol742")
            } else {
                data.shift()
                let userN = data.join(" ");
                if (userN.startsWith("@")) {
                    userN = userN.slice(1);
                }
                getResponseData('https://api.popcat.xyz/github/' + userN).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately github user \"" + userN + "\" was not found.");
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
                        let avatar = response.avatar;
                        let time = getTimestamp();

                        if (bio == "No Bio") {
                            bio = "";
                        }

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/github_avatar_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Email: " + email + "\n⦿ Location: " + location + "\n⦿ Company: " + company + "\n⦿ Website: " + url + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Public Repository: " + public_repos + "\n⦿ Public Gists: " + public_gists + "\n\n" + bio + "\nhttps://github.com/" + userN,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/github_avatar_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/github_avatar_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("element")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using element name instead.\n\nFor instance:\nelement hydrogen")
            } else {
                data.shift()
                let symbol = data.join(" ");
                getResponseData('https://api.popcat.xyz/periodic-table?element=' + symbol).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately element \"" + symbol + "\" was not found.");
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

                        request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/element_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Symbol: " + symbol + "\n⦿ Atomic Number: " + atomic_number + "\n⦿ Atomic Mass: " + atomic_mass + "\n⦿ Peroid: " + period + "\n⦿ Phase: " + phase + "\n⦿ Discovered by: " + discovered_by + "\n\n" + summary,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/element_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/element_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("npm")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using npm name instead.\n\nFor instance:\nnpm mrepol742")
            } else {
                data.shift()
                let name = data.join(" ");
                getResponseData('https://api.popcat.xyz/npm?q=' + name).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately npm \"" + name + "\" was not found.");
                    } else {
                        let name = response.name;
                        let version = response.version;
                        let description = response.description;
                        let author = response.author;
                        let last_published = response.last_published;
                        let downloads_this_year = response.downloads_this_year;
                        let repository = response.repository;
                        let author_email = response.author_email;
                        sendMessage(api, event, "⦿ Name: " + name + " v" + version + "\n⦿ Author: " + author + "\n⦿ Email: " + author_email + "\n⦿ Updated on: " + last_published + "\n⦿ Repository: " + repository + "\n\n" + description);
                    }
                });
            }
        } else if (query.startsWith("steam")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using steam name instead.\n\nFor instance:\nsteam minecraft")
            } else {
                data.shift()
                let name = data.join(" ");
                getResponseData('https://api.popcat.xyz/steam?q=' + name).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately the \"" + name + "\" was not found on steam.");
                    } else {
                        let name = response.name;
                        let developers = response.developers;
                        let website = response.website;
                        let description = response.description;
                        let banner = response.banner;
                        let price = response.price;
                        let time = getTimestamp();

                        request(encodeURI(banner)).pipe(fs.createWriteStream(__dirname + '/cache/images/steam_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Price: " + price + "\n⦿ Developers: " + developers + "\n⦿ Website: " + website + "\n\n" + description,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/steam_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/steam_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("imdb")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using imdb name instead.\n\nFor instance:\nimdb iron man")
            } else {
                data.shift()
                let name = data.join(" ");
                getResponseData('https://api.popcat.xyz/imdb?q=' + name).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately imdb \"" + name + "\" was not found.");
                    } else {
                        let title = response.title;
                        let year = response.year;
                        let runtime = response.runtime;
                        let actors = response.actors;
                        let poster = response.poster;
                        let genres = response.genres;
                        let plot = response.plot;
                        let time = getTimestamp();

                        request(encodeURI(poster)).pipe(fs.createWriteStream(__dirname + '/cache/images/imdb_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Title: " + title + " " + year + "\n⦿ Genres: " + genres + "\n⦿ Runtime: " + runtime + "\n⦿ Actors: " + actors + "\n\n" + plot,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/imdb_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/imdb_" + time + ".png");
                            })
                    }
                });
            }
        } else if (query.startsWith("itunes")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using itunes title instead.\n\nFor instance:\nitunes in the end")
            } else {
                data.shift()
                let name = data.join(" ");
                getResponseData('https://api.popcat.xyz/itunes?q=' + name).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately the \"" + name + "\" was not found in itunes music.");
                    } else {
                        let name = response.name;
                        let artist = response.artist;
                        let album = response.album;
                        let genre = response.genre;
                        let length = response.length.replace('s', '');
                        let lenghtM = (Math.round((length / 60) * 100) / 100).toFixed(2);
                        let thumbnail = response.thumbnail;
                        let time = getTimestamp();

                        request(encodeURI(thumbnail)).pipe(fs.createWriteStream(__dirname + '/cache/images/itunes_' + time + '.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + " by " + artist + "\n⦿ Album: " + album + "\n⦿ Genre: " + genre + "\n⦿ Length: " + lenghtM + " minutes",
                                    attachment: fs.createReadStream(__dirname + '/cache/images/itunes_' + time + '.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/itunes_" + time + ".png");
                            })
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

                    request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/car_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: title,
                                attachment: fs.createReadStream(__dirname + '/cache/images/car_' + time + '.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/car_" + time + ".png");
                        })
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

                    request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/color_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: name + " #" + hex,
                                attachment: fs.createReadStream(__dirname + '/cache/images/color_' + time + '.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/color_" + time + ".png");
                        })
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
        } else if (query.startsWith("gemoji")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gemoji emoji instead.\n\nFor instance:\ngemoji 😂")
            } else {
                data.shift()
                if (!pictographic.test(data.join(" "))) {
                    sendMessage(api, event, "Unable to set the chat quick reaction. Invalid emoji.");
                }
                api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                    if (err) return log(err);
                });
            }
        } else if (query.startsWith("sendreport")) {
            if (isGoingToFastReporting(api, event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sendReport text instead.\n\nFor instance:\nsendReport There is a problem in ______ that cause ______.")
            } else {
                data.shift()
                api.sendMessage(data.join(" "), getMyId(), (err, messageInfo) => {
                    if (err) log(err);
                });
            }
        } else if (query.startsWith("setmaxtokens")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setMaxTokens [integer] instead.\n\nFor instance:\nsetMaxTokens 1000.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    if (num > 4000) {
                        sendMessage(api, event, "Opps! the limit is 4000.");
                    } else if (num < 10) {
                        sendMessage(api, event, "Opps! the minimum value 10");
                    } else {
                        settings.max_tokens = num;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Max Tokens is now set to " + num);
                    }
                }
            }
        } else if (query.startsWith("settemperature")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setTemperature [integer] instead.\n\nFor instance:\nsetTemperature 0.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    if (num > 1) {
                        sendMessage(api, event, "Opps! the limit is 1.");
                    } else if (num < -0) {
                        sendMessage(api, event, "Opps! the minimum value 0.1");
                    } else {
                        settings.temperature = num;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Temperature is now set to " + num);
                    }
                }
            }
        } else if (query.startsWith("setfrequencypenalty")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setFrequencyPenalty [integer] instead.\n\nFor instance:\nsetFrequencyPenalty 1.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    if (num > 2) {
                        sendMessage(api, event, "Opps! the limit is 2.");
                    } else if (num < -2) {
                        sendMessage(api, event, "Opps! the minimum value -2");
                    } else {
                        settings.frequency_penalty = num;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Frequency Penalty is now set to " + num);
                    }
                }
            }
        } else if (query.startsWith("setpresencepenalty")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setPresencePenalty [integer] instead.\n\nFor instance:\nsetPresencePenalty 1.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    if (num > 2) {
                        sendMessage(api, event, "Opps! the limit is 2.");
                    } else if (num < -2) {
                        sendMessage(api, event, "Opps! the minimum value -2");
                    } else {
                        settings.presence_penalty = num;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Presence Penalty is now set to " + num);
                    }
                }
            }
        } else if (query.startsWith("settextcomplextion")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    settings.text_complextion = num;
                    fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(api, event, "Text Complextion is now set to " + num);
                }
            }
        } else if (query.startsWith("setprobabilitymass")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setProbabilityMass [integer] instead.\n\nFor instance:\nsetProbabilityMass 0.1.")
                } else {
                    data.shift();
                    let num = data.join(" ");
                    if (num > 1) {
                        sendMessage(api, event, "Opps! the limit is 1.");
                    } else if (num < -0) {
                        sendMessage(api, event, "Opps! the minimum value 0");
                    } else {
                        settings.probability_mass = num;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Probability Mass is now set to " + num);
                    }
                }
            }
        } else if (query.startsWith("settimezone")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setTimezone timezone instead.\n\nFor instance:\nsetTimezone Asia/Singapore")
                } else {
                    data.shift();
                    let pref = data.join(" ");
                    if (timeZones.includes(pref)) {
                        settings.timezone = pref;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Timezone is now set to " + pref);
                        sendMessage(api, event, "It's " + getMonth(settings.timezone) + " " + getDayN(settings.timezone) + ", " + getDay(settings.timezone) + " " + formateDate(settings.timezone));
                    } else {
                        sendMessage(api, event, "Timezone " + pref + " is invalid. Please input valid timezones.")
                    }
                }
            }
        } else if (query.startsWith("setprefix")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setPrefix prefix instead.\n\nFor instance:\nsetPrefix $")
                } else {
                    data.shift();
                    let pref = data.join(" ");
                    let first = pref.split("");
                    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(first)) {
                        settings.prefix = pref;
                        fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                        sendMessage(api, event, "Prefix is now set to " + pref);
                    } else {
                        sendMessage(api, event, "Unable to set prefix to " + first + " due to some reasons. Please use only symbols such as ! @ # $ etc..")
                    }
                }
            }
        } else if (query == "remprefix") {
            if (vips.includes(event.senderID)) {
                if (settings.prefix != "null" || settings.prefix != undefined) {
                    settings.prefix = "null";
                    fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(api, event, "Prefix reset to default values.");
                }
            }
        } else if (query.startsWith("adduser")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor instance:\naddUser 100024563636366");
            } else {
                data.shift();
                let pref = data.join(" ");
                if (pref.split("").length >= 15) {
                    if (/^\d+$/.test(pref)) {
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) return log(err);
                            if (gc.isGroup) {
                                api.addUserToGroup(pref, event.threadID, (err) => {
                                    if (err) log(err);
                                    log("add_user " + event.threadID + " " + pref);
                                });
                            } else {
                                sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                            }
                        })
                    } else {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor instance:\naddUser 100024563636366");
                    }
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor instance:\naddUser 100024563636366");
                }
            }
        } else if (query.startsWith("gcolor")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gcolor theme instead.\n\nFor instance:\ngcolor DefaultBlue");
            } else {
                data.shift();
                let pref = data.join(" ");
                if (gcolorn.includes(pref)) {
                    api.changeThreadColor(gcolor[pref], event.threadID, (err) => {
                        if (err) return log(err);
                    });
                    log("change_color " + event.threadID + " " + gcolor[pref]);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using gcolor theme instead.\n\nFor instance:\ngcolor DefaultBlue");
                }
            }
        } else if (query.startsWith("welcomeuser")) {
            if (vips.includes(event.senderID)) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (err) return log(err);
                    if (gc.isGroup) {
                        if (input.includes("@")) {
                            let id = Object.keys(event.mentions)[0];
                            if (id === undefined) {
                                let data = input.split(" ");
                                data.shift();
                                api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                    if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                     
                                });
                                return;
                            } else if (isMyId(id)) {
                                return;
                            }
                             
                        } else {
                            sendMessage(api, event, "Opps! I didnt get it. You should try using welcomeuser @mention instead.\n\nFor instance:\nwelcomeuser @Zero Two")
                        }
                    } else {
                        sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                    }
                })
            }
        } else if (query.startsWith("kickuser")) {
            if (vips.includes(event.senderID)) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (err) return log(err);
                    if (gc.isGroup) {
                        if (input.includes("@")) {
                            let id = Object.keys(event.mentions)[0];
                            if (id === undefined) {
                                let data = input.split(" ");
                                data.shift();
                                api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                    if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                    removeUser(api, event, data[0].userID);
                                });
                                return;
                            } else if (isMyId(id)) {
                                return;
                            }
                            removeUser(api, event, id);
                        } else {
                            sendMessage(api, event, "Opps! I didnt get it. You should try using kickUser @mention instead.\n\nFor instance:\nkickUser @Zero Two")
                        }
                    } else {
                        sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                    }
                })
            }
        } else if (query.startsWith("blockuser")) {
            if (vips.includes(event.senderID)) {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        let data = input.split(" ");
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return log(err);
                            blockUser(api, event, data[0].userID);
                        });
                        return;
                    } else if (isMyId(id)) {
                        return;
                    }
                    blockUser(api, event, id)
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using blockUser @mention instead.\n\nFor instance:\nblockUser @Zero Two")
                }
            }
        } else if (query.startsWith("blockgroup")) {
            if (vips.includes(event.senderID)) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (err) return log(err);
                    if (gc.isGroup) {
                        blockGroup(api, event, event.threadID);
                    } else {
                        sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                    }
                })
            }
        } else if (query.startsWith("smartreplyon")) {
            enableSmartReply(api, event, event.threadID);
        } else if (query.startsWith("smartreplyoff")) {
            disableSmartReply(api, event, event.threadID);
        } else if (query.startsWith("listadmins")) {
            if (vips.includes(event.senderID)) {
                sendMessage(api, event, "Admins:\n" + vips);
            }
        } else if (query.startsWith("listblocks")) {
            if (vips.includes(event.senderID)) {
                sendMessage(api, event, "Users:\n" + blockRRR + "\n\nGroups:\n" + blockSSS);
            }
        } else if (query.startsWith("listmuted")) {
            if (vips.includes(event.senderID)) {
                sendMessage(api, event, "");
            }
        } else if (query.startsWith("unblockuser")) {
            if (vips.includes(event.senderID)) {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        let data = input.split(" ");
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            unblockUser(api, event, data[0].userID);
                        });
                        return;
                    } else if (isMyId(id)) {
                        return;
                    }
                    unblockUser(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using unblockUser @mention instead.\n\nFor instance:\nunblockUser @Zero Two")
                }
            }
        } else if (query.startsWith("addadmin")) {
            if (vips.includes(event.senderID)) {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        let data = input.split(" ");
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            addAdmin(api, event, data[0].userID);
                        });
                        return;
                    } else if (isMyId(id)) {
                        return;
                    }
                    addAdmin(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using addAdmin @mention instead.\n\nFor instance:\naddAdmin @Zero Two")
                }
            }
        } else if (query.startsWith("remadmin")) {
            if (vips.includes(event.senderID)) {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        let data = input.split(" ");
                        data.shift();
                        api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                            if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                            remAdmin(api, event, data[0].userID);
                        });
                        return;
                    } else if (isMyId(id)) {
                        return;
                    }
                    remAdmin(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using remAdmin @mention instead.\n\nFor instance:\nremAdmin @Zero Two")
                }
            }
        } else if ((query == "unsendon") && !settings.onUnsend) {
            if (vips.includes(event.senderID)) {
                settings.onUnsend = true
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Resending of unsend messages and attachments are now enabled.");
            }
        } else if ((query == "unsendoff") && settings.onUnsend) {
            if (vips.includes(event.senderID)) {
                settings.onUnsend = false
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Resending of unsend messages and attachments is been disabled.");
            }
        } else if ((query == "delayon") && !settings.onDelay) {
            if (vips.includes(event.senderID)) {
                settings.onDelay = true
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Delay on messages, replies and reaction are now enabled.");
            }
        } else if ((query == "delayoff") && settings.onDelay) {
            if (vips.includes(event.senderID)) {
                settings.onDelay = false
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Delay on messages, replies and reaction is been disabled.");
            }
        } else if ((query == "nsfwon") && !settings.onNsfw) {
            if (vips.includes(event.senderID)) {
                settings.onNsfw = true
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Not Safe For Work are now enabled.");
            }
        } else if ((query == "nsfwoff") && settings.onNsfw) {
            if (vips.includes(event.senderID)) {
                settings.onNsfw = false
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Not Safe For Work is been disabled.");
            }
        } else if ((query == "simultaneousexecutionon") && !settings.preventSimultaneousExecution) {
            if (vips.includes(event.senderID)) {
                settings.preventSimultaneousExecution = true
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Prevention of simulataneous execution are now enabled.");
            }
        } else if ((query == "simultaneousexecutionoff") && settings.preventSimultaneousExecution) {
            if (vips.includes(event.senderID)) {
                settings.preventSimultaneousExecution = false
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Prevention of simulataneous execution is now disabled.");
            }
        } else if (query == "gmember") {
            if (isGoingToFast(event)) {
                return;
            }
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    sendMessage(api, event, "This group has about " + arr.length + " members.")
                } else {
                    sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            })
        } else if (query.startsWith("gname")) {
            if (isGoingToFast(event)) {
                return;
            }
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using gname text instead.\n\nFor instance:\ngname Darling in the Franxx >3")
                    } else {
                        data.shift()
                        api.setTitle(data.join(" "), event.threadID, (err, obj) => {
                            if (err) return log(err);
                        });
                    }
                } else {
                    sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            })
        } else if (query == "gname") {
            if (isGoingToFast(event)) {
                return;
            }
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    sendMessage(api, event, gc.threadName);
                } else {
                    sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                }
            })
        } else if (query == "groupid" || query == "guid" || query == "uid") {
            if (isGoingToFast(event)) {
                return;
            }
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                else {
                    if ((event.type == "message_reply" && event.senderID != getMyId())) {
                        api.getUserInfo(event.messageReply.senderID, (err, info) => {
                            if (err) return log(err);
                            let name = info[event.messageReply.senderID]['name'];
                            sendMessage(api, event, name + " uid is " + event.messageReply.senderID);
                        });
                    } else if (gc.isGroup) {
                        sendMessage(api, event, "The " + gc.threadName + " guid is " + event.threadID);
                    } else if (event.type == "message") {
                        sendMessage(api, event, "Your uid is " + event.senderID);
                    }
                }
            });
        } else if (query == "cmd" || query == "cmd1") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 1~8\n" + help + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd2") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 2~8\n" + help1 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd3") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 3~8\n" + help2 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd4") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 4~8\n" + help3 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd5") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 5~8\n" + help4 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd6") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 6~8\n" + help5 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd7") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 7~8\n" + help6 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd8") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion 8~8\n" + help7 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmdadmin") {
            if (isGoingToFast(event)) {
                return;
            }
            if (!vips.includes(event.senderID)) {
                return;
            }
            sendMessage(api, event, "The Project Orion Admin\n" + helpadmin + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmdall") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "The Project Orion\n" + help + help1 + help2 + help3 + help4 + help5 + help6  + help7+ "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using wiki text instead.\n\nFor instance:\nwiki Google")
            } else {
                let txt = input.substring("5");
                getResponseData("https://en.wikipedia.org/api/rest_v1/page/summary/" + txt).then((response) => {
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using lovetest name:name instead.\n\nFor instance:\nlovetest Edogawa Conan: Ran Mouri")
            } else {
                let text = input;
                text = text.substring(9).split(":");
                const options = {
                    method: 'GET',
                    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
                    params: {
                        sname: text[0],
                        fname: text[1]
                    },
                    headers: {
                        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
                        'X-RapidAPI-Key': '1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74'
                    }
                };
                axios.request(options).then(function({
                    data
                }) {
                    var name1 = data.fname;
                    var name2 = data.sname;
                    var percent = data.percentage + "%";
                    var result = data.result;
                    sendMessage(api, event, name1 + " ❤️ " + name2 + "\n\n⦿ Percentage: " + percent + "\n" + result);
                }).catch(function(error) {
                    log(error);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                });
            }
        } else if (query.startsWith("kiss")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using kiss @mention instead.\n\nFor instance:\nkiss @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                kiss(api, event, data[0].userID)
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    kiss(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using kiss @mention instead.\n\nFor instance:\nkiss @Zero Two")
                }
            }
        } else if (query.startsWith("gun")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gun @mention instead.\n\nFor instance:\ngun @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                gun(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    gun(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using gun @mention instead.\n\nFor instance:\ngun @Zero Two")
                }
            }
        } else if (query.startsWith("wanted")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wanted @mention instead.\n\nFor instance:\nwanted @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                wanted(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    wanted(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using wanted @mention instead.\n\nFor instance:\nwanted @Zero Two")
                }
            }
        } else if (query.startsWith("clown")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using clown @mention instead.\n\nFor instance:\nclown @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                clown(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    clown(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using clown @mention instead.\n\nFor instance:\nclown @Zero Two")
                }
            }
        } else if (query.startsWith("drip")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using drip @mention instead.\n\nFor instance:\ndrip @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                drip(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    drip(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using drip @mention instead.\n\nFor instance:\ndrip @Zero Two")
                }
            }
        } else if (query.startsWith("communist")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using communist @mention instead.\n\nFor instance:\ncommunist @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                communist(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    communist(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using communist @mention instead.\n\nFor instance:\ncommunist @Zero Two")
                }
            }
        } else if (query.startsWith("advert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using advert @mention instead.\n\nFor instance:\nadvert @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                advert(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    advert(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using advert @mention instead.\n\nFor instance:\nadvert @Zero Two")
                }
            }
        } else if (query.startsWith("uncover")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using uncover @mention instead.\n\nFor instance:\nuncover @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                uncover(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    uncover(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using uncover @mention instead.\n\nFor instance:\nuncover @Zero Two")
                }
            }
        } else if (query.startsWith("jail")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using jail @mention instead.\n\nFor instance:\njail @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                jail(api, event, id = data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    jail(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using jail @mention instead.\n\nFor instance:\njail @Zero Two")
                }
            }
        } else if (query.startsWith("invert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using invert @mention instead.\n\nFor instance:\ninvert @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                invert(api, event, data[0].userID);
                            });
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    invert(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using invert @mention instead.\n\nFor instance:\ninvert @Zero Two")
                }
            }
        } else if (query.startsWith("ship")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor instance:\nship @Edogawa Conan @Ran Mouri")
            } else {
                if ((input.split('@').length - 1) >= 2) {
                    let id1 = Object.keys(event.mentions)[0];
                    let id2 = Object.keys(event.mentions)[1];
                    if (id1 === undefined || id2 === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor instance:\nship @Edogawa Conan @Ran Mouri")
                        return;
                    }
                    if (isMyId(id1)) {
                        id1 = event.senderID;
                    } else if (isMyId(id2)) {
                        id2 = event.senderID;
                    }
                    parseImage(api, event, "https://api.popcat.xyz/ship?user1=" + getProfilePic(id1) + "&user2=" + getProfilePic(id2), __dirname + "/cache/images/ship_" + getTimestamp() + ".png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor instance:\nship @Edogawa Conan @Ran Mouri")
                }
            }
        } else if (query.startsWith("www")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor instance:\nwww @Edogawa Conan @Ran Mouri")
            } else {
                if ((input.split('@').length - 1) >= 2) {
                    let id1 = Object.keys(event.mentions)[0];
                    let id2 = Object.keys(event.mentions)[1];
                    if (id1 === undefined || id2 === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor instance:\nwww @Edogawa Conan @Ran Mouri")
                        return;
                    }
                    if (isMyId(id1)) {
                        id1 = event.senderID;
                    } else if (isMyId(id2)) {
                        id2 = event.senderID;
                    }
                    parseImage(api, event, "https://api.popcat.xyz/whowouldwin?image1=" + getProfilePic(id1) + "&image2=" + getProfilePic(id2), __dirname + "/cache/images/www_" + getTimestamp() + ".png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor instance:\nwww @Edogawa Conan @Ran Mouri")
                }
            }
        } else if (query.startsWith("pet")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pet @mention instead.\n\nFor instance:\npet @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                pet(api, event, id);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    pet(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using pet @mention instead.\n\nFor instance:\npet @Zero Two")
                }
            }
        } else if (query.startsWith("mnm")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mnm @mention instead.\n\nFor instance:\nmnm @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                mnm(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    mnm(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using mnm @mention instead.\n\nFor instance:\nmnm @Zero Two")
                }
            }
        } else if (query.startsWith("greyscale")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using greyscale @mention instead.\n\nFor instance:\ngreyscale @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                greyscale(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    greyscale(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using greyscale @mention instead.\n\nFor instance:\ngreyscale @Zero Two")
                }
            }
        } else if (query.startsWith("jokeover")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using jokeover @mention instead.\n\nFor instance:\njokeover @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                jokeover(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    jokeover(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using jokeover @mention instead.\n\nFor instance:\njokeover @Zero Two")
                }
            }
        } else if (query.startsWith("blur")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using blur @mention instead.\n\nFor instance:\nblur @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                blur(api, event, data[0].userID);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    blur(api, event, id);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using blur @mention instead.\n\nFor instance:\nblur @Zero Two")
                }
            }
        } else if (query.startsWith("facebook") || query2.startsWith("fb ")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using facebook @mention instead.\n\nFor instance:\nfacebook @Zero Two")
            } else {
                if (input.includes("@")) {
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                id = data[0].userID;
                            });
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, async (err, ret) => {
                        if (err) return log(err);
                        for (let prop in ret) {
                            let {
                                vanity,
                                name,
                                gender,
                                isBirthday
                            } = ret[prop]
                            let url = encodeURI('https://graph.facebook.com/' + `${prop}` + '/picture?height=720&width=720&access_token=' + apiKey[1])
                            let time = getTimestamp();
                            let filename = __dirname + "/cache/images/facebook_" + time + ".jpg";
                            let msg = checkFound(name) + " @" + checkFound(vanity);
                            msg += "\n⦿ Gender: " + (gender == 1 ? "female" : "male");
                            msg += "\n⦿ Birthday: " + checkFound(isBirthday);

                            await download(url, filename, () => {
                                let message = {
                                    body: msg,
                                    attachment: fs.createReadStream(filename)
                                };
                                sendMessage(api, event, message);
                                unLink(filename);
                            })
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using facebook @mention instead.\n\nFor instance:\nfacebook @Zero Two")
                }
            }
        } else if (query.startsWith("morse")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using morse text instead.\nFor instance:\nmorse .... . .-.. .-.. ---");
            } else {
                getResponseData("https://api.popcat.xyz/texttomorse?text=" + text).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        sendMessage(api, event, response.morse);
                    }
                });
            }
        } else if (query.startsWith("lulcat")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using lulcat text instead.\nFor instance:\nlulcat meowww");
            } else {
                getResponseData("https://api.popcat.xyz/lulcat?text=" + text).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
                    } else {
                        sendMessage(api, event, response.text);
                    }
                });
            }
        } else if (query.startsWith("mock")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(5)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mock text instead.\nFor instance:\nmock i have no idea");
            } else {
                getResponseData("https://api.popcat.xyz/mock?text=" + text).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately there was an error occured.");
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

                    request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/coding_' + time + '.png'))

                        .on('finish', () => {
                            let message = {
                                body: title,
                                attachment: fs.createReadStream(__dirname + '/cache/images/coding_' + time + '.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/coding_" + time + ".png");
                        })
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
                attachment: fs.createReadStream(__dirname + '/cache/assets/barrier.jpg')
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
            let text = input;
            text = text.substring(9)
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead.\nFor instance:\nnickname @Zero Two Darling");
            } else {
                if (input.includes("@")) {
                    await wait(3000);
                    let id = Object.keys(event.mentions)[0];
                    if (id === undefined) {
                        if (input.includes("@me")) {
                            id = event.senderID;
                        } else {
                            data.shift();
                            api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                changeNickname(api, event, data[0].userID, text);
                            });
                            return;
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    changeNickname(api, event, id, text);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead.\nFor instance:\nnickname @Zero Two Darling");
                }
            }
        } else if (query.startsWith("drake")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using drake text1: text2 instead.\nFor instance:\ndrake error: bug");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + "/cache/images/drake_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("pika")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(5);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pika text instead.\nFor instance:\npika hayssss");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pikachu?text=" + text, __dirname + "/cache/images/pika_" + getTimestamp() + ".png");
            }
        } else if (query == "meme") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://api.popcat.xyz/meme").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    parseImage(api, event, response.image, __dirname + '/cache/images/meme.png');
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
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using oogway text instead.\nFor instance:\noogway bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/oogway?text=" + text, __dirname + "/cache/images/oogway_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("animensfw")) {
            if (settings.onNsfw) {
                sendMessage(api, event, "There are kids!!!");
                return;
            }
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(13);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using anime --nsfw category instead.\nFor instance:\nanime --nsfw waifu");
            } else {
                if (!(text in categoryNSFW)) {
                    getResponseData("https://api.waifu.pics/nsfw/" + text).then((response) => {
                        if (response == null) {
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        } else {
                            parseImage(api, event, response.url, __dirname + "/cache/images/animensfw_" + getTimestamp() + ".png");
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using anime --nsfw category instead.\nFor instance:\nanime --nsfw waifu");
                }
            }
        } else if (query == "hololive") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://zenzapis.xyz/randomanime/hololive?apikey=9c4c44db3725").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let time = getTimestamp();
                    request(encodeURI(response.result.image)).pipe(fs.createWriteStream(__dirname + "/cache/images/hololive_" + time + ".png"))
                        .on('finish', () => {
                            let message = {
                                body: response.result.caption,
                                attachment: [
                                    fs.createReadStream(__dirname + "/cache/images/hololive_" + time + ".png")
                                ]
                            }
                            sendMessage(api, event, message);
                        });
                }
            });
        } else if (query == "animecouples") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://zenzapis.xyz/randomanime/couples?apikey=9c4c44db3725").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let time = getTimestamp();
                    request(encodeURI(response.result.male)).pipe(fs.createWriteStream(__dirname + "/cache/images/animecouple_male_" + time + ".png"))
                        .on('finish', () => {
                            request(encodeURI(response.result.female)).pipe(fs.createWriteStream(__dirname + "/cache/images/animecouple_female_" + time + ".png"))
                            .on('finish', () => {
                                let message = {
                                    attachment: [
                                        fs.createReadStream(__dirname + "/cache/images/animecouple_male_" + time + ".png"),
                                        fs.createReadStream(__dirname + "/cache/images/animecouple_female_" + time + ".png")
                                    ]
                                }
                                sendMessage(api, event, message);
                            });
                        });
                }
            });
        } else if (query.startsWith("anime")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using anime category instead.\nFor instance:\nanime waifu");
            } else {
                if (!(text in categorySFW)) {
                    getResponseData("https://api.waifu.pics/sfw/" + text).then((response) => {
                        if (response == null) {
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        } else {
                            parseImage(api, event, response.url, __dirname + "/cache/images/anime_" + getTimestamp() + ".png");
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using anime category instead.\nFor instance:\nanime waifu");
                }
            }
        } else if (query.startsWith("trump")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using trump text instead.\nFor instance:\ntrump bug is not an error");
            } else {
                parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" + text, __dirname + "/cache/images/trump_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("qrcode")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using qrcode text instead.\nFor instance:\nqrcode https://mrepol742.github.io");
            } else {
                parseImage(api, event, "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + text, __dirname + "/cache/images/qrcode_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("alert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using alert text instead.\nFor instance:\nalert hello world");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/alert?text=" + text, __dirname + "/cache/images/alert_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("caution")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using caution text instead.\nFor instance:\ncaution bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/caution?text=" + text, __dirname + "/cache/images/caution_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("biden")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using biden text instead.\nFor instance:\nbiden i am leaving twitter");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/biden?text=" + text, __dirname + "/cache/images/biden_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("website")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using website url instead.\nFor instance:\nwebsite https://mrepol742.github.io");
            } else {
                if (text.startsWith("https://") || text.startsWith("http://")) {
                    parseImage(api, event, "https://api.popcat.xyz/screenshot?url=" + encodeURI(text), __dirname + "/cache/images/website_" + getTimestamp() + ".png");
                } else {
                    sendMessage(api, event, "It looks like you send invalid url. Does it have https or http scheme?");
                }
            }
        } else if (query.startsWith("god")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(4);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using god text instead.\nFor instance:\ngod explicit content");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" + text, __dirname + "/cache/images/god_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("sadcat")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sadcat text instead.\nFor instance:\nsadcat meoww");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" + text, __dirname + "/cache/images/sadcat_" + getTimestamp() + ".png");
            }
        } else if (query2.startsWith("sim ")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
            } else {
                data.shift()
                let txt = data.join(" ");
                getResponseData('https://api.simsimi.net/v2/?text=' + txt + '&lc=ph&cf=false&name=' + mjme[Math.floor(Math.random() * mjme.length)]).then((response) => {
                    if (response == null) {
                        sendMessage(api, event, "Unfortunately i am not simp anymore.");
                    } else {
                        sendMessage(api, event, response['success']);
                    }
                });
            }
        } else if (query.startsWith("pooh")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(5).split(":");
            let data = input.split(" ");
            if (data.length < 3) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pooh text1: text2 instead.\nFor instance:\npooh color: colour");
            } else {
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
            let text = input;
            text = text.substring(10);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using landscape text instead.\nFor instance:\nlandscape night");
            } else {
                parseImage(api, event, "https://source.unsplash.com/1600x900/?" + text, __dirname + "/cache/images/landscape_" + getTimestamp() + ".png");
            }
        } else if (query == "costplay") {
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
            let text = input;
            text = text.substring(9);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using portrait text instead.\nFor instance:\nportrait rgb");
            } else {
                parseImage(api, event, "https://source.unsplash.com/900x1600/?" + text, __dirname + "/cache/images/portrait_" + getTimestamp() + ".png");
            }
        } else if (query.startsWith("animequote")) {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://animechan.vercel.app/api/random").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
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
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = response[i].q;
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query2.startsWith("time ")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead.\nFor instance:\ntime Asia/Singapore");
            } else {
                let body = input.substring(5);
                if (timeZones.includes(body)) {
                    sendMessage(api, event, "It's " + getMonth(body) + " " + getDayN(body) + ", " + getDay(body) + " " + formateDate(body));
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead.\nFor instance:\ntime Asia/Singapore");
                }
            }
        } else if (query == "time") {
            sendMessage(api, event, "It's " + getMonth(settings.timezone) + " " + getDayN(settings.timezone) + ", " + getDay(settings.timezone) + " " + formateDate(settings.timezone));
        } else if (query.startsWith("inspiration")) {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://zenquotes.io/api/random").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
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
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
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
                attachment: fs.createReadStream(__dirname + '/cache/assets/newyear.gif')
            };
            sendMessage(api, event, message)
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
                attachment: fs.createReadStream(__dirname + '/cache/assets/Christmas.gif')
            };
            sendMessage(api, event, message)
        } else if (query == "verserandom") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("http://labs.bible.org/api/?passage=random&type=json").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
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
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    let result;
                    for (let i = 0; i < response.length; i++) {
                        result = response[i].text + "\n\n" + response[i].bookname + " " + response[i].chapter + ":" + response[i].verse;
                    }
                    sendMessage(api, event, result);
                }
            });
        } else if (query.startsWith("verse")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead.\nFor instance:\nverse Job 4:9");
            } else {
                data.shift()
                let body = data.join(" ");
                getResponseData("http://labs.bible.org/api/?passage=" + body + "&type=json").then((r) => {
                    if (r == null) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using verse book chapter:verse instead.\nFor instance:\nverse Job 4:9");
                    } else {
                        let result = ""
                        let total = r.length
                        for (let i = 0; i < total; i++) {
                            result += r[i].text + "\n\n" + r[i].bookname + " " + r[i].chapter + ":" + r[i].verse;
                        }
                        sendMessage(api, event, result);
                    }
                })
            }
        } else if (query == "refreshstate") {
            if (vips.includes(event.senderID)) {
                fs.writeFileSync("cache/app_state.json", JSON.stringify(api.getAppState()), "utf8");
                sendMessage(api, event, "The AppState refreshed.");
                fb_stateD = getFormattedDate();
            }
        } else if (query == "savestate") {
            if (vips.includes(event.senderID)) {
                fs.writeFileSync("cache/answer.json", JSON.stringify(saveAns), "utf8");
                fs.writeFileSync("cache/msgs.json", JSON.stringify(msgs), "utf8");
                sendMessage(api, event, "The state have saved successfully.");
                messagesD = getFormattedDate();
            }
        } else if (query.startsWith("test") || query.startsWith("hello world") || query.startsWith("hi world")) {
            sendMessage(api, event, "Hello World");
        } else if (query == "about") {
            let message = {
                body: "Hi there, i am Mj. \n\nIf you need help i am always be here. For list of commands type cmd. Melvin Jones Repol created me on Nov 2022.",
                attachment: [fs.createReadStream(__dirname + "/cache/welcome_img/hello" + Math.floor(Math.random() * 8) + ".jpg")]
            }
            sendMessage(api, event, message);
        } else if (query == "copyright") {
            let message = {
                body: "Melvin Jones Repol Ⓒ 2022. All Rights Reserved. Project Orion is a Closed Source Project.",
                attachment: [fs.createReadStream(__dirname + "/cache/welcome_img/hello" + Math.floor(Math.random() * 8) + ".jpg")]
            }
            sendMessage(api, event, message);
        } else if (query == "license") {
            let message = {
                body: "/* Copyright (C) MREPOL742 - All Rights Reserved\n" +
                    "* Unauthorized copying of this file, via any medium is strictly prohibited\n" +
                    "* Proprietary and confidential\n" +
                    "* Written by Melvin Jones Repol <mrepol742@gmail.com>, November 2022\n" +
                    "*/",
                attachment: [fs.createReadStream(__dirname + "/cache/welcome_img/hello" + Math.floor(Math.random() * 8) + ".jpg")]
            }
            sendMessage(api, event, message);
        } else {
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (err) return log(err);
                if (gc.isGroup) {
                    if ((event.type == "message_reply" && event.senderID != getMyId())) {
                        if (event.messageReply.senderID == getMyId()) {
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
            });
        }

        if ((event.type == "message_reply" && event.senderID != getMyId())) {
            if (!isMyId(event.messageReply.senderID)) {
                return;
            }
            someA(api, event, query, input);
        }
        reaction(api, event, query, input);
    }
}

function someA(api, event, query, input) {
    if (query.startsWith("sup") || query.startsWith("wassup") || query.startsWith("whatsup")) {
        sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        return true;
    } else if (query.startsWith("hi") || query.startsWith("hello") || query.startsWith("hey")) {
        sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        return true;
    } else if (query.startsWith("okay")) {
        sendMessage(api, event, "Yup");
        return true;
    } else if (nsfw(query)) {
        sendMessage(api, event, "Shhhhhhh watch your mouth.");
        return true;
    } else if (query == "idk") {
        sendMessage(api, event, "I dont know too...");
        return true;
    }
    return false;
}

function reaction(api, event, query, input) {
    if (containsAny(query, happyEE) || (input.includes("😂") || input.includes("🤣") || input.includes("😆"))) {
        reactMessage(api, event, ":laughing:");
        if (query.includes("hahahaha") || query.includes("hahhaha") || query.includes("ahhahahh")) {
            sendMessage(api, event, funD[Math.floor(Math.random() * funD.length)])
        }
    } else if (containsAny(input.toLowerCase(), sadEE)) {
        reactMessage(api, event, ":sad:");
    } else if (containsAny(input.toLowerCase(), angryEE)) {
        reactMessage(api, event, ":angry:");
    } else if (containsAny(query, loveEE) || (query == "bot" || query == "good")) {
        reactMessage(api, event, ":love:");
    } else if (query == "tsk") {
        reactMessage(api, event, ":like:");
    } else if (query == "nice" || query == "uwu") {
        reactMessage(api, event, ":heart:");
    }
}

function someR(api, event, query) {
    if (query.startsWith("goodeve") || query.startsWith("evening")) {
        if (isEvening(settings.timezone)) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, goodev[Math.floor(Math.random() * goodev.length)]);
            sendMessageOnly(api, event, "🥰🌘");
        } else {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + ".");
        }
        return true;
    } else if (query.startsWith("goodmorn") || query.startsWith("morning")) {
        if (isMorning(settings.timezone)) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, goodmo[Math.floor(Math.random() * goodmo.length)]);
            sendMessageOnly(api, event, "🥰☀️");
        } else {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + ".");
        }
        return true;
    } else if (query.startsWith("goodnight") || query.startsWith("night")) {
        if (isNight(settings.timezone)) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, goodni[Math.floor(Math.random() * goodni.length)]);
            sendMessageOnly(api, event, "🥰😴");
        } else {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + ".");
        }
        return true;
    } else if (query.startsWith("goodafter") || query.startsWith("afternoon")) {
        if (isAfternoon(settings.timezone)) {
            reactMessage(api, event, ":love:");
            sendMessage(api, event, goodaf[Math.floor(Math.random() * goodaf.length)]);
            sendMessageOnly(api, event, "🥰😇");
        } else {
            sendMessageOnly(api, event, "It's currently " + formateDate(settings.timezone) + " in the " + getDayNightTime(settings.timezone) + ".");
        }
        return true;
    }
    return false;
}

function parseImage(api, event, url, dir) {
    log("parse_image " + url);
    request(encodeURI(url)).pipe(fs.createWriteStream(dir))
        .on('finish', () => {
            let limit = 25 * 1024 * 1024;
            fs.readFile(dir, function(err, data) {
                if (err) log(err)
                if (data.length > limit) {
                    sendMessage(api, event, "Unfortunately i cannot send you the file due to the size restrictions on messenger platform.");
                } else {
                    let image = {
                        attachment: fs.createReadStream(dir)
                    };
                    sendMessage(api, event, image);
                }
                unLink(dir);
            })
        })
}

async function sendMessage(api, event, message) {
    let sendTyping = api.sendTypingIndicator(event.threadID, (err) => {
        if (err) log(err);
        log("send_typing");
        sendTyping();
    });
    if (!vips.includes(event.senderID)) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)]);
        }
    }
    api.getThreadInfo(event.threadID, (err, gc) => {
        if (err) return log(err);
        if (gc.isGroup) {
            let ts = undefined;
            api.getThreadHistory(event.threadID, 3, ts, (err, history) => {
                if (err) return log(err);
                if (ts != undefined) history.pop();
                let test = [];
                for (let i = 0; i < history.length; i++) {
                    if (history[i].senderID != getMyId()) {
                        test[i] = history[i].senderID;
                        log(test[i])
                    } else {
                        test[i] = undefined;
                    }
                }
                let filtered = test.filter(elm => elm);
                if (filtered[0] != filtered[1]) {
                    log("send_message_reply " + event.threadID + " " + message);
                    api.sendMessage(message, event.threadID, (err, messageInfo) => {
                        if (err) log(err);
                    }, event.messageID);
                } else {
                    log("send_message " + event.threadID + " " + message);
                    api.sendMessage(message, event.threadID, (err, messageInfo) => {
                        if (err) log(err);
                    });
                }
                ts = history[0].timestamp;
            });
        } else {
            log("send_message " + event.threadID + " " + message);
            api.sendMessage(message, event.threadID, (err, messageInfo) => {
                if (err) log(err);
            });
        }
    });
}

async function sendMessageOnly(api, event, message) {
    let sendTyping = api.sendTypingIndicator(event.threadID, (err) => {
        if (err) log(err);
        log("send_typing");
        sendTyping();
    });
    if (!vips.includes(event.senderID)) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)]);
        }
    }
    log("send_message " + event.threadID + " " + message);
    api.sendMessage(message, event.threadID, (err, messageInfo) => {
        if (err) log(err);
    });
}

async function reactMessage(api, event, reaction) {
    let sendTyping = api.sendTypingIndicator(event.threadID, (err) => {
        if (err) log(err);
        log("send_typing");
        sendTyping();
    });
    if (!vips.includes(event.senderID)) {
        if (settings.onDelay) {
            await wait(sleep[Math.floor(Math.random() * sleep.length)]);
        }
    }
    log("react_message " + event.messageID + " " + reaction);
    api.setMessageReaction(reaction, event.messageID, (err) => {
        if (err) log(err);
    });
}

function formatQuery(string) {
    let str = string.replace(pictographic, '');
    return str.replace(latinC, '');
}

function log(data) {
    console.log(getFormattedDate() + "$ " + data);
}

function getFormattedDate() {
    return new Date().toLocaleString("en-US", {
        timeZone: "Asia/Singapore"
    }).replace(",", "");
}

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.indexOf(substring) != -1) {
            return true;
        }
    }
    return false;
}

function isGoingToFast(event) {
    log("event_body " + event.senderID + " " + event.body);
    if (!settings.preventSimultaneousExecution) {
        return false;
    }
    if (!(vips.includes(event.senderID))) {
        if (!(event.senderID in cmd)) {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (10);
            return false;
        } else if (Math.floor(Date.now() / 1000) < cmd[event.senderID]) {
            log("The user " + event.senderID + " is going to fast of executing commands >> " +
                Math.floor((cmd[event.senderID] - Math.floor(Date.now() / 1000)) / 10) + " mins and " +
                (cmd[event.senderID] - Math.floor(Date.now() / 1000)) % 10 + " seconds");
            return true;
        } else {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (10);
            return false;
        }
    }
    return false;
}

function isGoingToFastResendingOfEmo(event) {
    if (!(event.threadID in emo)) {
        emo[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 2);
        return false;
    } else if (Math.floor(Date.now() / 1000) < emo[event.threadID]) {
        log("The user " + event.threadID + " is going to fast of sending emoji >> " +
            Math.floor((emo[event.threadID] - Math.floor(Date.now() / 1000)) / 60 * 2) + " mins and " +
            (emo[event.threadID] - Math.floor(Date.now() / 1000)) % 60 * 2 + " seconds");
        return true;
    } else {
        emo[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 2);
        return false;
    }
}

function isGoingToFastCallingTheCommand(event) {
    if (!(event.threadID in threadMaintenance)) {
        threadMaintenance[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 5);
        return false;
    } else if (Math.floor(Date.now() / 1000) < threadMaintenance[event.threadID]) {
        log("The user " + event.threadID + " is going to fast of calling the command >> " +
            Math.floor((threadMaintenance[event.threadID] - Math.floor(Date.now() / 1000)) / 60 * 5) + " mins and " +
            (threadMaintenance[event.threadID] - Math.floor(Date.now() / 1000)) % 60 * 5 + " seconds");
        return true;
    } else {
        threadMaintenance[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 5);
        return false;
    }
}

function repeatOfNonWWW(event) {
    if (!(event.threadID in nwww)) {
        nwww[event.threadID] = Math.floor(Date.now() / 1000) + (60);
        return false;
    } else if (Math.floor(Date.now() / 1000) < nwww[event.threadID]) {
        log("The user " + event.threadID + " is going to fast of calling the command >> " +
            Math.floor((nwww[event.threadID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " +
            (nwww[event.threadID] - Math.floor(Date.now() / 1000)) % 60 + " seconds");
        return true;
    } else {
        nwww[event.threadID] = Math.floor(Date.now() / 1000) + (60);
        return false;
    }
}

function isGoingToFastReporting(api, event) {
    if (!(event.threadID in userWhoSendDamnReports)) {
        userWhoSendDamnReports[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 10);
        return false;
    } else if (Math.floor(Date.now() / 1000) < userWhoSendDamnReports[event.threadID]) {
        let min = Math.floor((userWhoSendDamnReports[event.threadID] - Math.floor(Date.now() / 1000)) / 60 * 10);
        let sec = (userWhoSendDamnReports[event.threadID] - Math.floor(Date.now() / 1000)) % 60 * 10;
        sendMessage(api, event, "Please wait " + min + " min and " + sec + " seconds before sending another report.");
        return true;
    } else {
        userWhoSendDamnReports[event.threadID] = Math.floor(Date.now() / 1000) + (60 * 10);
        return false;
    }
}

let download = async function(uri, filename, callback) {
    log("download " + uri);
    await request(encodeURI(uri)).pipe(fs.createWriteStream(filename)).on('close', callback);
};

const checkFound = (text) => {
    return text ? text : "unknown"
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
    log("response_data " + url);
    await wait(1000);
    let data = await axios.get(encodeURI(url)).then((response) => {
        if (response.data.error === undefined) {
            return response.data;
        } else {
            log("response_null " + url);
            return null;
        }
    }).catch((err) => {
        log("response_data_err " + err)
        return null
    });
    return data
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

function countVowel(str) {
    const count = str.match(/[aeiou]/gi).length;
    return count;
}

function countConsonants(str) {
    var countConsonants = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] !== "a" && str[i] !== "e" && str[i] !== "i" &&
            str[i] !== "o" && str[i] !== "u" && str[i] !== " ") {
            countConsonants++;
        }
    }
    return (countConsonants);
}

function nsfw(text) {
    return (text.includes("jabol") || text.includes("nude") || text.includes("hentai") || text.includes("milf") ||
        text.includes("masturbate") || text.includes("pussy") || text.includes("dick") || text.includes("horny") ||
        text.includes("blowjob") || text.includes("lolli ") || text.includes("sex ")) && !settings.onNsfw;
}

function getProfilePic(id) {
    return "https://graph.facebook.com/" + id + "/picture?access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
}

function getProfilePicFullHD(id) {
    return "https://graph.facebook.com/" + id + "/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
}

function isMe(query) {
    return query.includes("melvin jones repol") || query.includes("melvin jones") || query.includes("melvin jones gallano repol") ||
        query.includes("mj") || query.includes("mrepol742");
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
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
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
    return new Date(new Date().toLocaleString("en-US", {
        timeZone: tz
    }))
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

function otherQ(query) {
    for (let i = 0; i < sqq.length; i++) {
        if (query.startsWith(sqq[i] + " ") && query.split(" ").length > 2 ||
            (query.endsWith("?") || query.endsWith("!") || query.endsWith("."))) {
            return true;
        }
    }
    return false;
}

function isMyId(id) {
    return id == "100071743848974" || id == "100016029218667";
}

function getMyId() {
    return "100071743848974";
}

function getWelcomeImage(name, gname, Tmem, id) {
    return "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + name + "&text2=" + gname + "&text3=" + getSuffix(Tmem) + " member&avatar=" + getProfilePic(id)
}

async function getImages(api, event, images) {
    let time = getTimestamp();
    for (let i = 0;
        (i < 6 && i < images.length); i++) {
        await wait(1000);
        request(encodeURI(images[i].url)).pipe(fs.createWriteStream(__dirname + "/cache/images/findimg" + i + "_" + time + ".png"))
    }
    await wait(1000);
    let message = {
        attachment: [
            fs.createReadStream(__dirname + "/cache/images/findimg0_" + time + ".png"),
            fs.createReadStream(__dirname + "/cache/images/findimg1_" + time + ".png"),
            fs.createReadStream(__dirname + "/cache/images/findimg2_" + time + ".png"),
            fs.createReadStream(__dirname + "/cache/images/findimg3_" + time + ".png"),
            fs.createReadStream(__dirname + "/cache/images/findimg4_" + time + ".png"),
            fs.createReadStream(__dirname + "/cache/images/findimg5_" + time + ".png")
        ]
    };
    api.sendMessage(message, event.threadID, (err, messageInfo) => {
        if (err) {
            log(err);
            sendMessage(api, event, "Seem's like i am having an issue finding your query.");
        }
        unLink(__dirname + "/cache/images/findimg0_" + time + ".png")
        unLink(__dirname + "/cache/images/findimg1_" + time + ".png")
        unLink(__dirname + "/cache/images/findimg2_" + time + ".png")
        unLink(__dirname + "/cache/images/findimg3_" + time + ".png")
        unLink(__dirname + "/cache/images/findimg4_" + time + ".png")
        unLink(__dirname + "/cache/images/findimg5_" + time + ".png")
    }, event.messageID)
}

async function unLink(dir) {
    await wait(60000);
    fs.unlink(dir, (err => {
        if (err) log(err);
        else {
          log("un_link " + dir);
        }
    }));
}

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
    let h = Math.floor(e / 3600).toString().padStart(2, '0');
    let m = Math.floor(e % 3600 / 60).toString().padStart(2, '0');
    let s = Math.floor(e % 60).toString().padStart(2, '0');
    if (h != "00") {
        return h + 'h' + m + 'm and ' + s + 's';
    } else if (m != "00") {
        return m + 'm and ' + s;
    }
    return s + 's'
}

function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function removeUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    api.removeUserFromGroup(id, event.threadID, (err) => {
        if (err) log(err);
        log("user_remove " + event.threadID + " " + id);
    });
}

function blockUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    blockRRR.push(id);
    sendMessage(api, event, "The user " + id + " is blocked.");
    fs.writeFileSync("cache/block_users.json", JSON.stringify(blockRRR), "utf8");
}

function blockGroup(api, event, id) {
    blockSSS.push(id);
    sendMessage(api, event, "The group " + id + " is blocked.");
    fs.writeFileSync("cache/block_groups.json", JSON.stringify(blockSSS), "utf8");
}

function unblockGroup(api, event, id) {
    blockSSS = blockSSS.filter(item => item !== id);
    sendMessage(api, event, "The group " + id + " can now use the commands.");
    fs.writeFileSync("cache/block_groups.json", JSON.stringify(blockSSS), "utf8");
}


function enableSmartReply(api, event, id) {
    smartRRR.push(id);
    sendMessage(api, event, "Smart Reply is turn on for thread " + id);
    fs.writeFileSync("cache/smart_reply.json", JSON.stringify(smartRRR), "utf8");
}

function disableSmartReply(api, event, id) {
    smartRRR = smartRRR.filter(item => item !== id);
    sendMessage(api, event, "Smart Reply is turn off for thread " + id);
    fs.writeFileSync("cache/smart_reply.json", JSON.stringify(smartRRR), "utf8");
}

function unblockUser(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    blockRRR = blockRRR.filter(item => item !== id);
    sendMessage(api, event, "The user " + id + " can now use the commands.");
    fs.writeFileSync("cache/block_users.json", JSON.stringify(blockRRR), "utf8");
}

function addAdmin(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (vips.includes(id)) {
        sendMessage(api, event, "Admin permission is already granted.");
        return;
    }
    vips.push(id);
    sendMessage(api, event, "Admin permission granted.");
    fs.writeFileSync("cache/admin.json", JSON.stringify(vips), "utf8");
}

function remAdmin(api, event, id) {
    if (isMyId(id)) {
        return;
    }
    if (!vips.includes(id)) {
        sendMessage(api, event, "The user has no admin rights to take away.");
        return;
    }
    vips = vips.filter(item => item !== id);
    sendMessage(api, event, "Admin permission removed.");
    fs.writeFileSync("cache/admin.json", JSON.stringify(vips), "utf8");
}

function changeNickname(api, event, id, text) {
    if (isMyId(id)) {
        return;
    }
    api.getUserInfo(id, (err, info) => {
        if (err) return log(err);
        let name = info[id]['name'];
        let inp;
        if (text.startsWith("@me")) {
            inp = text.substring(4);
        } else {
            text.substring(name.length + 2);
        }
        api.changeNickname(inp, event.threadID, id, (err) => {
            if (err) return sendMessage(api, event, "Unfortunately there was an error occured while changing \"" + name + "\" nickname.");
        });
    })
}

function kiss(api, event, id) {
    getResponseData("https://api.satou-chan.xyz/api/endpoint/kiss").then((response) => {
        if (response == null) {
            sendMessage(api, event, "Unfortunately there was an error occured.");
        } else {
            api.getUserInfo(id, (err, info) => {
                if (err) return log(err);
                let name = info[id]['name'];
                let time = getTimestamp();
                request(encodeURI(response.url)).pipe(fs.createWriteStream(__dirname + "/cache/images/kiss_" + time + ".png"))
                    .on('finish', () => {
                        let image = {
                            body: "@" + name,
                            attachment: fs.createReadStream(__dirname + "/cache/images/kiss_" + time + ".png"),
                            mentions: [{
                                tag: '@' + name,
                                id: id,
                                fromIndex: 0
                            }]
                        };
                        sendMessage(api, event, image);
                        unLink(__dirname + "/cache/images/kiss_" + time + ".png");
                    })
            })
        }
    });
}

function gun(api, event, id) {
    /*
    request({ url: getProfilePicFullHD(id), followRedirect: false }, function (err, res, body) {
        console.log(encodeURIComponent(res.headers.location));
        parseImage(api, event, "https://api.popcat.xyz/gun?image=" + encodeURIComponent(res.headers.location), __dirname + "/cache/images/gun_" + getTimestamp() + ".png");
     });*/
    parseImage(api, event, "https://api.popcat.xyz/gun?image=" + getProfilePic(id), __dirname + "/cache/images/gun_" + getTimestamp() + ".png");
}

function wanted(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/wanted?image=" + getProfilePic(id), __dirname + "/cache/images/wanted_" + getTimestamp() + ".png");
}

function clown(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/clown?image=" + getProfilePic(id), __dirname + "/cache/images/clown_" + getTimestamp() + ".png");
}

function drip(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/drip?image=" + getProfilePic(id), __dirname + "/cache/images/drip_" + getTimestamp() + ".png");
}

function communist(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/communist?image=" + getProfilePic(id), __dirname + "/cache/images/communist_" + getTimestamp() + ".png");
}

function advert(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/ad?image=" + getProfilePic(id), __dirname + "/cache/images/advert_" + getTimestamp() + ".png");
}

function uncover(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/uncover?image=" + getProfilePic(id), __dirname + "/cache/images/uncover_" + getTimestamp() + ".png");
}

function jail(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/jail?image=" + getProfilePic(id), __dirname + "/cache/images/jail_" + getTimestamp() + ".png");
}

function invert(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/invert?image=" + getProfilePic(id), __dirname + "/cache/images/invert_" + getTimestamp() + ".png");
}

function pet(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/pet?image=" + getProfilePic(id), __dirname + "/cache/images/pet_" + getTimestamp() + ".png");
}

function mnm(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/mnm?image=" + getProfilePic(id), __dirname + "/cache/images/mnm_" + getTimestamp() + ".png");
}

function greyscale(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/greyscale?image=" + getProfilePic(id), __dirname + "/cache/images/greyscale_" + getTimestamp() + ".png");
}

function jokeover(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/jokeoverhead?image=" + getProfilePic(id), __dirname + "/cache/images/jokeover_" + getTimestamp() + ".png");
}

function blur(api, event, id) {
    parseImage(api, event, "https://api.popcat.xyz/blur?image=" + getProfilePic(id), __dirname + "/cache/images/blur_" + getTimestamp() + ".png");
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function welcomeUser(api, event, name, gname, Tmem, id) {
    let time = getTimestamp();
    request(encodeURI(getWelcomeImage(name, gname, Tmem, id))).pipe(fs.createWriteStream(__dirname + "/cache/images/welcome_" + time + ".jpg"))
        .on('finish', () => {
            let message = {
                body: "Welcome @" + name + ".\n\nI'm Mj, How are you? If you needed assistance you can call me for list of commands type cmd. \n⦿ About    ⦿ License\n⦿ Copyright ⦿ cmd",
                attachment: fs.createReadStream(__dirname + "/cache/images/welcome_" + time + ".jpg"),
                mentions: [{
                    tag: name,
                    id: id
                }]
            };
            sendMessageOnly(api, event, message);
            unLink(__dirname + "/cache/images/welcome_" + time + ".jpg");
        })
}

function byebyeUser(api, event, name, gname, Tmem, id) {
    let time = getTimestamp();
    let filename = __dirname + "/cache/images/byebye_" + time + ".jpg";
    let url = "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + name + "&text2=" + gname + "&text3=" + Tmem + " Member&avatar=" + getProfilePic(id);
    request(encodeURI(url)).pipe(fs.createWriteStream(filename))
        .on('finish', () => {
            let message = {
                body: "Thank you for joining @" + name + " but now you're leaving us.",
                attachment: fs.createReadStream(filename),
                mentions: [{
                    tag: name,
                    id: id
                }]
            };
            sendMessageOnly(api, event, message);
            log("leave_member " + name);
            unLink(filename);
        })
}

function cdfNormal(x, mean, standardDeviation) {
    return (1 - mathjs.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2
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

function saveEvent(event) {
    if (event.attachments.length != 0) {
        switch (event.attachments[0].type) {
            case "photo":
                msgs[event.messageID] = ['photo', event.attachments[0].url]
                for (let i = 0; i < 25; i++) {
                    if (!(event.attachments[i] === undefined)) {
                        log("photo_" + i + " " + event.attachments[i].url);
                    }
                }
                /*

                let images = [];
                for (let i = 0; i < 25; i++) {
                    if (!(event.attachments[i].url === undefined)) {
                        images[i] = event.attachments[i].url;
                        log("photo_" + i + " " + event.attachments[i].url);
                    }
                }
                msgs[event.messageID] = ['photo', images];
                */
                break;
            case "animated_images":
                msgs[event.messageID] = ['animated_images', event.attachments[0].url]
                break;
            case "sticker":
                msgs[event.messageID] = ['sticker', event.attachments[0].url]
                break;
            case "video":
                msgs[event.messageID] = ['video', event.attachments[0].url]
                break;
            case "audio":
                msgs[event.messageID] = ['audio', event.attachments[0].url]
                break;
        }
    } else {
        msgs[event.messageID] = event.body;
    }
}