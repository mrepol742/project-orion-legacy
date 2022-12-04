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
const gis = require('g-i-s');

log("The Project Orion is now active and waiting for commands execution. ONLINE")

const testNetworkSpeed = new NetworkSpeed();
const pictographic = /\p{Extended_Pictographic}/ug;
const latinC = /[^a-z0-9\s]/gi;

let sleep = [5000, 6000, 5500, 6500, 7000, 6800, 5800, 5200, 7200, 6600, 5200, 6300, 5400]
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "Me?", "yes?", "How are you?", "How you doing?", "wassup", "whats new?"];
let unsendMessage = ["deleted the following.", "unsent the following.", "tries to delete this message.", "removed a message that contains:", "remove a message.", "tries conceal this information."]
let idknow = ["Can you clarify what do you mean by that. It seems i have problems trying to understand what you want me to do.", "Please elaborate on what you mean by that. I seem to be struggling to comprehend what you want me to do.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do.", "Could you please elaborate on what you mean? Trying to grasp what you want me to accomplish seems to be a challenge for me.", "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do."]
let funD = ["🤣🤣🤣", "🤣", "😆😆", "😂😂🤣🤣", "😆😆🤣", "😂😆", "😆", "ahahaahh", "hahahahhah", "haahaaa", "ahhaa😂", "hhahahah😆", "🤣🤣hahaahhaha", "hahaa😆🤣"];
let mjme = ["Mj", "Melvin Jones Repol", "Melvin Jones Gallano Repol"]
let goodev = ["Good evening too... The sun set is so beautiful as always, hope you're seeing it too.", "Good evening, as well. As always, the sun set is quite lovely; I hope you can see it as well.", "Good evening as well... As always, the sun set is breathtaking; I hope you can see it too."]
let goodmo = ["Good morning too... Have a great day ahead, and always don't forget breakfast must be the heaviest meal of the day.", "Also good morning... Enjoy your day, and never forget that breakfast should always be the heaviest meal of the day.", "Greetings as well... Have a fantastic day, and never forget that breakfast ought to be the largest meal of the day."]
let goodni = ["Good night too... Have a nice and comfortable sleep, don't forget to wakeup early.", "Good night, as well. Sleep well and comfortably, and remember to get up early.", "Also good night. Enjoy a restful night's sleep, and remember to get up early."]
let goodaf = ["Good afternoon too... It's quite hot now.. Always remember to stay hydrated.", "Also good afternoon... Right now it's very hot. Never forget to drink plenty of water.", "Good afternoon, as well. Now that it's hot, Keep in mind to drink plenty of water."]
let tips = ["Be detailed but brief", "Ask me like Who are you?", "Ask me like How to do this?"]
let sqq = ["in", "having", "an", "do", "does", "with", "are", "was", "the", "as far", "can you", "a", "did", "give", "example", "these", "those", "on", "is", "if", "for", "about", "gave", "there", "describe"];
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let happyEE = ['haha', 'ahah', 'ahha', 'funny ', 'insane ', 'lol', 'lmao', 'lmfao', 'silly ', 'laugh ', 'laughable', 'humorous', 'amusing', 'hilarious', 'absurd', 'ridicolous', 'ludicrous', 'entertaining']
let sadEE = ['pain', 'painful', 'cry ', 'crying ', 'unhappy', 'sad ', 'tired', 'sick ', 'dejected', 'regretful', 'depressed', 'downcast', 'miserable ', 'downhearted', 'heartbroken', 'wretched', 'doleful', 'low-spirited', 'sorry', 'disgraceful', 'regrettable', 'sorrowful', 'upsetting', 'traumatic', 'truma', 'pitiful', 'depressing', 'depress', 'unfortunate', 'awful', 'miserable', 'grievous', 'cheerless'];
let angryEE = ['angry', 'irate', 'irritated', 'furious', 'raving', 'bitter', 'hostile', 'outraged', 'incensed', 'mad ', 'filthy', 'displeased', 'provoked', 'annoyed' , 'fury ', 'rage ', 'ire ', 'wrath']
let loveEE = ['love', 'liking', 'appreciation', 'thank', 'delight', 'pleasure', 'regards', 'respects', 'dear', 'darling', 'boyfriend', 'girlfriend', 'sweetheart', 'angel', 'honey', 'adore', 'treasure', 'prize', 'devotion', 'friend']
let sizesM = ["Bytes", "KB", "MB", "GB", "TB"]
let threads = ""
let threadIdMV = {};
let cmd = {};
let emo = {};
let threadMaintenance = {};
let nwww = {};

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

let timeZones =['Europe/Andorra','Asia/Dubai','Asia/Kabul','Europe/Tirane','Asia/Yerevan','Antarctica/Casey','Antarctica/Davis','Antarctica/DumontDUrville','Antarctica/Mawson','Antarctica/Palmer','Antarctica/Rothera','Antarctica/Syowa','Antarctica/Troll','Antarctica/Vostok','America/Argentina/Buenos_Aires','America/Argentina/Cordoba','America/Argentina/Salta','America/Argentina/Jujuy','America/Argentina/Tucuman','America/Argentina/Catamarca','America/Argentina/La_Rioja','America/Argentina/San_Juan','America/Argentina/Mendoza','America/Argentina/San_Luis','America/Argentina/Rio_Gallegos','America/Argentina/Ushuaia','Pacific/Pago_Pago','Europe/Vienna','Australia/Lord_Howe','Antarctica/Macquarie','Australia/Hobart','Australia/Currie','Australia/Melbourne','Australia/Sydney','Australia/Broken_Hill','Australia/Brisbane','Australia/Lindeman','Australia/Adelaide','Australia/Darwin','Australia/Perth','Australia/Eucla','Asia/Baku','America/Barbados','Asia/Dhaka','Europe/Brussels','Europe/Sofia','Atlantic/Bermuda','Asia/Brunei','America/La_Paz','America/Noronha','America/Belem','America/Fortaleza','America/Recife','America/Araguaina','America/Maceio','America/Bahia','America/Sao_Paulo','America/Campo_Grande','America/Cuiaba','America/Santarem','America/Porto_Velho','America/Boa_Vista','America/Manaus','America/Eirunepe','America/Rio_Branco','America/Nassau','Asia/Thimphu','Europe/Minsk','America/Belize','America/St_Johns','America/Halifax','America/Glace_Bay','America/Moncton','America/Goose_Bay','America/Blanc-Sablon','America/Toronto','America/Nipigon','America/Thunder_Bay','America/Iqaluit','America/Pangnirtung','America/Atikokan','America/Winnipeg','America/Rainy_River','America/Resolute','America/Rankin_Inlet','America/Regina','America/Swift_Current','America/Edmonton','America/Cambridge_Bay','America/Yellowknife','America/Inuvik','America/Creston','America/Dawson_Creek','America/Fort_Nelson','America/Vancouver','America/Whitehorse','America/Dawson','Indian/Cocos','Europe/Zurich','Africa/Abidjan','Pacific/Rarotonga','America/Santiago','America/Punta_Arenas','Pacific/Easter','Asia/Shanghai','Asia/Urumqi','America/Bogota','America/Costa_Rica','America/Havana','Atlantic/Cape_Verde','America/Curacao','Indian/Christmas','Asia/Nicosia','Asia/Famagusta','Europe/Prague','Europe/Berlin','Europe/Copenhagen','America/Santo_Domingo','Africa/Algiers','America/Guayaquil','Pacific/Galapagos','Europe/Tallinn','Africa/Cairo','Africa/El_Aaiun','Europe/Madrid','Africa/Ceuta','Atlantic/Canary','Europe/Helsinki','Pacific/Fiji','Atlantic/Stanley','Pacific/Chuuk','Pacific/Pohnpei','Pacific/Kosrae','Atlantic/Faroe','Europe/Paris','Europe/London','Asia/Tbilisi','America/Cayenne','Africa/Accra','Europe/Gibraltar','America/Godthab','America/Danmarkshavn','America/Scoresbysund','America/Thule','Europe/Athens','Atlantic/South_Georgia','America/Guatemala','Pacific/Guam','Africa/Bissau','America/Guyana','Asia/Hong_Kong','America/Tegucigalpa','America/Port-au-Prince','Europe/Budapest','Asia/Jakarta','Asia/Pontianak','Asia/Makassar','Asia/Jayapura','Europe/Dublin','Asia/Jerusalem','Asia/Kolkata','Indian/Chagos','Asia/Baghdad','Asia/Tehran','Atlantic/Reykjavik','Europe/Rome','America/Jamaica','Asia/Amman','Asia/Tokyo','Africa/Nairobi','Asia/Bishkek','Pacific/Tarawa','Pacific/Enderbury','Pacific/Kiritimati','Asia/Pyongyang','Asia/Seoul','Asia/Almaty','Asia/Qyzylorda','Asia/Qostanay','Asia/Aqtobe','Asia/Aqtau','Asia/Atyrau','Asia/Oral','Asia/Beirut','Asia/Colombo','Africa/Monrovia','Europe/Vilnius','Europe/Luxembourg','Europe/Riga','Africa/Tripoli','Africa/Casablanca','Europe/Monaco','Europe/Chisinau','Pacific/Majuro','Pacific/Kwajalein','Asia/Yangon','Asia/Ulaanbaatar','Asia/Hovd','Asia/Choibalsan','Asia/Macau','America/Martinique','Europe/Malta','Indian/Mauritius','Indian/Maldives','America/Mexico_City','America/Cancun','America/Merida','America/Monterrey','America/Matamoros','America/Mazatlan','America/Chihuahua','America/Ojinaga','America/Hermosillo','America/Tijuana','America/Bahia_Banderas','Asia/Kuala_Lumpur','Asia/Kuching','Africa/Maputo','Africa/Windhoek','Pacific/Noumea','Pacific/Norfolk','Africa/Lagos','America/Managua','Europe/Amsterdam','Europe/Oslo','Asia/Kathmandu','Pacific/Nauru','Pacific/Niue','Pacific/Auckland','Pacific/Chatham','America/Panama','America/Lima','Pacific/Tahiti','Pacific/Marquesas','Pacific/Gambier','Pacific/Port_Moresby','Pacific/Bougainville','Asia/Manila','Asia/Karachi','Europe/Warsaw','America/Miquelon','Pacific/Pitcairn','America/Puerto_Rico','Asia/Gaza','Asia/Hebron','Europe/Lisbon','Atlantic/Madeira','Atlantic/Azores','Pacific/Palau','America/Asuncion','Asia/Qatar','Indian/Reunion','Europe/Bucharest','Europe/Belgrade','Europe/Kaliningrad','Europe/Moscow','Europe/Simferopol','Europe/Kirov','Europe/Astrakhan','Europe/Volgograd','Europe/Saratov','Europe/Ulyanovsk','Europe/Samara','Asia/Yekaterinburg','Asia/Omsk','Asia/Novosibirsk','Asia/Barnaul','Asia/Tomsk','Asia/Novokuznetsk','Asia/Krasnoyarsk','Asia/Irkutsk','Asia/Chita','Asia/Yakutsk','Asia/Khandyga','Asia/Vladivostok','Asia/Ust-Nera','Asia/Magadan','Asia/Sakhalin','Asia/Srednekolymsk','Asia/Kamchatka','Asia/Anadyr','Asia/Riyadh','Pacific/Guadalcanal','Indian/Mahe','Africa/Khartoum','Europe/Stockholm','Asia/Singapore','America/Paramaribo','Africa/Juba','Africa/Sao_Tome','America/El_Salvador','Asia/Damascus','America/Grand_Turk','Africa/Ndjamena','Indian/Kerguelen','Asia/Bangkok','Asia/Dushanbe','Pacific/Fakaofo','Asia/Dili','Asia/Ashgabat','Africa/Tunis','Pacific/Tongatapu','Europe/Istanbul','America/Port_of_Spain','Pacific/Funafuti','Asia/Taipei','Europe/Kiev','Europe/Uzhgorod','Europe/Zaporozhye','Pacific/Wake','America/New_York','America/Detroit','America/Kentucky/Louisville','America/Kentucky/Monticello','America/Indiana/Indianapolis','America/Indiana/Vincennes','America/Indiana/Winamac','America/Indiana/Marengo','America/Indiana/Petersburg','America/Indiana/Vevay','America/Chicago','America/Indiana/Tell_City','America/Indiana/Knox','America/Menominee','America/North_Dakota/Center','America/North_Dakota/New_Salem','America/North_Dakota/Beulah','America/Denver','America/Boise','America/Phoenix','America/Los_Angeles','America/Anchorage','America/Juneau','America/Sitka','America/Metlakatla','America/Yakutat','America/Nome','America/Adak','Pacific/Honolulu','America/Montevideo','Asia/Samarkand','Asia/Tashkent','America/Caracas','Asia/Ho_Chi_Minh','Pacific/Efate','Pacific/Wallis','Pacific/Apia','Africa/Johannesburg'];

