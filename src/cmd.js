/*jshint esversion: 9 */
/*jshint -W097 */
/*jshint -W117 */

/*
 *
 * Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Mrepol742-the-License
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

let footer = ["If you have further questions, i am here to help you.", 
              "Some of my commands works in any means you could imagine.",
              "The : divides the query into 2 sections the first one and second one.",
              "Follow Mj to get the latest update and information.",
              "You can get your 'appstate' easily using the Webvium Dev Cookie Manager",
              "Do you have any questions about the command %USER%?",
              "Hi %USER%, have you follow us?",
              "Learn more: https://mrepol742.github.io/project-orion",
              "https://mrepol742.github.io",
              "Follow us at Github: https://github.com/prj-orion",
              "Follow us at Facebook: https://facebook.com/com.mrepol742.orion"
            ];

let help = `
⋆｡° Hello %USER%, how are you?
│
│   ⦿ func 
│       next, all, user, group,
│       admin and root
│   ⦿ stats
│   ⦿ uptime
│   ⦿ sysinfo
│   ⦿ tokens
│   ⦿ sendReport \`text\`
│   ⦿ search \`text\`
│   ⦿ searchincog \`text\`
│   ⦿ searchimg \`text\`
│   ⦿ searchimg --reverse
│   ⦿ dell \`prompt\`
│   ⦿ poli \`prompt\`
│   ⦿ run \`lang\` \`reply\`
│       Java, Python, C, C++,
│       JavaScript, PHP and Dragon
│   ⦿ ai \`prompt\`
│   ⦿ gpt \`prompt\`
│   ⦿ ask \`prompt\`
│   ⦿ beshy \`prompt\`
│   ⦿ melbin \`prompt\`
│   ⦿ sim \`prompt\`
│   ⦿ misaka \`prompt\`
│   ⦿ codex \`prompt\`
│   ⦿ openai \`prompt\`
│   ⦿ chatgpt \`prompt\`
│   ⦿ chad \`prompt\`
│   ⦿ nraf \`prompt\`
│   ⦿ skynet \`prompt\`
│   ⦿ mj \`prompt\`
│   ⦿ 8ball \`prompt\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help1 = `
⋆｡° Hello %USER%, how can i assist you?
│
│   ⦿ showerthoughts
│   ⦿ lulcat \`text\`

│   ⦿ translate \`language\` \`reply\`
│   ⦿ wiki \`text\`
│   ⦿ urlshort \`url\`
│   ⦿ pickup
│   ⦿ landscape
│   ⦿ landscape \`text\`
│   ⦿ portrait
│   ⦿ portrait \`text\`
│   ⦿ mal \`text\`
│   ⦿ mdl \`text\`
│   ⦿ pin add
│   ⦿ pin remove
│   ⦿ sadcat \`text\`
 
│   ⦿ pika \`text\`
│   ⦿ god \`text\`
│   ⦿ qrcode \`text\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help2 = `
⋆｡° Hello %USER%, is there any questions you may have?
│
│   ⦿ verse today
│   ⦿ verse random
│   ⦿ verse \`book\` \`chapter\`: \`verse\`
│   ⦿ animeqoute
│   ⦿ bgremove
│   ⦿ motivate
│   ⦿ inspiration
│   ⦿ advice
│   ⦿ alert \`text\`
│   ⦿ meme
│   ⦿ lovetest \`@name1\`: \`@name2\`
│   ⦿ drake \`text1\`: \`text2\`
│   ⦿ pooh \`text1\`: \`text2\`
│   ⦿ oogway \`text\`
│   ⦿ caution \`text\`
│   ⦿ element \`name\`
│   ⦿ imdb \`title\`
│   ⦿ steam \`name\`
│   ⦿ npm \`name\`
│   ⦿ wfind \`text\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help3 = `
⋆｡° Hello %USER%, how can i assist you further?
│
│   ⦿ mnm ^^

│   ⦿ stalk ^^
│   ⦿ invert ^^
│   ⦿ greyscale ^^
│   ⦿ lick ^^
│   ⦿ hug ^^
│   ⦿ jokeover ^^
│   ⦿ cuddle ^^
│   ⦿ kiss ^^
│   ⦿ pet ^^
│   ⦿ jail ^^
│   ⦿ communist ^^
│   ⦿ wanted ^^
│   ⦿ gun ^^
│   ⦿ drip ^^
│   ⦿ clown ^^
│   ⦿ uncover ^^
│   ⦿ advert ^^
│   ⦿ blur ^^
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help4 = `
⋆｡° If you have any issue please do let me know.
│
│   ⦿ morse \`text\`
│   ⦿ joke
│   ⦿ profilepic
│   ⦿ wyr
│   ⦿ userlist

│   ⦿ car
│   ⦿ rcolor
│   ⦿ ship @mention @mention
│   ⦿ www @mention @mention
│   ⦿ trump \`text\`
│   ⦿ mock \`text\`
│   ⦿ reverseText \`text\`
│   ⦿ itunes \`title\`
│   ⦿ coding
│   ⦿ newyear
│   ⦿ christmas
│   ⦿ barrier
│   ⦿ dyk
│   ⦿ thoughts
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help5 = `
⋆｡° Here:
│
│   ⦿ totext
│   ⦿ nba \`name\`
│   ⦿ doublestruck \`text\`
│   ⦿ count
│   ⦿ count --vowels
│   ⦿ count --consonants
│   ⦿ time
│   ⦿ time \`timezone\`
│   ⦿ anime \`category\`
│       waifu, neko, shinobu, megumin,
│       bully, cuddle, cry, hug,
│       awoo, kiss, lick, headpat,
│       smug, bonk, yeet, blush,
│       smile, wave, highfive, handhold,
│       nom, bite, glomp, slap,
│       kill, kick, happy, wink,
│       poke, dance and cringe
│   ⦿ hanime \`category\`
│   ⦿ fbdl \`url\`
│   ⦿ ugly
│   ⦿ rugly
│   ⦿ ascii
│   ⦿ rascii
│   ⦿ top
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help6 = `
⋆｡° 7th command list:
│
│   ⦿ encodeBinary \`text\`
│   ⦿ decodeBinary \`text\`
│   ⦿ sayjap \`text\`
│   ⦿ mathfacts
│   ⦿ ss \`url\`
│   ⦿ traceroute \`url\`
│   ⦿ nslookup \`url\`
│   ⦿ header \`url\`
│   ⦿ pair
│   ⦿ rpair
│   ⦿ checkPicture
│   ⦿ conan
│   ⦿ summ \`text\`
│   ⦿ gcolor \`theme\`
│       DefaultBlue, HotPink, AquaBlue, BrightPurple
│       CoralPink, Orange, Green, LavenderPurple
│       Red, Yellow, TealBlue, Aqua
│       Mango, Berry, Citrus, Candy
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help7 = `
⋆｡° Here is the 8th cmd list %USER%
│
│   ⦿ encrypt \`text\`
│   ⦿ decrypt \`text\` \`key1\`:\`key2\`
│   ⦿ facts \`text\`
│   ⦿ pat ^^
│   ⦿ blush ^^
│   ⦿ highfive ^^
│   ⦿ slap ^^
│   ⦿ bite ^^
│   ⦿ pat ^^
│   ⦿ encode64 \`text\`
│   ⦿ decode64 \`text\`
│   ⦿ tagalogSupport \`on⎨off\`
│   ⦿ textToSpeech \`on⎨off\`
│   ⦿ meowfacts
│   ⦿ dns4 \`url\`
│   ⦿ dns6 \`url\`
│   ⦿ musiclyric \`title\`
│   ⦿ videolyric \`title\`
│   ⦿ formatNumbers \`numbers\`
│   ⦿ fbi
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let help8 = `
⋆｡° Hello %USER%, here is the last page of the command list.
│
│   ⦿ datefacts
│   ⦿ triviafacts
│   ⦿ yearfacts
│   ⦿ covid
│   ⦿ covid \`country\`
│   ⦿ parseImage \`url\`
│   ⦿ ping \`url\`
│   ⦿ dictionary \`text\`
│   ⦿ say \`text\`
│   ⦿ baybayin \`text\`
│   ⦿ weather \`location\`
│   ⦿ music \`text\`
│   ⦿ video \`text\`
│   ⦿ lyrics \`text\`
│   ⦿ github \`username\`
│   ⦿ kick ^^
│   ⦿ wink ^^
│   ⦿ poke ^^
│   ⦿ cringe ^^
│   ⦿ kill ^^
│   ⦿ smug ^^ 
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let helpadmin = `
⋆｡° Hello %USER%, this is the admin panel.
│
│   ⦿ unsend
│   ⦿ unsend \`on⎨off\`
│   ⦿ delay \`on⎨off\`
│   ⦿ nsfw \`on⎨off\`
│   ⦿ debug \`on⎨off\`
│   ⦿ antiLeave \`on⎨off\`
│   ⦿ simultaneousExecution \`on⎨off\`
│   ⦿ clearCache
│   ⦿ refreshState
│   ⦿ saveState
│   ⦿ fontIgnore ^^
│   ⦿ isBot ^^
│   ⦿ kickUser ^^
│   ⦿ blockUser ^^
│   ⦿ unblockUser ^^
│   ⦿ blockthread
│   ⦿ blockthread \`threadid\`
│   ⦿ unblockthread
│   ⦿ unblockthread \`threadid\`
│   ⦿ setPrefix \`prefix\`
│   ⦿ remPrefix
│   ⦿ ignore \`prefix\`
│   ⦿ setKey \`name\`:\`key\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let helpuser = `
⋆｡° Hello %USER%, this is the command list for user.
│
│   ⦿ setTimezone \`timezone\`
│   ⦿ uid 
│   ⦿ mute
│   ⦿ unmute
│   ⦿ smartReply \`on⎨off\`
│   ⦿ setNickname \`text\`
│   ⦿ acceptMessageRequest
│   ⦿ rname
│   ⦿ balance
│   ⦿ setBirthday \`date\`
│   ⦿ setGender \`gender\`
│   ⦿ setUsername \`username\`
│   ⦿ setAddress \`address\`
│   ⦿ setBio \`info\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let helpgroup = `
⋆｡° Hello %USER%, this is the command list for groups.
│
│   ⦿ gname
│   ⦿ ginfo
│   ⦿ guid
│   ⦿ gphoto
│   ⦿ addUser \`uid\`
│   ⦿ everyone
│   ⦿ gemoji \`emoji\`
│   ⦿ gmember
│ 
└─  ` + footer[Math.floor(Math.random() * footer.length)];

let helproot = `
⋆｡° Hello %USER%, you reached the root user command list.
│
│   ⦿ addInstance
│   ⦿ left
│   ⦿ logout
│   ⦿ addCORS \`url\`
│   ⦿ remCORS \`url\`
│   ⦿ shell \`code\`
│   ⦿ git \`code\`
│   ⦿ sql \`query\`
│   ⦿ stop
│   ⦿ sync
│   ⦿ exit
│   ⦿ push
│   ⦿ resume
│   ⦿ restart
│   ⦿ notify
│   ⦿ destroy
│   ⦿ addAdmin ^^
│   ⦿ remAdmin ^^
│   ⦿ unblockAll
│   ⦿ unblockAll --bot
│   ⦿ acceptMessageRequest \`threadid\`
│   ⦿ acceptFriendRequest \`uid\`
│   ⦿ changeBio \`text\`
│   ⦿ angry \`on⎨off\`
│   ⦿ setMaxImage \`integer\`
│   ⦿ setTextComplextion \`complextion\`
│   ⦿ setMaxTokens \`integer\`
│   ⦿ setTemperature \`integer\`
│   ⦿ setFrequencyPenalty \`integer\`
│   ⦿ setProbabilityMass \`integer\`
│   ⦿ setAutoMarkRead \`on⎨off\`
│   ⦿ setOnline \`on⎨off\`
│   ⦿ setSelfListen \`on⎨off\`
│   ⦿ setSendTypingIndicator \`on⎨off\`
│   ⦿ setAutoMarkDelivery \`on⎨off\`
│   ⦿ setPresence \`on⎨off\`
│   ⦿ setReportingThread \`threadid\`
│
└─  ` + footer[Math.floor(Math.random() * footer.length)];

module.exports = {
    help: help,
    help1: help1,
    help2: help2,
    help3: help3,
    help4: help4,
    help5: help5,
    help6: help6,
    help7: help7,
    help8: help8,
    helpadmin: helpadmin,
    helproot: helproot,
    helpuser: helpuser,
    helpgroup: helpgroup,
};

// 268 commands