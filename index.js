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

const express = require('express');
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
const dns = require("dns");
const ping = require('ping');

const pictographic = /\p{Extended_Pictographic}/ug;
const latinC = /[^a-z0-9\s]/gi;
const port = process.env.PORT || 6000;

let sleep = [4000, 3000, 5000, 4500, 6000, 5500, 3300, 4400, 5050, 4000, 5000, 6500, 4500, 3600];
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
let example = ["For instance:", "For example:", "Like:", "Suppose that:", "e.g:", "In particular:", "To give you an idea:", "Let's say:", "Example:"];
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
let cmd1 = {};
let emo = {};
let threadMaintenance = {};
let userWhoSendDamnReports = {};
let nwww = {};
let messagesD = "N/A";
let fb_stateD = "N/A";
let err400 = 0;

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
help += "\n⦿ dictionary [text]";
help += "\n⦿ say [text]";
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
help2 += "\n⦿ lovetest [name1]: [name2]";
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
help5 += "\n⦿ uptime";
help5 += "\n⦿ summ [text]";
help5 += "\n⦿ anime [category]";
help5 += "\n   waifu, megumin, bully, cuddle";
help5 += "\n   hug, awoo, kiss, lick";
help5 += "\n   pat, smug, bonk, yeet";
help5 += "\n   blush, smile, wave, highfive";
help5 += "\n   handhold, nom, biteglomp, slap";
help5 += "\n   kill, kick, happy, wink";
help5 += "\n   pokedance, cringe, cry, etc..";

let help6 = "\n⦿ conan";
help6 += "\n⦿ addUser [uid]";
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
help6 += "\n⦿ smartReply [on|off]";
help6 += "\n⦿ gcolor [theme]";
help6 += "\n   DefaultBlue, HotPink, AquaBlue, BrightPurple";
help6 += "\n   CoralPink, Orange, Green, LavenderPurple";
help6 += "\n   Red, Yellow, TealBlue, Aqua";
help6 += "\n   Mango, Berry, Citrus, Candy";
help6 += "\n⦿ anime --nsfw [category]";

let help7 = "\n⦿ animecouples";
help7 += "\n⦿ cosplay";
help7 += "\n⦿ motor";
help7 += "\n⦿ darkjoke";
help7 += "\n⦿ blackpink";
help7 += "\n⦿ hololive";
help7 += "\n⦿ mute";
help7 += "\n⦿ unmute";
help7 += "\n⦿ tagalogSupport [on/off]";
help7 += "\n⦿ textToSpeech [on/off]";

let helpadmin = "\n⦿ unsend";
helpadmin += "\n⦿ unsend [on|off]";
helpadmin += "\n⦿ delay [on|off]";
helpadmin += "\n⦿ nsfw [on|off]";
helpadmin += "\n⦿ debug [on|off]";
helpadmin += "\n⦿ antiLeave [on|off]";
helpadmin += "\n⦿ simultaneousExecution [on/off]";
helpadmin += "\n⦿ clearCache";
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
helpadmin += "\n⦿ setPrefix [prefix]";
helpadmin += "\n⦿ remPrefix";
helpadmin += "\n⦿ ignore [prefix]";

let helproot = "\n⦿ stop";
helproot += "\n⦿ resume";
helproot += "\n⦿ restart";
helproot += "\n⦿ notify";
helproot += "\n⦿ refreshGroup";
helproot += "\n⦿ setMaxImage [integer]";
helproot += "\n⦿ setTimezone [timezone]";
helproot += "\n⦿ setTextComplextion [complextion]"
helproot += "\n⦿ setMaxTokens [integer]";
helproot += "\n⦿ setTemperature [integer]";
helproot += "\n⦿ setFrequencyPenalty [integer]";
helproot += "\n⦿ setProbabilityMass [integer]";

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