let help = "\n⦿ cmd";
help += "\n⦿ cmd [number]";
help += "\n⦿ cmd all";
help += "\n⦿ mj [text]";
help += "\n⦿ search [text]"
help += "\n⦿ searchincog [text]";
help += "\n⦿ searchimg [text]";
help += "\n⦿ pdf [text]";
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
help1 += "\n⦿ pin add";
help1 += "\n⦿ pin remove";
help1 += "\n⦿ sadcat [text]";
help1 += "\n⦿ biden [text]";
help1 += "\n⦿ pika [text]";
help1 += "\n⦿ god [text]";
help1 += "\n⦿ website [url]";
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
help2 += "\n⦿ meme --reddit";
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
help4 += "\n⦿ sip [text]";
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
help6 += "\n⦿ gcolor [theme]";
help6 += "\n   DefaultBlue, HotPink, AquaBlue, BrightPurple";
help6 += "\n   CoralPink, Orange, Green, LavenderPurple";
help6 += "\n   Red, Yellow, TealBlue, Aqua";
help6 += "\n   Mango, Berry, Citrus, Candy";
help6 += "\n⦿ anime --nsfw [category]";
help6 += "\n   waifu, neko, trap, blowjob";

let categorySFW = ['waifu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet',
    'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink',
    'poke', 'dance', 'cringe'
];

let categoryNSFW = ['waifu', 'neko', 'trap', 'blowjob'];

let helpadmin = "\n⦿ unsend";
helpadmin += "\n⦿ unsend on|off";
helpadmin += "\n⦿ delay on|off";
helpadmin += "\n⦿ nsfw on|off";
helpadmin += "\n⦿ enable on|off";
helpadmin += "\n⦿ debug on|off";
helpadmin += "\n⦿ sleep on|off";
helpadmin += "\n⦿ stop";
helpadmin += "\n⦿ refresh|reload";
helpadmin += "\n⦿ addAdmin @mention";
helpadmin += "\n⦿ remAdmin @mention";
helpadmin += "\n⦿ kickUser @mention";
helpadmin += "\n⦿ blockUser @mention";
helpadmin += "\n⦿ unblockUser @mention";
helpadmin += "\n⦿ preventSimultanoesExecution on/off";
helpadmin += "\n⦿ setPrefix [prefix]";
helpadmin += "\n⦿ remPrefix";
helpadmin += "\n⦿ setTimezone [timezone]";
helpadmin += "\n⦿ setTextComplextion [complextion]"
helpadmin += "\n⦿ setMaxTokens [integer]";
helpadmin += "\n⦿ setTemperature [integer]";
helpadmin += "\n⦿ setFrequencyPenalty [integer]";
helpadmin += "\n⦿ setProbabilityMass [integer]";

let apiKey = [
    // phub api key
    "CcIDaVqu",
    // graph for facebook access token
    "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662",
    // urban dictionary api key
    "bc23ad59e1mshdb14f6cce13bafap18cbc5jsn13348153e5cf",
    // nlpcloudclient summarize api key
    "5ab3c279e089139f63017eea409573731d5e8ce9",
     // open ai api key
    "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",

     "NMkYp5CF"
];

let domains = [".aaa", ".abb", ".abc", ".ac", ".aco", ".ad", ".ads", ".ae", ".aeg", ".af", ".afl", ".ag", ".ai", ".aig", ".al", ".am", ".anz", ".ao", ".aol", ".app", ".aq", ".ar", ".art", ".as", ".at", ".au", ".aw", ".aws", ".ax", ".axa", ".az", ".ba", ".bar", ".bb", ".bbc", ".bbt", ".bcg", ".bcn", ".bd", ".be", ".bet", ".bf", ".bg", ".bh", ".bi", ".bid", ".bio", ".biz", ".bj", ".bm", ".bms", ".bmw", ".bn", ".bo", ".bom", ".boo", ".bot", ".box", ".br", ".bs", ".bt", ".buy", ".bv", ".bw", ".by", ".bz", ".bzh", ".ca", ".cab", ".cal", ".cam", ".car", ".cat", ".cba", ".cbn", ".cbs", ".cc", ".cd", ".ceb", ".ceo", ".cf", ".cfa", ".cfd", ".cg", ".ch", ".ci", ".ck", ".cl", ".cm", ".cn", ".co", ".com", ".cpa", ".cr", ".crs", ".csc", ".cu", ".cv", ".cw", ".cx", ".cy", ".cz", ".dad", ".day", ".dds", ".de", ".dev", ".dhl", ".diy", ".dj", ".dk", ".dm", ".dnp", ".do", ".dog", ".dot", ".dtv", ".dvr", ".dz", ".eat", ".ec", ".eco", ".edu", ".ee", ".eg", ".er", ".es", ".esq", ".et", ".eu", ".eus", ".fan", ".fi", ".fit", ".fj", ".fk", ".fly", ".fm", ".fo", ".foo", ".fox", ".fr", ".frl", ".ftr", ".fun", ".fyi", ".ga", ".gal", ".gap", ".gay", ".gb", ".gd", ".gdn", ".ge", ".gea", ".gf", ".gg", ".gh", ".gi", ".gl", ".gle", ".gm", ".gmo", ".gmx", ".gn", ".goo", ".gop", ".got", ".gov", ".gp", ".gq", ".gr", ".gs", ".gt", ".gu", ".gw", ".gy", ".hbo", ".hiv", ".hk", ".hkt", ".hm", ".hn", ".hot", ".how", ".hr", ".ht", ".hu", ".ibm", ".ice", ".icu", ".id", ".ie", ".ifm", ".il", ".im", ".in", ".inc", ".ing", ".ink", ".int", ".io", ".iq", ".ir", ".is", ".ist", ".it", ".itv", ".jcb", ".jcp", ".je", ".jio", ".jll", ".jm", ".jmp", ".jnj", ".jo", ".jot", ".joy", ".jp", ".ke", ".kfh", ".kg", ".kh", ".ki", ".kia", ".kim", ".km", ".kn", ".kp", ".kpn", ".kr", ".krd", ".kw", ".ky", ".kz", ".la", ".lat", ".law", ".lb", ".lc", ".lds", ".li", ".lk", ".llc", ".llp", ".lol", ".lpl", ".lr", ".ls", ".lt", ".ltd", ".lu", ".lv", ".ly", ".ma", ".man", ".map", ".mba", ".mc", ".md", ".me", ".med", ".men", ".mg", ".mh", ".mil", ".mit", ".mk", ".ml", ".mlb", ".mls", ".mm", ".mma", ".mn", ".mo", ".moe", ".moi", ".mom", ".mov", ".mp", ".mq", ".mr", ".ms", ".msd", ".mt", ".mtn", ".mtr", ".mu", ".mv", ".mw", ".mx", ".my", ".mz", ".na", ".nab", ".nba", ".nc", ".ne", ".nec", ".net", ".new", ".nf", ".nfl", ".ng", ".ngo", ".nhk", ".ni", ".nl", ".no", ".now", ".np", ".nr", ".nra", ".nrw", ".ntt", ".nu", ".nyc", ".nz", ".obi", ".off", ".om", ".one", ".ong", ".onl", ".ooo", ".org", ".ott", ".ovh", ".pa", ".pay", ".pe", ".pet", ".pf", ".pg", ".ph", ".phd", ".pid", ".pin", ".pk", ".pl", ".pm", ".pn", ".pnc", ".pr", ".pro", ".pru", ".ps", ".pt", ".pub", ".pw", ".pwc", ".py", ".qa", ".qvc", ".re", ".red", ".ren", ".ril", ".rio", ".rip", ".ro", ".rs", ".ru", ".run", ".rw", ".rwe", ".sa", ".sap", ".sas", ".sb", ".sbi", ".sbs", ".sc", ".sca", ".scb", ".sd", ".se", ".ses", ".sew", ".sex", ".sfr", ".sg", ".sh", ".si", ".sj", ".sk", ".ski", ".sky", ".sl", ".sm", ".sn", ".so", ".soy", ".sr", ".srl", ".ss", ".st", ".stc", ".su", ".sv", ".sx", ".sy", ".sz", ".tab", ".tax", ".tc", ".tci", ".td", ".tdk", ".tel", ".tf", ".tg", ".th", ".thd", ".tj", ".tjx", ".tk", ".tl", ".tm", ".tn", ".to", ".top", ".tr", ".trv", ".tt", ".tui", ".tv", ".tvs", ".tw", ".tz", ".ua", ".ubs", ".ug", ".uk", ".uno", ".uol", ".ups", ".us", ".uy", ".uz", ".va", ".vc", ".ve", ".vet", ".vg", ".vi", ".vig", ".vin", ".vip", ".vn", ".vu", ".wed", ".wf", ".win", ".wme", ".wow", ".ws", ".wtc", ".wtf", ".xin", ".xxx", ".xyz", ".ye", ".you", ".yt", ".yun", ".za", ".zip", ".zm", ".zw"];

let settings = JSON.parse(fs.readFileSync("cache/settings.json", "utf8"));
let pinned = JSON.parse(fs.readFileSync("cache/pinned.json", "utf8"));
let vips = JSON.parse(fs.readFileSync("cache/admin.json", "utf8"));
let nonRRR = JSON.parse(fs.readFileSync("cache/users.json", "utf8"));
let saveAns = JSON.parse(fs.readFileSync("cache/answer.json", "utf8"));
let blockRRR = JSON.parse(fs.readFileSync("cache/block_users.json", "utf8"));
let mutedRRR = JSON.parse(fs.readFileSync("cache/muted_users.json", "utf8"));
let msgs = JSON.parse(fs.readFileSync("cache/msgs.json", "utf8"));

let gcolor = {"DefaultBlue": "196241301102133", "HotPink": "169463077092846", "AquaBlue": "2442142322678320", "BrightPurple": "234137870477637", "CoralPink": "980963458735625", "Orange": "175615189761153", "Green": "2136751179887052", "LavenderPurple": "2058653964378557", "Red": "2129984390566328", "Yellow": "174636906462322", "TealBlue": "1928399724138152", "Aqua": "417639218648241", "Mango": "930060997172551", "Berry": "164535220883264", "Citrus": "370940413392601", "Candy": "205488546921017"}
let gcolorn = ["DefaultBlue", "HotPink", "AquaBlue", "BrightPurple", "CoralPink", "Orange", "Green", "LavenderPurple", "Red", "Yellow", "TealBlue", "Aqua", "Mango", "Berry", "Citrus", "Candy"]

process.on('SIGINT', function() {
    log("\n\n\tCaught interrupt signal\n\tProject Orion OFFLINE");
    fs.writeFileSync("cache/answer.json", JSON.stringify(saveAns), "utf8");
    fs.writeFileSync("cache/msgs.json", JSON.stringify(msgs), "utf8");
    process.exit();
});