let settings = JSON.parse(fs.readFileSync(__dirname + "/settings.json", "utf8"));
let pinned = JSON.parse(fs.readFileSync(__dirname + "/pinned.json", "utf8"));
let vips = JSON.parse(fs.readFileSync(__dirname + "/admin.json", "utf8"));
let nonRRR = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf8"));
let blockRRR = JSON.parse(fs.readFileSync(__dirname + "/block_users.json", "utf8"));
let blockSSS = JSON.parse(fs.readFileSync(__dirname + "/block_groups.json", "utf8"));
let mutedRRR = JSON.parse(fs.readFileSync(__dirname + "/muted_users.json", "utf8"));
let msgs = JSON.parse(fs.readFileSync(__dirname + "/msgs.json", "utf8"));
let smartRRR = JSON.parse(fs.readFileSync(__dirname + "/smart_reply.json", "utf8"));
let ipaddress = JSON.parse(fs.readFileSync(__dirname + "/ip_address.json", "utf8"));
let unsend_msgs = JSON.parse(fs.readFileSync(__dirname + "/unsend_msgs.json", "utf8"));
let group = JSON.parse(fs.readFileSync(__dirname + "/group.json", "utf8"));
let ignoredPrefix = JSON.parse(fs.readFileSync(__dirname + "/ignored_prefixes.json", "utf8"));
let speech = JSON.parse(fs.readFileSync(__dirname + "/speech.json", "utf8"));
let restart = JSON.parse(fs.readFileSync(__dirname + "/restart.json", "utf8"));

const app = express();
const config = new Configuration({
    apiKey: apiKey[4],
});
const openai = new OpenAIApi(config);

app.get('/', (req, res) => res.send("Project Orion ONLINE"));

app.listen(port, () =>
    log(`Project Orion ONLINE`)
);

dns.resolve4("project-orion.mrepol742.repl.co", (err, addresses) => {
    if (err) {
        log(err);
        return;
    }
    log("url https://project-orion.mrepol742.repl.co");
    if (ipaddress.length == 0) {
        ipaddress.push(addresses[0]);
        fs.writeFileSync(__dirname + "/ip_address.json", JSON.stringify(ipaddress), "utf8");
        log("new_ip_address " + addresses[0]);
    } else if (ipaddress.includes(addresses[0])) {
        log("ip_address " + addresses[0]);
    } else {
        ipaddress.push(addresses[0]);
        fs.writeFileSync(__dirname + "/ip_address.json", JSON.stringify(ipaddress), "utf8");
        log("ip_changes_to_address " + addresses[0]);
    }
});

process.on('beforeExit', (code) => {
    log('process_before_exit ' + code);
});

process.on('exit', (code) => {
    log('process_exit ' + code);
});

process.on('SIGINT', function() {
    log("\n\n\tCaught interrupt signal\n\tProject Orion OFFLINE");
    fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
    fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
    process.exit();
});