login({
    appState: JSON.parse(fs.readFileSync('fb.json', 'utf8'))
}, (err, api) => {
    if (err) return reportIssue(api, event.threadID, err);

    cron.schedule('*/10 * * * *', () => {
        let hours = date("Asia/Manila").getHours()
        let mins = date("Asia/Manila").getMinutes()
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        mins = mins < 10 ? '0' + mins : mins;
        log("Time Check " + hours + ":" + mins + " " + ampm);
        fs.writeFileSync("cache/answer.json", JSON.stringify(saveAns), "utf8");
        fs.writeFileSync("cache/msgs.json", JSON.stringify(msgs), "utf8");
    });
    
    cron.schedule('0 * * * *', () => {
        let A = api.getAppState();
        let B = JSON.stringify(A);
        fs.writeFileSync("fb.json", B, "utf8");
        api.sendMessage("Project Orion Facebook State Refreshed", getMyId())
        log("Project Orion Facebook State Refreshed")
    });

    api.setOptions({
        listenEvents: true,
        selfListen: false,
        online: true,
        logLevel: "info",
        autoMarkDelivery: false,
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18"
    });

    const listenEmitter = api.listen(async (err, event) => {

        if (err) return log(err);

        if (event.type == "message" || event.type == "message_reply") {
            if (blockRRR.includes(event.senderID)) {
                return;
            }
        }

        if (event.type == "message") {
            let nonSS = event.body;
            if (nonSS == "enableon") {
                if (vips.includes(event.senderID)) {
                    settings.isEnabled = true;
                    fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(api, event, "Hello");
                    }
            } else if (nonSS == "enableoff") {
                if (vips.includes(event.senderID)) {
                    settings.isEnabled = false;
                    fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                    sendMessage(api, event, "Bye bye.");
                }
            }
        }

        if (!settings.isEnabled && (event.type == "message" || event.type == "message_reply") && event.senderID == vips[2]) {
            return;
        }

        if (settings.isDebugEnabled) {
            if (event.type == "message" || event.type == "message_reply") {
                let input = event.body;
                let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                if (!(vips.includes(event.senderID))) {
                    if (query.startsWith("mj") || query.startsWith("repol") || query == "melvinjones" || query == "melvinjonesrepol" || query == "melvinjonesgallanorepol" || query.startsWith("mrepol742")) {
                        if (isGoingToFastCallingTheCommand(event)) {
                            return;
                        }
                        let message = {
                            body: "Hold on a moment this system is currently under maintenance...\nhttps://mrepol742.github.io/project-orion/",
                            attachment: fs.createReadStream(__dirname + '/cache/maintenance.jpg')
                        };
                        sendMessage(api, event, message);
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
                    msgs[event.messageID] = event.body;
                    let nonSS = event.body;
                    if (nonSS == "debugon") {
                        if (vips.includes(event.senderID)) {
                            settings.isDebugEnabled = true;
                            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                            sendMessage(api, event, "Debug mode enabled.");
                        }
                    } else if (nonSS == "debugoff") {
                        if (vips.includes(event.senderID)) {
                            settings.isDebugEnabled = false;
                            fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                            sendMessage(api, event, "Konnichiwa i am back.");
                        }
                    } else if (nonSS == "sleepon") {
                        if (vips.includes(event.senderID)) {
                            api.muteThread(message.threadID, -1);
                            sendMessage(api, event, "Konbanwa. I'm sleepy now...");
                        }
                    } else if (nonSS == "sleepoff") {
                        if (vips.includes(event.senderID)) {
                            api.muteThread(message.threadID, 0);
                            sendMessage(api, event, "Konnichiwa. I'm back now. How may i help you?");
                        }
                    } else if (nonSS == "stop") {
                        sendMessage(api, event, "Goodbye...");
                        return listenEmitter.stopListening();
                    }
                    if (!nonSS.replace(pictographic, '').length) {
                        if (isGoingToFastResendingOfEmo(event)) {
                            break;
                        }
                        await wait(5000);
                        sendMessageOnly(api, event, nonSS);
                        break;
                    }
                    ai(api, event);
                }
                break;
            case "message_reply":
                let msgid = event.messageID;
                let input = event.body;
                let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
                msgs[msgid] = input;

                if (query == "unsent" || query == "unsend" || query == "remove" || query == "delete") {
                    if (vips.includes(event.senderID)) {
                        if (event.messageReply.senderID != api.getCurrentUserID()) {
                            sendMessage(api, event, "Houston! I cannot unsent messages didn't come from me. sorry.");
                        } else {
                            api.unsendMessage(event.messageReply.messageID);
                        }
                    }
                }

                if (event.attachments.length == 0) {
                    ai(api, event);

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
                            sendMessage(api, event, "Opps! I didnt get it. You should try using wfind text instead.\nFor example:\nwfind my name")
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
                    }
                }

                if (query == "bgremove") {
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
                                        return reportIssue(api, event.threadID, error);
                                    });
                            })
                        }
                    } else {
                        sendMessage(api, event, "Hold on... There is still a request in progress.");
                    }

                }
                if (query == "gphoto") {
                    if (isGoingToFast(event)) {
                        break;
                    }
                    pi.getThreadInfo(event.threadID, (err, gc) => {
                        if (gc.isGroup) {
                            if (event.messageReply.attachments.length < 1) {
                                sendMessage(api, event, "I cannot see an image. Please reply gphoto to an image.");
                            } else if (event.messageReply.attachments.length > 1) {
                                sendMessage(api, event, "Opps! I cannot set this all as group photo. Please select only one image.");
                            } else if ((event.messageReply.attachments.length === 1) && (event.messageReply.attachments[0].type == 'photo')) {
                                const url = event.messageReply.attachments[0].url;
                                request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/gphoto.png')).on('finish', () => {
                                    api.changeGroupImage(fs.createReadStream(__dirname + '/cache/images/gphoto.png'), event.threadID, (err) => {
                                        if(err) return log(err);
                                    });
                                    unLink(__dirname + '/cache/images/gphoto.png');
                                })
                            }
                        }
                    });
                }
                break;
            case "message_unsend":
                if (event.senderID == getMyId()) {
                    break;
                }
                let d = msgs[event.messageID];
                if (d === undefined) {
                    break;
                }
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
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_img.jpg'),
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
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_img.jpg')
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(__dirname + "/cache/images/unsend_img.jpg");
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "gif") {
                                let file = fs.createWriteStream(__dirname + '/cache/images/unsend_gif.gif');
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_gif.gif'),
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
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_gif.gif')
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(__dirname + "/cache/images/unsend_gif.gif");
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "sticker") {
                                let file = fs.createWriteStream(__dirname + '/cache/images/unsend_sticker.png');
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_sticker.png'),
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
                                                        attachment: fs.createReadStream(__dirname + '/cache/images/unsend_sticker.png')
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(__dirname + "/cache/images/unsend_sticker.png");
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "vid") {
                                let file = fs.createWriteStream(__dirname + '/cache/videos/unsend_vid.mp4');
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(__dirname + '/cache/videos/unsend_vid.mp4'),
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
                                                        attachment: fs.createReadStream(__dirname + '/cache/videos/unsend_vid.mp4')
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(__dirname + "/cache/videos/unsend_vid.mp4");
                                            })
                                        }
                                    });
                                });
                            } else if (d[0] == "vm") {
                                let file = fs.createWriteStream(__dirname + '/cache/audios/unsend_vm.mp3');
                                let gifRequest = http.get(d[1], function(gifResponse) {
                                    gifResponse.pipe(file);
                                    file.on('finish', function() {
                                        if (settings.onUnsend && !threads.includes(event.threadID)) {
                                            api.getThreadInfo(event.threadID, (err, gc) => {
                                                if (gc.isGroup) {
                                                    let message = {
                                                        body: "@" + data[event.senderID]['name'] + " " + unsendMessage[Math.floor(Math.random() * unsendMessage.length)] + " \n",
                                                        attachment: fs.createReadStream(__dirname + '/cache/audios/unsend_vm.mp3'),
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
                                                        attachment: fs.createReadStream(__dirname + '/cache/audios/unsend_vm.mp3')
                                                    }
                                                    sendMessageOnly(api, event, message);
                                                }
                                                unLink(__dirname + "/cache/audios/unsend_vm.mp3");
                                            })
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
                                api.getThreadInfo(event.threadID, (err, gc) => {
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
                                let Tmem = arr.length;
                                let num = i;
                                request(encodeURI(getWelcomeImage(name, gname, Tmem, id))).pipe(fs.createWriteStream(__dirname + "/cache/images/welcome.jpg"))
                                    .on('finish', () => {
                                    let message = {
                                        body: gret,
                                            attachment: fs.createReadStream(__dirname + "/cache/images/welcome.jpg"),
                                            mentions: [{
                                                tag: name,
                                                id: id
                                        }]
                                    };
                                    sendMessageOnly(api, event, message);
                                    unLink(__dirname + "/cache/images/welcome.jpg");
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
                                    log(err)
                                } else {
                                    log(data)
                                    for (let prop in data) {
                                        if (data.hasOwnProperty(prop) && data[prop].name) {
                                            let gcn = gc.threadName;
                                            let arr = gc.participantIDs;
                                            let Tmem = arr.length;
                                            let url = "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + data[prop].name + "&text2=Bye bye, Sayonara&text3=Total+Members+" + Tmem + "&avatar=" + getProfilePic(prop);
                                            request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + "/cache/images/byebye.jpg"))
                                                .on('finish', () => {
                                                    let message = {
                                                        body: "Thank you for joining @" + data[prop].name + " but now you're leaving us.",
                                                        attachment: fs.createReadStream(__dirname + "/cache/images/byebye.jpg"),
                                                        mentions: [{
                                                            tag: data[prop].name,
                                                            id: prop
                                                        }]
                                                    };
                                                    sendMessageOnly(api, event, message);
                                                    log("leave_member " + data[prop].name);
                                                    unLink(__dirname + "/cache/images/byebye.jpg");
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
        log("wait_timeout >> " + ms);
        setTimeout(resolve, ms);
    });
}

async function ai(api, event) {
    if (event.body != null && (typeof event.body === "string")) {
        let input = event.body;
        let query = formatQuery(input.replace(/\s+/g, '').toLowerCase());
        let query2 = formatQuery(input.toLowerCase());

        if (query.startsWith("ttsjap")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ttsjap text instead.\nFor example:\nttsjap I am melvin jones repol")
            } else {
                try {
                    data.shift();
                    let responses = "https://texttospeech.responsivevoice.org/v1/text:synthesize?text=" + encodeURIComponent(data.join(" ")) + "&lang=ja&engine=g1&rate=0.5&key=9zqZlnIm&gender=female&pitch=0.5&volume=1";
                    var file = fs.createWriteStream(__dirname + "/cache/audios/ttsjap.mp3");
                    var gifRequest = http.get(responses, function(gifResponse) {
                        gifResponse.pipe(file);
                        file.on('finish', function() {
                            log("Finish downloading audio file.");
                            var message = {
                                attachment: fs.createReadStream(__dirname + "/cache/audios/ttsjap.mp3")
                                    .on("end", async () => {
                                        if (fs.existsSync(__dirname + "/cache/audios/ttsjap.mp3")) {
                                            unLink(__dirname + "/cache/audios/ttsjap.mp3");
                                        }
                                    })
                            }
                            api.sendMessage(message, event.threadID, event.messageID);
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using tts text instead.\nFor example:\ntts I am melvin jones repol")
            } else {
                data.shift();
                const url = googleTTS.getAudioUrl(data.join(" "), {
                    lang: 'en',
                    slow: false,
                    host: 'https://translate.google.com',
                });
                request(url).pipe(fs.createWriteStream(__dirname + '/cache/audios/tts.mp3'))

                        .on('finish', () => {
                            let message = {
                                attachment: fs.createReadStream(__dirname + '/cache/audios/tts.mp3'),
                        };
                        sendMessage(api, event, message);
                        unLink(__dirname + "/cache/audios/tts.mp3");
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
                sendMessage(api, event, "Uptime is " + seconds_con + " seconds\n\nSERVER INFO\n⦿ RAM: " + osFreeMem + "\n⦿ ROM: " + osTotalMem + "\n⦿ Download Speed: " + upload_spee.mbps + " mbps\n⦿ Upload Speed: " + speed.mbps + " mbps");
            })();
        } else if (query.startsWith("searchimg")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using searchimg text instead.\nFor example:\nsearchimg melvin jones repol")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using searchincog text instead.\n\nFor example:\nsearchincog Who is Melvin Jones Repol")
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
        } else if ((settings.prefix != "" && input.startsWith(settings.prefix)) || query.startsWith("mj") || query.startsWith("repol") || query.startsWith("mrepol742") || query.startsWith("melvinjonesrepol") || query.startsWith("melvinjones") || query.startsWith("melvinjonesgallanorepol") ||
            ((query.startsWith("search") || query.startsWith("searchcode")|| query.startsWith("what") || query.startsWith("when") || query.startsWith("who") || query.startsWith("where") ||
                query.startsWith("how") || query.startsWith("why") || query.startsWith("which"))) ||
                otherQ(query2)) {
            if (event.type == "message_reply") {
                if (!isMyId(event.messageReply.senderID)) {
                    return;
                }
            }
            if (isGoingToFast(event)) {
                return;
            }
            if ((settings.prefix != "" && input == settings.prefix) || query == "mj" || query == "repol" || query == "mrepol742" || query == "melvinjonesrepol" || query == "melvinjones") {
                if (nonRRR[event.senderID] == undefined) {
                    let message = {
                        body: "Moshi moshi... \n\nHow can i help you? If you have any question don't hesitate to ask me. For list of commands type cmd. \n⦿ About     ⦿ License\n⦿ Copyright ⦿ cmd\n\nhttps://mrepol742.github.io/project-orion/",
                        attachment: [fs.createReadStream(__dirname + "/cache/welcome_img/hello" + Math.floor(Math.random() * 8) + ".jpg")]
                    }
                    sendMessage(api, event, message);
                    nonRRR[event.senderID] = event.senderID;
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
                    text = input.substring(17)
                } else if (query.startsWith("search")) {
                    text = input.substring(7)
                } else if (query.startsWith("searchcode")) {
                    text = input.substring(11)
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
                } else if (text1 == "sip") {
                    sendMessage(api, event, "Me? noooo...");
                } else if (text1 == "callme") {
                    let id;
                    if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else if (event.type == "message") {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, (err, info) => {
                        if (err) return reportIssue(api, event.threadID, err);
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
                    if (event.type == "message_reply") {
                        id = event.messageReply.senderID;
                    } else if (event.type == "message") {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, (err, info) => {
                        if (err) return reportIssue(api, event.threadID, err);
                        let name = info[id]['name'];
                        request(encodeURI(getProfilePicFullHD(id))).pipe(fs.createWriteStream(__dirname + '/cache/images/whoiam.png'))

                        .on('finish', () => {
                            let message = {
                                body: "You're " + name,
                                attachment: fs.createReadStream(__dirname + '/cache/images/whoiam.png'),
                                mentions: [{
                                    tag: '@' + name,
                                    id: id,
                                    fromIndex: 0
                                }]
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/whoiam.png");
                        })
                    });
                } else if (text1 == "whoownyou") {
                    sendMessage(api, event, "Melvin Jones Repol.")
                } else if (text1.startsWith("whocreatedyou") || text1.startsWith("whoisyourowner") || text1.startsWith("whowroteyou") || text1.startsWith("whoisyourmaker") || text1.startsWith("whobuiltyou")) {
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using cmd number instead.\nFor example:\ncmd 2");
                //} else if (text1.split('').length < 10) {
                //    sendMessage(api, event, idknow[Math.floor(Math.random() * idknow.length)]);
                } else if (someR(api, event, text1) || (someA(api, event, text1, input) && !query.includes("@"))) {
                    return;
                } else if (!query.startsWith("search") && (text.split(" ").length < 3 || text.indexOf(" ") == -1)) {
                    if (repeatOfNonWWW(event)) {
                        return;
                    }
                    sendMessage(api, event, text + "?");
                } else {
                    if (!query.startsWith("searchcode")) {
                        for (let i = 0; i < saveAns.length; i++) {
                            if (saveAns[i][0] == text) {
                                log("answer_cache");
                                sendMessage(api, event, saveAns[i][1]);
                                return;
                            }
                        }
                        const config = new Configuration({
                            apiKey: apiKey[4],
                        });
                        const openai = new OpenAIApi(config);
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
                    } else {
                        const config = new Configuration({
                            apiKey: apiKey[5],
                        });
                        const ai = new OpenAIApi(config);
                        const {
                            data 
                        } = await ai.createEdit("code-davinci-edit-001", {
                            input:  text,
                            instruction: "",
                            temperature: 0,
                            top_p: 1,
                        });
                        sendMessage(api, event, data.choices[0].text);
                    }
                }
            }
        } else if (query.startsWith("problem")) {
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using problem equation instead.\nFor example:\nproblem 5*5/9")
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
            if (query == "bgremove") {
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using linkshort url instead.\nFor example:\nlink https://mrepol742.github.io")
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
            if (isGoingToFast(event)) {
                return;
            }
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
                            log("Starting download of video file.");
                        });
                        stream.on('info', (info) => {
                            threadIdMV[event.threadID] = false;
                            log("downloading " + info.video_details.title);
                        });
                        stream.on('end', () => {
                            let limit = 25 * 1024 * 1024;
                            fs.readFile(__dirname + '/cache/videos/video.mp4', function(err, data) {
                                if (err) log(err)
                                if (data.length > limit) {
                                    log("Unable to upload the video to the file limit. The file size is " + (data.length / 1024 / 1024));
                                    sendMessage(api, event, "Unfortunately i cannot send your video due to the size restrictions on messenger platform.");
                                } else {
                                    log("Done.");
                                    let message = {
                                        body: search.videos[0].title,
                                        attachment: fs.createReadStream(__dirname + '/cache/videos/video.mp4')
                                    }
                                    sendMessage(api, event, message);
                                }
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/videos/video.mp4')
                            })
                        });
                        stream.on('error', (err) => reportIssue(api, event, err));
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
                            log("Starting the download of music file.");
                        });
                        stream.on('info', (info) => {
                            threadIdMV[event.threadID] = false;
                            log("downloading " + info.video_details.title);
                        });
                        stream.on('end', () => {
                            let limit = 25 * 1024 * 1024;
                            fs.readFile(__dirname + '/cache/audios/music.mp3', function(err, data) {
                                if (err) log(err)
                                if (data.length > limit) {
                                    log("Unable to upload the music to the file limit. The file size is " + (data.length / 1024 / 1024));
                                    sendMessage(api, event, "Unfortunately i cannot send your music due to the size restrictions on messenger platform.");
                                } else {
                                    log("Finish downloading music.");
                                    let message = {
                                        body: search.videos[0].title,
                                        attachment: fs.createReadStream(__dirname + '/cache/audios/music.mp3')
                                    }
                                    sendMessage(api, event, message);
                                }
                                threadIdMV[event.threadID] = true;
                                unLink(__dirname + '/cache/audios/music.mp3');
                            })
                        });
                        stream.on('error', (err) => reportIssue(api, event, err));
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using lyrics text instead.\nFor example:\nlyrics In The End by Linkin Park")
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
                        request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/lyrics.png'))

                            .on('finish', () => {
                                let message = {
                                    body: title + " " + artist + "\n\n" + lyrics,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/lyrics.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/lyrics.png");
                            })
                    }
                });
            }
        } else if (input.startsWith("encodebinary")) {
            if (isGoingToFast(event)) {
                return;
            }
            if (input.split(" ").length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using encodeBinary text instead.\nFor example:\nencodeBinary fundamentals in engineering")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using decodeBinary text instead.\nFor example:\ndecodeBinary 01100001 01100010 01100011")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using encode64 text instead.\nFor example:\nencode64 fundamentals in engineering")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using decode64 text instead.\nFor example:\ndecode64 ZnVuZGFtZW50YWxzIGluIGVuZ2luZWVyaW5n")
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
                    if (gc.isGroup) {
                        sendMessage(api, event, "There is no pinned message on this group chat.");
                    } else {
                        sendMessage(api, event, "There is no pinned message on this chat.");
                    }
                })
            } else {
                api.getUserInfo(pinned.pin.sender[event.threadID], (err, data) => {
                    sendMessage(api, event, pinned.pin.message[event.threadID]);
                });
            }
        } else if (query.startsWith("pdf")) {
            if (isGoingToFast(event)) {
                return;
            }
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

                    sendMessage(api, event, res2.ebookName + "\n\n" + res2.dlUrl)
                } catch (err) {
                    reportIssue(api, event.threadID, err);
                    sendMessage(api, event, "An unknown error as been occured. Please try again later.")
                }
            }
        } else if (query.startsWith("urbandictionary") || query.startsWith("dictionary") || query2.startsWith("dict ")) {
            if (isGoingToFast(event)) {
                return;
            }
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
            if (isGoingToFast(event)) {
                return;
            }
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

        if (query.startsWith("baybayin")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ")
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using baybayin text instead.\n\nFor example:\nbaybayin ako ay filipino")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using doublestruck text instead.\n\nFor example:\ndoublestruck Hello World")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using translate language text instead.\n\nFor example:\ntranslate English Kamusta")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using facts text instead.\n\nFor example:\nfacts computer")
            } else {
                data.shift()
                let url = "https://api.popcat.xyz/facts?text=" + data.join(" ");
                parseImage(api, event, url, __dirname + '/cache/images/facts.png');
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using instagram username instead.\n\nFor example:\ninstagram melvinjonesrepol")
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

                        request(encodeURI(profilepic)).pipe(fs.createWriteStream(__dirname + '/cache/images/instaprofile.png'))

                            .on('finish', () => {
                                let message = {
                                    body: fullname + " @" + username + "\nReels: " + reels + "\nFollowers: " + followers + "\nFollowing: " + following + "\nPrivate: " + private + "\nVerified: " + verified + "\n\n" + biography,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/instaprofile.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/instaprofile.png");
                            })
                    }
                });
            }
        } else if (query.startsWith("profilepic")) {
            if (isGoingToFast(event)) {
                return;
            }
            let id;
            if (event.type == "message_reply") {
                id = event.messageReply.senderID;
            } else {
                id = event.senderID;
            }
            parseImage(api, event, getProfilePicFullHD(id), __dirname + '/cache/images/profilepic.png');
        } else if (query.startsWith("tiktok")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using tiktok username instead.\n\nFor example:\ntiktok mrepol742")
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
                        let video =  response.result.videoCount;
                        let digg = response.result.diggCount;
                        let avatar = response.result.avatar;

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/tiktok_avatar.png'))

                            .on('finish', () => {
                                let message = {
                                    body: name + " @" + username + "\n⦿ Hearts: " + heart + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Videos: " + video + "\n⦿ Digg: " + digg + "\n\n" + bio,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/tiktok_avatar.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/tiktok_avatar.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using soundcloud username instead.\n\nFor example:\nsoundcloud Denvau")
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

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/soundcloud_avatar.png'))

                            .on('finish', () => {
                                let message = {
                                    body: name + " @" + username + "\n⦿ Location: " + location + "\n⦿ Likes: " + likes + "\n⦿ Playlist: " + playlist + "\n⦿ Playlist Likes: " + playlistLikes + "\n⦿ Tracks: " + trackCount + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n\n" + bio + "\n" + permalinkUrl,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/soundcloud_avatar.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/soundcloud_avatar.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using github username instead.\n\nFor example:\ngithub mrepol742")
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

                        if (bio == "No Bio") {
                            bio = "";
                        }

                        request(encodeURI(avatar)).pipe(fs.createWriteStream(__dirname + '/cache/images/github_avatar.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Email: " + email + "\n⦿ Location: " + location + "\n⦿ Company: " + company + "\n⦿ Website: " + url + "\n⦿ Followers: " + followers + "\n⦿ Following: " + following + "\n⦿ Public Repository: " + public_repos + "\n⦿ Public Gists: " + public_gists + "\n\n" + bio + "\nhttps://github.com/" + userN,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/github_avatar.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/github_avatar.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using element name instead.\n\nFor example:\nelement hydrogen")
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

                        request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/element.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Symbol: " + symbol + "\n⦿ Atomic Number: " + atomic_number + "\n⦿ Atomic Mass: " + atomic_mass + "\n⦿ Peroid: " + period + "\n⦿ Phase: " + phase + "\n⦿ Discovered by: " + discovered_by + "\n\n" + summary,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/element.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/element.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using npm name instead.\n\nFor example:\nnpm mrepol742")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using steam name instead.\n\nFor example:\nsteam minecraft")
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

                        request(encodeURI(banner)).pipe(fs.createWriteStream(__dirname + '/cache/images/steam.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + "\n⦿ Price: " + price + "\n⦿ Developers: " + developers + "\n⦿ Website: " + website + "\n\n" + description,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/steam.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/steam.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using imdb name instead.\n\nFor example:\nimdb iron man")
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

                        request(encodeURI(poster)).pipe(fs.createWriteStream(__dirname + '/cache/images/imdb.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Title: " + title + " " + year + "\n⦿ Genres: " + genres + "\n⦿ Runtime: " + runtime + "\n⦿ Actors: " + actors + "\n\n" + plot,
                                    attachment: fs.createReadStream(__dirname + '/cache/images/imdb.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/imdb.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using itunes title instead.\n\nFor example:\nitunes in the end")
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

                        request(encodeURI(thumbnail)).pipe(fs.createWriteStream(__dirname + '/cache/images/itunes.png'))

                            .on('finish', () => {
                                let message = {
                                    body: "⦿ Name: " + name + " by " + artist + "\n⦿ Album: " + album + "\n⦿ Genre: " + genre + "\n⦿ Length: " + lenghtM + " minutes",
                                    attachment: fs.createReadStream(__dirname + '/cache/images/itunes.png')
                                };
                                sendMessage(api, event, message);
                                unLink(__dirname + "/cache/images/itunes.png");
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

                    request(encodeURI(image)).pipe(fs.createWriteStream(__dirname + '/cache/images/car.png'))

                        .on('finish', () => {
                            let message = {
                                body: title,
                                attachment: fs.createReadStream(__dirname + '/cache/images/car.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/car.png");
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

                    request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/color.png'))

                        .on('finish', () => {
                            let message = {
                                body: name + " #" + hex,
                                attachment: fs.createReadStream(__dirname + '/cache/images/color.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/color.png");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using gemoji emoji instead.\n\nFor example:\ngemoji 😂")
            } else {
                data.shift()
                await wait(3000);
                api.changeThreadEmoji(data.join(" "), event.threadID, (err) => {
                    if (err) return reportIssue(api, event.threadID, err);
                });
            }
        } else if (query.startsWith("sendreport")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sendReport text instead.\n\nFor example:\nsendReport a problem.")
            } else {
                data.shift()
                reportIssue(api, event, data.join(" "));
            }
        } else if (query.startsWith("setmaxtokens")) {
            if (vips.includes(event.senderID)) {
                let data = input.split(" ");
                if (data.length < 2) {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setMaxTokens [integer] instead.\n\nFor example:\nsetMaxTokens 1000.")
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setTemperature [integer] instead.\n\nFor example:\nsetTemperature 0.")
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setFrequencyPenalty [integer] instead.\n\nFor example:\nsetFrequencyPenalty 1.")
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setPresencePenalty [integer] instead.\n\nFor example:\nsetPresencePenalty 1.")
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
        } else if (query.startsWith("setTextComplextion")) {
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setProbabilityMass [integer] instead.\n\nFor example:\nsetProbabilityMass 0.1.")
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setTimezone timezone instead.\n\nFor example:\nsetTimezone Asia/Singapore")
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using setPrefix prefix instead.\n\nFor example:\nsetPrefix $")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor example:\naddUser 100024563636366");
            } else {
                data.shift();
                let pref = data.join(" ");
                if (pref.split("").length >= 15) {
                    if (/^\d+$/.test(pref)) {
                        api.getThreadInfo(event.threadID, (err, gc) => {
                            if (gc.isGroup) {
                                api.addUserToGroup(pref, event.threadID, (err) => {
                                    if (err) log(err);
                                    log("add_user " + event.threadID + " " + pref);
                                });
                            }
                        })
                    } else {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor example:\naddUser 100024563636366");
                    }
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using addUser uid instead.\n\nFor example:\naddUser 100024563636366");
                }
            }
        } else if (query.startsWith("gcolor")) {
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gcolor theme instead.\n\nFor example:\ngcolor DefaultBlue");
            } else {
                data.shift();
                let pref = data.join(" ");
                if (gcolorn.includes(pref)) {
                    api.changeThreadColor(gcolor[pref], event.threadID, (err) => {
                        if(err) return log(err);
                    });
                    log("change_color " + event.threadID + " " + gcolor[pref]);
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using gcolor theme instead.\n\nFor example:\ngcolor DefaultBlue");
                }
            }
        } else if (query.startsWith("kickuser")) {
            if (vips.includes(event.senderID)) {
                api.getThreadInfo(event.threadID, (err, gc) => {
                    if (gc.isGroup) {
                        if (input.includes("@")) {
                            let id = Object.keys(event.mentions)[0];
                            if (id === undefined) {
                                let data = input.split(" ");
                                data.shift();
                                /*
                                api.getUserID(data.join(" ").replace("@", ""), (err, data) => {
                                    if (err) return sendMessage(api, event, "Unfortunately i couldn't find the name you mentioned. Please try it again later.");
                                    id = data[0].userID;
                                });*/
                                id = getUserId(api, data.join(" ").replace("@", ""));
                                console.log("id is" + id);
                            } else if (isMyId(id)) {
                                sendMessage(api, event, "Unable to kick the user.");
                                return;
                            }
                            api.removeUserFromGroup(id, event.threadID, (err) => {
                                if (err) log(err);
                                log("user_remove " + event.threadID + " " + id);
                            });
                        } else {
                            sendMessage(api, event, "Opps! I didnt get it. You should try using kickUser @mention instead.\n\nFor example:\nkickUser @Melvin Jones Repol")
                        }
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
                            id = data[0].userID;
                        });
                    } else if (isMyId(id)) {
                        sendMessage(api, event, "Unable to block the user.");
                        return;
                    }
                    blockRRR.push(id);
                    sendMessage(api, event, "The user " + id + " is blocked.");
                    fs.writeFileSync("cache/block_users.json", JSON.stringify(blockRRR), "utf8");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using blockUser @mention instead.\n\nFor example:\nblockUser @Melvin Jones Repol")
                }
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
                            id = data[0].userID;
                        });
                    } else if (isMyId(id)) {
                        sendMessage(api, event, "Unfortunately an error occured.");
                        return;
                    }
                    blockRRR = blockRRR.filter(item => item !== id);
                    sendMessage(api, event, "The user " + id + " can now use the commands.");
                    fs.writeFileSync("cache/block_users.json", JSON.stringify(blockRRR), "utf8");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using unblockUser @mention instead.\n\nFor example:\nunblockUser @Melvin Jones Repol")
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
                            id = data[0].userID;
                        });
                    } else if (isMyId(id)) {
                        sendMessage(api, event, "This account is already an admin.");
                        return;
                    }
                    vips.push(id);
                    sendMessage(api, event, "Admin permission granted.");
                    fs.writeFileSync("cache/admin.json", JSON.stringify(vips), "utf8");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using addAdmin @mention instead.\n\nFor example:\naddAdmin @Melvin Jones Repol")
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
                            id = data[0].userID;
                        });
                    } else if (isMyId(id)) {
                        sendMessage(api, event, "Unfortunately an error occured.");
                        return;
                    }
                    vips = vips.filter(item => item !== id);
                    sendMessage(api, event, "Admin permission removed.");
                    fs.writeFileSync("cache/admin.json", JSON.stringify(vips), "utf8");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using remAdmin @mention instead.\n\nFor example:\nremAdmin @Melvin Jones Repol")
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
        } else if ((query == "preventsimultaneousexecutionon") && !settings.preventSimultaneousExecution) {
            if (vips.includes(event.senderID)) {
                settings.preventSimultaneousExecution = true
                fs.writeFileSync("cache/settings.json", JSON.stringify(settings), "utf8")
                sendMessage(api, event, "Prevention of simulataneous execution are now enabled.");
            }
        } else if ((query == "preventsimultaneousexecutionoff") && settings.preventSimultaneousExecution) {
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
                if (gc.isGroup) {
                    let arr = gc.participantIDs;
                    sendMessage(api, event, "This group has about " + arr.length +" members.")
                }
            })
        } else if (query.startsWith("gname")) {
            if (isGoingToFast(event)) {
                return;
            }
            await wait(3000);
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (gc.isGroup) {
                    let data = input.split(" ");
                    if (data.length < 2) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using gname text instead.\n\nFor example:\ngname Hall of Codes")
                    } else {
                        data.shift()
                        api.setTitle(data.join(" "), event.threadID, (err, obj) => {
                            if (err) return console.error(err);
                        });
                    }
                }
            })
        } else if (query == "gname") {
            if (isGoingToFast(event)) {
                return;
            }
            api.getThreadInfo(event.threadID, (err, gc) => {
                if (gc.isGroup) {
                    sendMessage(api, event, gc.threadName);
                }
            })
        } else if (query == "groupid" || query == "guid" || query == "uid") {
            if (isGoingToFast(event)) {
                return;
            }
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
            sendMessage(api, event, "Project Orion 1 - 7\n" + help + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd2") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 2 - 7\n" + help1 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd3") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 3 - 7\n" + help2 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd4") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 4 - 7\n" + help3 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd5") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 5 - 7\n" + help4 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd6") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 6 - 7\n" + help5 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmd7") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion 7 - 7\n" + help6 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmdadmin") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion Admin\n" + helpadmin + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query == "cmdall") {
            if (isGoingToFast(event)) {
                return;
            }
            sendMessage(api, event, "Project Orion\n" + help + help1 + help2 + help3 + help4 + help5 + help6 + "\n\n" + qot[Math.floor(Math.random() * qot.length)]);
        } else if (query.startsWith("wiki")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wiki text instead.\n\nFor example:\nwiki google")
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
        } else if (query.startsWith("isValidDomain")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using isValidDomain url instead.\n\nFor example:\nisValidDomain https://mrepol742.github.io")
            } else {
                data.shift();
                if (isValidDomain(data.join(" "))) {
                    sendMessage(api, event, "It is a valid domain.");
                } else {
                    sendMessage(api, event, "It is not a valid domain.");
                }
            }
        } else if (query.startsWith("lovetest")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using lovetest @mention @mention instead.\n\nFor example:\nlovetest @Melvin Jones Repol @Alexa Guno")
            } else {
                if ((input.split('@').length - 1) >= 2) {
                    let id1 = Object.keys(event.mentions)[0];
                    let id2 = Object.keys(event.mentions)[1];
                    if (id1 === undefined || id2 === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using lovetest @mention @mention instead.\n\nFor example:\nlovetest @Melvin Jones Repol @Alexa Guno")
                        return;
                    }
                    if (isMyId(id1)) {
                        id1 = event.senderID;
                    } else if (isMyId(id2)) {
                        id2 = event.senderID;
                    }
                    let name1, name2;
                    api.getUserInfo(id1, (err, info) => {
                        name1 = info[id1]['name'];
                    });
                    api.getUserInfo(id2, (err, info) => {
                        name2 = info[id2]['name'];
                    });
                    const options = {
                        method: 'GET',
                        url: 'https://love-calculator.p.rapidapi.com/getPercentage',
                        params: {
                            sname: name2,
                            fname: name1
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
                        sendMessage(api, event, name1 + " ❤️ " + name2 + "\n⦿ Percentage: " + percent + "\n\n" + result);
                    }).catch(function(error) {
                        log(error);
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using lovetest @mention @mention instead.\n\nFor example:\nlovetest @Melvin Jones Repol @Alexa Guno");
                }
            }
        } else if (query.startsWith("kiss")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using kiss @mention instead.\n\nFor example:\nkiss @Melvin Jones Repol")
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
                    let sender = event.send
                    getResponseData("https://api.satou-chan.xyz/api/endpoint/kiss").then((response) => {
                        if (response == null) {
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        } else {
                            api.getUserInfo(id, (err, info) => {
                                if (err) return reportIssue(api, event.threadID, err);
                                let name = info[id]['name'];
                                request(encodeURI(response.url)).pipe(fs.createWriteStream(__dirname + "/cache/images/kiss.png"))
                                    .on('finish', () => {
                                        let image = {
                                            body: "@" + name,
                                            attachment: fs.createReadStream(__dirname + "/cache/images/kiss.png"),
                                            mentions: [{
                                                tag: '@' + name,
                                                id: id,
                                                fromIndex: 0
                                            }]
                                        };
                                        sendMessage(api, event, image);
                                        unLink(__dirname + "/cache/images/kiss.png");
                                    })
                            })
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using kiss @mention instead.\n\nFor example:\nkiss @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("gun")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using gun @mention instead.\n\nFor example:\ngun @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/gun?image=" + getProfilePic(id), __dirname + "/cache/images/gun.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using gun @mention instead.\n\nFor example:\ngun @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("wanted")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using wanted @mention instead.\n\nFor example:\nwanted @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/wanted?image=" + getProfilePic(id), __dirname + "/cache/images/wanted.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using wanted @mention instead.\n\nFor example:\nwanted @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("clown")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using clown @mention instead.\n\nFor example:\nclown @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/clown?image=" + getProfilePic(id), __dirname + "/cache/images/clown.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using clown @mention instead.\n\nFor example:\nclown @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("drip")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using drip @mention instead.\n\nFor example:\ndrip @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/drip?image=" + getProfilePic(id), __dirname + "/cache/images/drip.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using drip @mention instead.\n\nFor example:\ndrip @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("communist")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using communist @mention instead.\n\nFor example:\ncommunist @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/communist?image=" + getProfilePic(id), __dirname + "/cache/images/communist.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using communist @mention instead.\n\nFor example:\ncommunist @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("advert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using advert @mention instead.\n\nFor example:\nadvert @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/ad?image=" + getProfilePic(id), __dirname + "/cache/images/advert.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using advert @mention instead.\n\nFor example:\nadvert @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("uncover")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using uncover @mention instead.\n\nFor example:\nuncover @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/uncover?image=" + getProfilePic(id), __dirname + "/cache/images/uncover.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using uncover @mention instead.\n\nFor example:\nuncover @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("jail")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using jail @mention instead.\n\nFor example:\njail @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/jail?image=" + getProfilePic(id), __dirname + "/cache/images/jail.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using jail @mention instead.\n\nFor example:\njail @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("invert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using invert @mention instead.\n\nFor example:\ninvert @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/invert?image=" + getProfilePic(id), __dirname + "/cache/images/invert.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using invert @mention instead.\n\nFor example:\ninvert @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("ship")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor example:\nship @Melvin Jones Repol @Alexa Guno")
            } else {
                if ((input.split('@').length - 1) >= 2) {
                    let id1 = Object.keys(event.mentions)[0];
                    let id2 = Object.keys(event.mentions)[1];
                    if (id1 === undefined || id2 === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor example:\nship @Melvin Jones Repol @Alexa Guno")
                        return;
                    }
                    if (isMyId(id1)) {
                        id1 = event.senderID;
                    } else if (isMyId(id2)) {
                        id2 = event.senderID;
                    }
                    parseImage(api, event, "https://api.popcat.xyz/ship?user1=" + getProfilePic(id1) + "&user2=" + getProfilePic(id2), __dirname + "/cache/images/ship.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using ship @mention @mention instead.\n\nFor example:\nship @Melvin Jones Repol @Alexa Guno")
                }
            }
        } else if (query.startsWith("www")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor example:\nwww @Melvin Jones Repol @Alexa Guno")
            } else {
                if ((input.split('@').length - 1) >= 2) {
                    let id1 = Object.keys(event.mentions)[0];
                    let id2 = Object.keys(event.mentions)[1];
                    if (id1 === undefined || id2 === undefined) {
                        sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor example:\nwww @Melvin Jones Repol @Alexa Guno")
                        return;
                    }
                    if (isMyId(id1)) {
                        id1 = event.senderID;
                    } else if (isMyId(id2)) {
                        id2 = event.senderID;
                    }
                    parseImage(api, event, "https://api.popcat.xyz/whowouldwin?image1=" + getProfilePic(id1) + "&image2=" + getProfilePic(id2), __dirname + "/cache/images/www.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using www @mention @mention instead.\n\nFor example:\nwww @Melvin Jones Repol @Alexa Guno")
                }
            }
        } else if (query.startsWith("pet")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pet @mention instead.\n\nFor example:\npet@Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/pet?image=" + getProfilePic(id), __dirname + "/cache/images/pet.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using pet @mention instead.\n\nFor example:\npet @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("mnm")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using mnm @mention instead.\n\nFor example:\nmnm @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/mnm?image=" + getProfilePic(id), __dirname + "/cache/images/mnm.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using mnm @mention instead.\n\nFor example:\nmnm @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("greyscale")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using greyscale @mention instead.\n\nFor example:\ngreyscale @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/greyscale?image=" + getProfilePic(id), __dirname + "/cache/images/greyscale.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using greyscale @mention instead.\n\nFor example:\ngreyscale @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("jokeover")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using jokeover @mention instead.\n\nFor example:\njokeover @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/jokeoverhead?image=" + getProfilePic(id), __dirname + "/cache/images/jokeover.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using jokeover @mention instead.\n\nFor example:\njokeover @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("blur")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using blur @mention instead.\n\nFor example:\nblur @Melvin Jones Repol")
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
                    parseImage(api, event, "https://api.popcat.xyz/blur?image=" + getProfilePic(id), __dirname + "/cache/images/blur.png");
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using blur @mention instead.\n\nFor example:\nblur @Melvin Jones Repol")
                }
            }
        } else if (query.startsWith("facebook") || query2.startsWith("fb ")) {
            if (isGoingToFast(event)) {
                return;
            }
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using facebook @mention instead.\n\nFor example:\nfacebook @Melvin Jones Repol")
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
                        if (err) return reportIssue(api, event.threadID, err);
                        for (let prop in ret) {
                            let {
                                vanity,
                                name,
                                gender,
                                isBirthday
                            } = ret[prop]
                            let url = encodeURI('https://graph.facebook.com/' + `${prop}` + '/picture?height=720&width=720&access_token=' + apiKey[1])
                            let filename = __dirname + "/cache/images/facebook.jpg";
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
                    sendMessage(api, event, "Opps! I didnt get it. You should try using facebook @mention instead.\n\nFor example:\nfacebook @Melvin Jones Repol")
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using morse query instead.\nFor example:\nmorse query");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using lulcat text instead.\nFor example:\nlulcat meowww");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using mock text instead.\nFor example:\nmock i have no idea");
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

                    request(encodeURI(url)).pipe(fs.createWriteStream(__dirname + '/cache/images/coding.png'))

                        .on('finish', () => {
                            let message = {
                                body: title,
                                attachment: fs.createReadStream(__dirname + '/cache/images/coding.png')
                            };
                            sendMessage(api, event, message);
                            unLink(__dirname + "/cache/images/coding.png");
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
                attachment: fs.createReadStream(__dirname + '/cache/barrier.jpg')
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol");
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
                                id = data[0].userID;
                            });
                        }
                    } else if (isMyId(id)) {
                        id = event.senderID;
                    }
                    api.getUserInfo(id, (err, info) => {
                        if (err) return reportIssue(api, event.threadID, err);
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
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using nickname @mention nickname instead.\nFor example:\nnickname @mrepol742 melvinjonesrepol");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using drake text1: text2 instead.\nFor example:\ndrake error: bug");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/drake?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/drake.png');
            }
        } else if (query.startsWith("pika")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(5);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using pika text instead.\nFor example:\npika hayssss");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pikachu?text=" + text, __dirname + '/cache/images/pika.png');
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
        } else if (query == "meme--reddit") {
            if (isGoingToFast(event)) {
                return;
            }
            getResponseData("https://meme-api.herokuapp.com/gimme").then((response) => {
                if (response == null) {
                    sendMessage(api, event, "Unfortunately there was an error occured.");
                } else {
                    parseImage(api, event, response.url, __dirname + '/cache/images/meme.png');
                }
            });
        } else if (query.startsWith("conan")) {
            if (isGoingToFast(event)) {
                return;
            }
            parseImage(api, event, "https://mrepol742-gif-randomizer.vercel.app/api", __dirname + '/cache/images/conan.png');
        } else if (query.startsWith("oogway")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using oogway text instead.\nFor example:\noogway bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/oogway?text=" + text, __dirname + '/cache/images/oogway.png');
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using anime --nsfw category instead.\nFor example:\nanime --nsfw waifu");
            } else {
                if (!(text in categoryNSFW)) {
                    getResponseData("https://api.waifu.pics/nsfw/" + text).then((response) => {
                        if (response == null) {
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        } else {
                            parseImage(api, event, response.url, __dirname + '/cache/images/animensfw.png');
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using anime --nsfw category instead.\nFor example:\nanime --nsfw waifu");
                }
            }
        } else if (query.startsWith("anime")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using anime category instead.\nFor example:\nanime waifu");
            } else {
                if (!(text in categorySFW)) {
                    getResponseData("https://api.waifu.pics/sfw/" + text).then((response) => {
                        if (response == null) {
                            sendMessage(api, event, "Unfortunately there was an error occured.");
                        } else {
                            parseImage(api, event, response.url, __dirname + '/cache/images/anime.png');
                        }
                    });
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using anime category instead.\nFor example:\nanime waifu");
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using trump text instead.\nFor example:\ntrump bug is not an error");
            } else {
                parseImage(api, event, "https://un5vyw.deta.dev/tweet?text=" + text, __dirname + '/cache/images/trump.png');
            }
        } else if (query.startsWith("qrcode")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using qrcode text instead.\nFor example:\nqrcode https://mrepol742.github.io");
            } else {
                parseImage(api, event, "http://api.qrserver.com/v1/create-qr-code/?150x150&data=" + text, __dirname + '/cache/images/qrcode.png');
            }
        } else if (query.startsWith("alert")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using alert text instead.\nFor example:\nalert hello world");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/alert?text=" + text, __dirname + '/cache/images/alert.png');
            }
        } else if (query.startsWith("caution")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using caution text instead.\nFor example:\ncaution bug is not an error");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/caution?text=" + text, __dirname + '/cache/images/caution.png');
            }
        } else if (query.startsWith("biden")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(6);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using biden text instead.\nFor example:\nbiden i am leaving twitter");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/biden?text=" + text, __dirname + '/cache/images/biden.png');
            }
        } else if (query.startsWith("website")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(8);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using website url instead.\nFor example:\nwebsite https://mrepol742.github.io");
            } else {
                if (text.startsWith("https://") || text.startsWith("http://")) {
                    parseImage(api, event, "https://api.popcat.xyz/screenshot?url=" + text, __dirname + '/cache/images/website.png');
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using god text instead.\nFor example:\ngod explicit content");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/unforgivable?text=" + text, __dirname + '/cache/images/god.png');
            }
        } else if (query.startsWith("sadcat")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(7);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using sadcat text instead.\nFor example:\nsadcat meoww");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/sadcat?text=" + text, __dirname + '/cache/images/sadcat.png');
            }
        } else if (query2.startsWith("sip ")) {
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using pooh text1: text2 instead.\nFor example:\npooh color: colour");
            } else {
                parseImage(api, event, "https://api.popcat.xyz/pooh?text1=" + text[0] + "&text2=" + text[1], __dirname + '/cache/images/pooh.png');
            }
        } else if (query == "landscape") {
            if (isGoingToFast(event)) {
                return;
            }
            parseImage(api, event, "https://source.unsplash.com/1600x900/?landscape", __dirname + '/cache/images/landscape.png');
        } else if (query == "portrait") {
            if (isGoingToFast(event)) {
                return;
            }
            parseImage(api, event, "https://source.unsplash.com/900x1600/?portrait", __dirname + '/cache/images/portrait.png');
        } else if (query.startsWith("landscape")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(10);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using landscape text instead.\nFor example:\nlandscape night");
            } else {
                parseImage(api, event, "https://source.unsplash.com/1600x900/?" + text, __dirname + '/cache/images/landscape.png');
            }
        } else if (query.startsWith("portrait")) {
            if (isGoingToFast(event)) {
                return;
            }
            let text = input;
            text = text.substring(9);
            let data = input.split(" ");
            if (data.length < 2) {
                sendMessage(api, event, "Opps! I didnt get it. You should try using portrait text instead.\nFor example:\nportrait rgb");
            } else {
                parseImage(api, event, "https://source.unsplash.com/900x1600/?" + text, __dirname + '/cache/images/portrait.png');
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
                sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead.\nFor example:\ntime Asia/Singapore");
            } else {
                let body = input.substring(5);
                if (timeZones.includes(body)) {
                    sendMessage(api, event, "It's " + getMonth(body) + " " + getDayN(body) + ", " + getDay(body) + " " + formateDate(body));
                } else {
                    sendMessage(api, event, "Opps! I didnt get it. You should try using time timezone instead.\nFor example:\ntime Asia/Singapore");
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
                attachment: fs.createReadStream(__dirname + '/cache/newyear.gif')
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
                attachment: fs.createReadStream(__dirname + '/cache/Christmas.gif')
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
                            result += r[i].text + "\n\n" + r[i].bookname + " " + r[i].chapter + ":" + r[i].verse;
                        }
                        sendMessage(api, event, result);
                    }
                })
            }
        } else if (query == "refresh" || query == "reload") {
            if (vips.includes(event.senderID)) {
                let A = api.getAppState();
                let B = await JSON.stringify(A);
                fs.writeFileSync("fb.json", B, "utf8");
                sendMessage(api, event, "AppState Refreshed Successfully!.");
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
                if (gc.isGroup) {
                    if (event.type == "message_reply") {
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

        if (!query.includes("@")) {
            if (event.type == "message_reply") {
                if (!isMyId(event.messageReply.senderID)) {
                    return;
                }
            }
            someA(api, event, query, input);
        }
        reaction(api, event, query, input);
    }
}

function someA(api, event, query, input) {
    if (query == "sup" || query == "wassup" || query == "whatsup") {
        sendMessage(api, event, sup[Math.floor(Math.random() * sup.length)]);
        return true;
    } else if (query == "hi" || query == "hello" || query.startsWith("hey")) {
        sendMessage(api, event, hey[Math.floor(Math.random() * hey.length)]);
        return true;
    } else if (query == "okay") {
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

function reportIssue(api, event, err) {
    log("report_issue " + err);
    api.sendMessage(err + "", getMyId());
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
        if (gc.isGroup) {
            let ts = undefined;
            api.getThreadHistory(event.threadID, 3, ts, (err, history) => {
                if (err) return console.error(err);
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
                    api.sendMessage(message, event.threadID, event.messageID).catch((err) => reportIssue(api, event, err));
                } else {
                    log("send_message " + event.threadID + " " + message);
                    api.sendMessage(message, event.threadID).catch((err) => reportIssue(api, event, err));
                }
                ts = history[0].timestamp;
            });
        } else {
            log("send_message " + event.threadID + " " + message);
            api.sendMessage(message, event.threadID).catch((err) => reportIssue(api, event, err));
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
    api.sendMessage(message, event.threadID).catch((err) => reportIssue(api, event, err));
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
    api.setMessageReaction(reaction, event.messageID).catch((err) => reportIssue(api, event, err));
}

function formatQuery(string) {
    let str = string.replace(pictographic, '');
    return str.replace(latinC, '');
}

function log(data) {
    let date = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"}).replace(",", "");
    console.log(date + "$ " + data);
}

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) != - 1) {
         return true;
       }
    }
    return false; 
}

function isGoingToFast(event) {
    log("event_body " + event.senderID + " " + event.body);
    if (!settings.preventSimultanoesExecution) {
        return false;
    }
    if (!(vips.includes(event.senderID))) {
        if (!(event.senderID in cmd)) {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (60);
            return false;
        } else if (Math.floor(Date.now() / 1000) < cmd[event.senderID]) {
            log("The user " + event.senderID + " is going to fast of executing commands >> " +
                Math.floor((cmd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " +
                (cmd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds");
            return true;
        } else {
            cmd[event.senderID] = Math.floor(Date.now() / 1000) + (60);
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
    return (text.includes("jabol") || text.includes("nude") || text.includes("hentai") || text.includes("milf") ||
        text.includes("masturbate") || text.includes("pussy") || text.includes("dick") || text.includes("horny") ||
        text.includes("blowjob") || text.includes("lolli")) && !settings.onNsfw;
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

function isValidDomain(url) {
    let l = url.toLowerCase();
    for (url in domains) {
        if (l.endsWith(s) && !l.includes(" ")) {
            return true;
        } else if (l.includes(s) && l.includes("/") && !l.includes(" ")) {
            return true;
        }
    }
    return false;
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
    return new Date(new Date().toLocaleString("en-US", {timeZone: tz}))
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
        if (query.startsWith(sqq[i] + " ") && query.split(" ").length > 3 || (query.endsWith("?") || query.endsWith("!") || query.endsWith("."))) {
            return true;
        }
    }
    return false;
}

function nonNN(api, event, query) {
    if (event.type == "message" || (event.type == "message_reply" && (isMyId(event.messageReply.senderID)))) {
        
    }
}

function isMyId(id) {
    return id == "100071743848974" || id == "100016029218667";
}

function getMyId() {
    return "100071743848974";
}

function getWelcomeImage(name, gname, Tmem, id) {
    return "https://api.popcat.xyz/welcomecard?background=https://mrepol742.github.io/project-orion/background" + Math.floor(Math.random() * 9) + ".jpeg&text1=" + name + "&text2=Welcome+To+" + gname + "&text3=You're the " + getSuffix(Tmem) + " member&avatar=" + getProfilePic(id)
}

async function getImages(api, event, images) {
    for (let i = 0;
        (i < 6 && i < images.length); i++) {
        await wait(1000);
        request(encodeURI(images[i].url)).pipe(fs.createWriteStream(__dirname + "/cache/images/findimg" + i + ".png"))
    }
    await wait(1000);
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
    api.sendMessage(message, event.threadID, (err, done) => {
        unLink(__dirname + "/cache/images/findimg0.png")
        unLink(__dirname + "/cache/images/findimg1.png")
        unLink(__dirname + "/cache/images/findimg2.png")
        unLink(__dirname + "/cache/images/findimg3.png")
        unLink(__dirname + "/cache/images/findimg4.png")
        unLink(__dirname + "/cache/images/findimg5.png")
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

function secondsToTime(e){
    let h = Math.floor(e / 3600).toString().padStart(2,'0');
    let m = Math.floor(e % 3600 / 60).toString().padStart(2,'0');
    let s = Math.floor(e % 60).toString().padStart(2,'0');
    return h + ':' + m + ':' + s;
}

function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

async function getUserId(api, name) {
    const userid = await api.getUserID(name, (err, data) => {
        if (err) return log(err);
        return data[0].userID;
    });
    return userid;
}