login({
    appState: JSON.parse(fs.readFileSync(__dirname + "/app_state.json", "utf8"))
}, (err, api) => {
    if (err) return log(err);

    process.on('uncaughtException', (err, origin) => {
        let a = `caught_exception ${err}\n` +
            `exception_origin ${origin}`;
        log(a);
        api.sendMessage(a, getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
    });

    process.on('unhandledRejection', (reason, promise) => {
        let a = 'unhandled_rejection ' + promise + ' reason ' + reason;
        log(a);
        api.sendMessage(a, getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
    });

    cron.schedule('*/10 * * * *', () => {
        log("save_state");
        fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
        messagesD = getFormattedDate();
    },
    {
        scheduled: true,
        timezone: "Asia/Manila"
    });

    cron.schedule('0 * * * *', () => {
        fs.writeFileSync(__dirname + "/app_state.json", JSON.stringify(api.getAppState()), "utf8");
        api.sendMessage("Project Orion Facebook State Refreshed", getMyId(), (err, messageInfo) => {
            if (err) log(err);
        })
        fb_stateD = getFormattedDate();
        log("fb_save_state")
    },
    {
        scheduled: true,
        timezone: "Asia/Manila"
    });

    api.setOptions({
        listenEvents: true,
        selfListen: true,
        online: true
    });

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return log(err);

        if (event.body == null && !(typeof event.body === "string") && !(event.type == "message_unsend" || event.type == "event")) {
            return;
        }

        if (event.type == "message" || (event.type == "message_reply" && (event.senderID != getMyId() || event.messageReply.senderID != getMyId()))) {
            if (event.body == "unblockgroup") {
                if (vips.includes(event.senderID)) {
                    api.getThreadInfo(event.threadID, (err, gc) => {
                        if (err) return log(err);
                        if (gc.isGroup) {
                            unblockGroup(api, event, event.threadID);
                        } else {
                            sendMessage(api, event, "Unfortunately this is a personal chat and not a group chat.");
                        }
                    });
                }
            } else if (event.body == "unmute") {
                if (mutedRRR.includes(event.senderID)) {
                    sendMessage(api, event, "The user is not blocked.");
                    mutedRRR = mutedRRR.filter(item => item !== event.senderID);
                    sendMessage(api, event, "You can now use my commands.");
                    fs.writeFileSync(__dirname + "/muted_users.json", JSON.stringify(mutedRRR), "utf8");
                }
            } else if ((blockRRR.includes(event.senderID) || blockSSS.includes(event.threadID) || mutedRRR.includes(event.senderID)) && 
            (event.type == "message" || event.type == "message_reply")) {
                saveEvent(event);
                return;
            } 
            /*
            else {
                let ttb = event.body;
                var result = ignoredPrefix.filter(option => ttb.startsWith(option.name));
                if (ttb.startsWith(result)) {
                    log("blocked " + result);
                    return;
                }
            }*/
        }
        if (event.senderID == getMyId() && (event.type == "message" || event.type == "message_reply")) {
            let body = event.body;
            if (!body.startsWith("_")) {
                return;
            } else {
                event.body = body.slice(1);
          }
        }

        if ((event.type == "message" || event.type == "message_reply")) {
            if (isMyId(event.senderID)) {
                if (event.body == "stop") {
                    sendMessage(api, event, "Goodbye...");
                    settings.isStop = true;
                    return;
                } else if (event.body == "resume") {
                    sendMessage(api, event, "Hi i am back!");
                    settings.isStop = false;
                    return;
                } else if (event.body == "restart") {
                    sendMessage(api, event, "Hold on saving state is now in progress.");
                    fs.writeFileSync(__dirname + "/msgs.json", JSON.stringify(msgs), "utf8");
                    fs.writeFileSync(__dirname + "/unsend_msgs.json", JSON.stringify(unsend_msgs), "utf8");
                    fs.writeFileSync(__dirname + "/group.json", JSON.stringify(group), "utf8");
                    sendMessage(api, event, "Restarting program in 3 seconds.");
                    setTimeout(function () {
                        restart.push(event.threadID);
                        restart.push(event.messageID);
                        fs.writeFileSync(__dirname + "/restart.json", JSON.stringify(restart), "utf8");
                        process.on("exit", function () {
                            require("child_process").spawn(process.argv.shift(), process.argv, {
                                cwd: process.cwd(),
                                detached : true,
                                stdio: "inherit"
                            });
                        });
                        process.exit();
                    }, 3000);
                }
            }
        }

        if (event.type == "message" || event.type == "message_reply") {
            if (!(vips.includes(event.senderID))) {
                if (settings.crash) {
                    if (isGoingToFastCallingTheCommand(event)) {
                        return;
                    }
                    let message = {
                        body: "An internal issue has been detected the system is automatically placed under maintenance mode.",
                        attachment: fs.createReadStream(__dirname + '/assets/maintenance.jpg')
                    };
                    sendMessage(api, event, message);
                    return;
                } else if (settings.isDebugEnabled) {
                    if (isGoingToFastCallingTheCommand(event)) {
                        return;
                    }
                    let message = {
                        body: "Hold on a moment this system is currently under maintenance...I will be right back in few moments.",
                        attachment: fs.createReadStream(__dirname + '/assets/maintenance.jpg')
                    };
                    sendMessage(api, event, message);
                    return;
                } 
            } else if (settings.isStop) {
                return;
            }
        }

        switch (event.type) {
            case "message":
                saveEvent(event);
                ai(api, event, event.body);
                break;
            case "message_reply":
                saveEvent(event);
                ai(api, event, event.body);
                ai22(api, event, event.body);
                break;
            case "message_unsend":
                if (vips.includes(event.senderID)) {
                    break;
                }
                let d = msgs[event.messageID];
                if (d === undefined) {
                    log("unsend_undefined " + event.messageID);
                    break;
                }
                unsend_msgs[event.messageID] = d;
                let time = getTimestamp();
                api.getUserInfo(event.senderID, (err, data) => {
                    if (err) return log(err);
                    if (d[0] == "photo") {
                        unsendPhoto(api, event, d, data);
                    } else if (d[0] == "animated_images") {
                        unsendGif(api, event, d, data);
                    } else if (d[0] == "share") {   
                        let filename = __dirname + '/cache/images/unsend_share_' + time + '.png'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][3], function(gifResponse) {
                            gifResponse.pipe(file);
                            file.on('finish', function() {
                                if (settings.onUnsend && !threads.includes(event.threadID)) {
                                    let time = getTimestamp();
                                    api.getThreadInfo(event.threadID, (err, gc) => {
                                        if (err) return log(err);
                                        if (gc.isGroup) {
                                            let message = {
                                                body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[1][2],
                                                attachment: fs.createReadStream(filename),
                                                mentions: [{
                                                    tag: '@' + data[event.senderID]['name'],
                                                    id: event.senderID,
                                                    fromIndex: 0
                                                }]
                                            }
                                            sendMessageOnly(api, event, message);
                                            log("unsend_share_group " + d[1][0] + " " + filename);
                                        } else {
                                            let message = {
                                                body: "You deleted this url.\n\n" + d[1][2],
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(api, event, message);
                                            log("unsend_share " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "file") {   
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return log(err);
                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                api.getThreadInfo(event.threadID, (err, gc) => {
                                    if (err) return log(err);
                                    if (gc.isGroup) {
                                        let message = {
                                            body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[1][2] + "\n" + d[1][3],
                                            mentions: [{
                                                tag: '@' + data[event.senderID]['name'],
                                                id: event.senderID,
                                                fromIndex: 0
                                            }]
                                        }
                                        sendMessageOnly(api, event, message);
                                        log("unsend_file_group " + d[0] + " " + message);
                                    } else {
                                        let message = "You deleted the following.\n\n" + d[1][2] + "\n" + d[1][3];
                                        sendMessageOnly(api, event, message);
                                        log("unsend_file " + d[0] + " " + message);
                                    }
                                });
                            }
                        });
                    } else if (d[0] == "location") {
                        sendMessageOnly(api, event, "Unsupported action. Please wait a while.");
                    } else if (d[0] == "sticker") {
                        let filename = __dirname + '/cache/images/unsend_sticker_' + time + '.png';
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
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
                                            log("unsend_sticker_group " + d[1][0] + " " + filename);
                                        } else {
                                            let message = {
                                                body: "You deleted this sticker.\n",
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(api, event, message);
                                            log("unsend_sticker " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "video") {
                        let filename = __dirname + '/cache/videos/unsend_video_' + time + '.mp4'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
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
                                            log("unsend_video_group " + d[1][0] + " " + filename);
                                        } else {
                                            let message = {
                                                body: "You deleted this video.\n",
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(api, event, message);
                                            log("unsend_video " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else if (d[0] == "audio") {
                        let filename = __dirname + '/cache/audios/unsend_audio_' + time + '.mp3'
                        let file = fs.createWriteStream(filename);
                        let gifRequest = http.get(d[1][2], function(gifResponse) {
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
                                            log("unsend_audio_group " + d[1][0] + " " + filename);
                                        } else {
                                            let message = {
                                                body: "You deleted this voice message.\n",
                                                attachment: fs.createReadStream(filename)
                                            }
                                            sendMessageOnly(api, event, message);
                                            log("unsend_audio " + d[1][0] + " " + filename);
                                        }
                                    });
                                    unLink(filename);
                                }
                            });
                        });
                    } else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return log(err);
                            if (settings.onUnsend && !threads.includes(event.threadID)) {
                                api.getThreadInfo(event.threadID, (err, gc) => {
                                    if (err) return log(err);
                                    if (gc.isGroup) {
                                        let message = {
                                            body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n\n" + d[2],
                                            mentions: [{
                                                tag: '@' + data[event.senderID]['name'],
                                                id: event.senderID,
                                                fromIndex: 0
                                            }]
                                        }
                                        sendMessageOnly(api, event, message);
                                        log("unsend_message_group " + d[0] + " " + message);
                                    } else {
                                        let message = "You deleted the following.\n\n" + d[2];
                                        sendMessageOnly(api, event, message);
                                        log("unsend_message " + d[0] + " " + message);
                                    }
                                });
                            }
                        });
                    }
                });
                break;
            case "event":
                switch (event.logMessageType) {
                    case "log:subscribe":
                        if (event.logMessageData.addedParticipants[0].userFbId == getMyId()) {
                            sendMessageOnly("What sup guys!");
                            break;
                        }
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
                                    gret += " to the group.\n\nI'm Mj btw, How are you'll? If you guys needed assistance you can call me for list of commands type cmd. \n⦿ about     ⦿ license\n⦿ copyright ⦿ uptime";
                                } else {
                                    gret = "Welcome @" + names[0][1] + ".\n\nI'm Mj, How are you? If you needed assistance you can call me for list of commands type cmd. \n⦿ about    ⦿ license\n⦿ copyright ⦿ uptime";
                                    log("new_member " + names[0][0] + " " + names[0][1])
                                }
                                let name = event.logMessageData.addedParticipants[0].fullName;
                                let id = event.logMessageData.addedParticipants[0].userFbId;
                                let arr = gc.participantIDs;
                                welcomeUser(api, event, name, gname, arr.length, id, gret);
                            }
                        })
                        break;
                    case "log:unsubscribe":
                        let id = event.logMessageData.leftParticipantFbId;
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (err) log(err);
                            api.getUserInfo(parseInt(id), (err, data) => {
                                if (err) return log(err);
                                for (let prop in data) { 
                                    if (data.hasOwnProperty(prop) && data[prop].name) {
                                        let gcn = gc.threadName;
                                        let arr = gc.participantIDs;
                                        if (settings.antiLeave) {
                                            api.addUserToGroup(prop, event.threadID, (err) => {
                                                if (err) log(err);
                                                log("add_user " + event.threadID + " " + prop);
                                            });
                                        }
                                        byebyeUser(api, event, data[prop].name, gcn, arr.length, prop);
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

async function ai22(api, event, input) {
                let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                let query2 = formatQuery(input.toLowerCase());
                if (input == ".") {
                    if (event.messageReply.body != "") {
                      if (input.startsWith("_")) {
                        input = input.slice(1);
                      }
                        ai(api, event, event.messageReply.body);
                    }
                } else if (query == "notify") {
                    if (isMyId(event.senderID)) {
                        if (event.messageReply.body == "") {
                            sendMessage(api, event, "You need to reply notify to a message which is not empty to notify it to all group chats.");
                        } else {
                            sendMessageToAll(api, event.messageReply.body);
                        }
                    }
                } else if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                    if (vips.includes(event.senderID)) {
                        if (event.messageReply.senderID != getMyId()) {
                            sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                        } else {
                            api.unsendMessage(event.messageReply.messageID, (err) => {
                                if (err) log(err);
                            });
                        }
                    }
                } else if (query == "pinadd") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(api, event, "You need to reply pin add to a message which is not empty to pin it.");
                    } else {
                        pinned.pin.message[event.threadID] = event.messageReply.body
                        pinned.pin.sender[event.threadID] = event.messageReply.senderID
                        sendMessage(api, event, "Message pinned.. Enter \"pin\" to show it.");
                        fs.writeFileSync(__dirname + "/pinned.json", JSON.stringify(pinned), "utf8")
                    }
                } else if (query == "count") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(api, event, "You need to reply count to a message.");
                    } else {
                        sendMessage(api, event, "The words on this message is about " + countWords(event.messageReply.body) + ".");
                    }
                } else if (query == "countvowels") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(api, event, "You need to reply count --vowels to a message.");
                    } else {
                        sendMessage(api, event, "The vowels on this message is about " + countVowel(event.messageReply.body) + ".");
                    }
                } else if (query == "countconsonants") {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    if (event.messageReply.body == "") {
                        sendMessage(api, event, "You need to reply count --consonants to a message.");
                    } else {
                        sendMessage(api, event, "The consonants on this message is about " + countConsonants(event.messageReply.body) + ".");
                    }
                } else if (query.startsWith("wfind")) {
                    if (isGoingToFast(api, event)) {
                        return;
                    }
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nwfind my name")
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
                    if (isGoingToFast(api, event)) {
                        return;
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
                    if (isGoingToFast(api, event)) {
                        return;
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

async function ai(api, event, input) {
    let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
    let query2 = formatQuery(input.toLowerCase());
    if (nsfw(query)) {
        let message = {
            attachment: fs.createReadStream(__dirname + '/assets/fbi/fbi_' + Math.floor(Math.random() * 4) + '.jpg')
        };
        sendMessage(api, event, message);
        return;
    }
    if (!input.replace(pictographic, '').length) {
        if (!isGoingToFastResendingOfEmo(event)) {
            await wait(5000);
            sendMessageOnly(api, event, input);
            return;
        }
    }
    reaction(api, event, query, input);
    if (event.type == "message_reply" && event.messageReply.senderID != getMyId()) {
        return;
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
        } else if (query == "remove" || query == "unsent" || query == "delete" || query == "unsend") {
            sendMessage(api, event, "You need to reply to my message to unsend it.");
        }
    }
    if (query.startsWith("searchimg")) {
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using searchimg text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchimg melvin jones repol")
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
        if (isGoingToFast(api, event)) {
            return;
        }
        let data = input.split(" ");
        if (data.length < 2) {
            sendMessage(api, event, "Opps! I didnt get it. You should try using searchincog text instead." + "\n\n" + example[Math.floor(Math.random() * example.length)] + "\nsearchincog Who is Melvin Jones Repol")
        } else {

            data.shift()
            getResponseData('https://api.duckduckgo.com/?q=' + data.join(" ") + '&format=json&pretty=1').then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    log(JSON.stringify(response));
                    sendMessage(api, event, response.Abstract);
                }
            });
        }
    } else if ((settings.prefix != "" && input.startsWith(settings.prefix)) || query.startsWith("mj") ||
        query.startsWith("repol") || query.startsWith("mrepol742") || query.startsWith("melvinjonesrepol") || query.startsWith("melvinjones") || query.startsWith("melvinjonesgallanorepol") ||
        ((query.startsWith("search") || query.startsWith("gencode") || query.startsWith("what") || query.startsWith("when") || query.startsWith("who") || query.startsWith("where") ||
            query.startsWith("how") || query.startsWith("why") || query.startsWith("which"))) ||
        otherQ(query2) || (settings.tagalog && (query.startsWith("ano") || query.starstWith("bakit") || query.startsWith("saan") || query.startsWith("sino") || query.startsWith("kailan") || query.startsWith("paano")))) {

        if (isGoingToFast(api, event)) {
            return;
        }
        
        if ((settings.prefix != "" && input == settings.prefix) || query == "mj" || query == "repol" || query == "mrepol742" || query == "melvinjonesrepol" || query == "melvinjones") {
            if (!nonRRR.includes(event.senderID)) {
                let message = {
                    body: "Moshi moshi... \nHow can i help you? If you have any question don't hesitate to ask me. For list of commands type cmd.\nYou can ask on me like `What is matter` or by calling me `How to do _____` i would be grateful to help.\n⦿ about\n⦿ license\n⦿ copyright\n⦿ uptime\n\nhttps://project-orion.mrepol742.repl.co",
                    attachment: [fs.createReadStream(__dirname + "/assets/project-orion.gif")]
                }
                sendMessage(api, event, message);
                nonRRR.push(event.senderID);
                fs.writeFileSync(__dirname + "/users.json", JSON.stringify(nonRRR), "utf8");
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
                text = input.substring(3)￼••￼•￼
￼•￼
￼

