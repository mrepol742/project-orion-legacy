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

let help = `
Hello %USER%, how are you?

   ⦿ func 
       next, all, user, group,
       admin and root
   ⦿ stats
   ⦿ uptime
   ⦿ sysinfo
   ⦿ tokens
   ⦿ sendReport [text]
   ⦿ search [text]
   ⦿ searchincog [text]
   ⦿ searchimg [text]
   ⦿ searchimg --reverse
   ⦿ createimg [text]
   ⦿ mal [text]
   ⦿ run [lang] [reply]
       Java, Python, C, C++,
       JavaScript, PHP and Dragon
    ⦿ mj [text]
    ⦿ beshy [text]
    ⦿ melbin [text]
    ⦿ sim [text]
    ⦿ misaka [text]
    ⦿ codex [text]
    ⦿ openai [text]
    ⦿ chatgpt [text]
    ⦿ chad [text]
    ⦿ nraf [text]
    ⦿ skynet [text]

If you have further questions, i am here to help you.
`;

let help1 = `
Hello %USER%, how can i assist you?

   ⦿ showerthoughts
   ⦿ lulcat [text]
   ⦿ gemoji [emoji]
   ⦿ translate [language] [reply]
   ⦿ wiki [text]
   ⦿ urlshort [url]
   ⦿ pickup
   ⦿ landscape
   ⦿ landscape [text]
   ⦿ portrait
   ⦿ portrait [text]


   ⦿ pin add
   ⦿ pin remove
   ⦿ sadcat [text]
   ⦿ biden [text]
   ⦿ pika [text]
   ⦿ god [text]
   ⦿ qrcode [text]

Some of my commands works in any means you could imagine.
`;

let help2 = `
Hello %USER%, is there any questions you may have?

   ⦿ verse today
   ⦿ verse random
   ⦿ verse [book] [chapter]: [verse]
   ⦿ animeqoute
   ⦿ bgremove
   ⦿ motivate
   ⦿ inspiration
   ⦿ advice
   ⦿ alert [text]
   ⦿ meme
   ⦿ lovetest [name1]: [name2]
   ⦿ drake [text1]: [text2]
   ⦿ pooh [text1]: [text2]
   ⦿ oogway [text]
   ⦿ caution [text]
   ⦿ element [name]
   ⦿ imdb [title]
   ⦿ steam [name]
   ⦿ npm [name]
   ⦿ wfind [text]

The : divides the query into 2 sections the first one and second one.
`;

let help3 = `
Hello %USER%, how can i assist you further?

   ⦿ mnm ^^
   ⦿ trump ^^
   ⦿ stalk ^^
   ⦿ invert ^^
   ⦿ greyscale ^^
   ⦿ lick ^^
   ⦿ hug ^^
   ⦿ jokeover ^^
   ⦿ cuddle ^^
   ⦿ kiss ^^
   ⦿ pet ^^
   ⦿ jail ^^
   ⦿ communist ^^
   ⦿ wanted ^^
   ⦿ gun ^^
   ⦿ drip ^^
   ⦿ clown ^^
   ⦿ uncover ^^
   ⦿ advert ^^
   ⦿ blur ^^

The ^^ means my command support mentioned, reply, uid etc.. to work.
`;

let help4 = `
If you have any issue please do let me know.

   ⦿ morse [text]
   ⦿ joke
   ⦿ profilepic
   ⦿ wyr
   ⦿ 8ball
   ⦿ gmember
   ⦿ car
   ⦿ rcolor
   ⦿ ship @mention @mention
   ⦿ www @mention @mention
   ⦿ trump [text]
   ⦿ mock [text]
   ⦿ reverseText [text]
   ⦿ itunes [title]
   ⦿ coding
   ⦿ newyear
   ⦿ christmas
   ⦿ barrier
   ⦿ fact
   ⦿ thoughts

Do you have any questions about the command %USER%?
`;

let help5 = `
Here:
 
   ⦿ totext
   ⦿ nba [name]
   ⦿ doublestruck [text]
   ⦿ count
   ⦿ count --vowels
   ⦿ count --consonants
   ⦿ time
   ⦿ time [timezone]
   ⦿ anime [category]
       waifu, neko, shinobu, megumin,
       bully, cuddle, cry, hug,
       awoo, kiss, lick, pat,
       smug, bonk, yeet, blush,
       smile, wave, highfive, handhold,
       nom, bite, glomp, slap,
       kill, kick, happy, wink,
       poke, dance and cringe
   ⦿ hanime [category]
   ⦿ malga [text]
   ⦿ malne [text]




How can i assist you further %USER%?
`;

let help6 = `
7th command list:

   ⦿ encodeBinary [text]
   ⦿ decodeBinary [text]
   ⦿ sayjap [text]
   ⦿ mathfacts
   ⦿ ss [url]
   ⦿ nslookup [url]
   ⦿ header [url]
   ⦿ pair
   ⦿ rpair
   ⦿ checkPicture

   ⦿ conan
   ⦿ summ [text]
   ⦿ gcolor [theme]
       DefaultBlue, HotPink, AquaBlue, BrightPurple
       CoralPink, Orange, Green, LavenderPurple
       Red, Yellow, TealBlue, Aqua
       Mango, Berry, Citrus, Candy

Do you have anything in mind %USER%?
`;

let help7 = `
Here is the 8th cmd list %USER%

   ⦿ encrypt [text]
   ⦿ decrypt [text] [key1]:[key2]
   ⦿ facts [text]
   ⦿ pat ^^
   ⦿ blush ^^
   ⦿ highfive ^^
   ⦿ slap ^^
   ⦿ bite ^^
   ⦿ pat ^^
   ⦿ encode64 [text]
   ⦿ decode64 [text]
   ⦿ tagalogSupport [on|off]
   ⦿ textToSpeech [on|off]
   ⦿ meowfacts
   ⦿ dns4 [url]
   ⦿ dns6 [url]
   ⦿ musiclyric [title]
   ⦿ videolyric [title]
   ⦿ formatNumbers [numbers]
   ⦿ fbi

Wow, do you like me?
`;

let help8 = `
Hello %USER%, here is the last page of the command list.

   ⦿ datefacts
   ⦿ triviafacts
   ⦿ yearfacts
   ⦿ covid
   ⦿ covid [country]
   ⦿ parseImage [url]
   ⦿ ping [url]
   ⦿ dictionary [text]
   ⦿ say [text]
   ⦿ baybayin [text]
   ⦿ weather [location]
   ⦿ music [text]
   ⦿ video [text]
   ⦿ lyrics [text]
   ⦿ github [username]
   ⦿ kick ^^
   ⦿ wink ^^
   ⦿ poke ^^
   ⦿ cringe ^^
   ⦿ kill ^^
   ⦿ smug ^^ 

This is the end. Yes i know.
`;

let helpadmin = `
Hello %USER%, this is the admin panel.

   ⦿ unsend
   ⦿ unsend [on|off]
   ⦿ delay [on|off]
   ⦿ nsfw [on|off]
   ⦿ debug [on|off]
   ⦿ antiLeave [on|off]
   ⦿ simultaneousExecution [on|off]
   ⦿ clearCache
   ⦿ refreshState
   ⦿ saveState
   ⦿ fontIgnore ^^
   ⦿ isBot ^^
   ⦿ addAdmin ^^
   ⦿ remAdmin ^^
   ⦿ kickUser ^^
   ⦿ blockUser ^^
   ⦿ unblockUser ^^
   ⦿ blockGroup
   ⦿ unblockGroup
   ⦿ setPrefix [prefix]
   ⦿ remPrefix
   ⦿ ignore [prefix]
   ⦿ setKey [name]:[key]

You guessed it, Only admins of the AI can used this commands.
`;

let helpuser = `
Hello %USER%, this is the command list for user.

     addInstance
   ⦿ setTimezone [timezone]
   ⦿ uid 
   ⦿ mute
   ⦿ unmute
   ⦿ smartReply [on|off]
   ⦿ setNickname [text]
   ⦿ acceptMessageRequest
   ⦿ rname

   Note: This data will be used to make the AI response accurate
   ⦿ setBirthday [date]
   ⦿ setGender [gender]
   ⦿ setUsername [username]
   ⦿ setAddress [address]
   ⦿ setBio [info]

You can set those information to enable awesome features.
`;

let helpgroup = `
Hello %USER%, this is the command list for groups.

   ⦿ gname
   ⦿ ginfo
   ⦿ guid
   ⦿ gphoto
   ⦿ addUser [uid]
   ⦿ everyone

You can set those information to enable awesome features.
`;

let helproot = `
Hello %USER%, you reached the root user command list.

   ⦿ shell [code]
   ⦿ sql [query]
   ⦿ stop
   ⦿ sync
   ⦿ exit
   ⦿ push
   ⦿ resume
   ⦿ restart
   ⦿ notify
   ⦿ destroy
   ⦿ unblockAll
   ⦿ unblockAll --bot
   ⦿ acceptMessageRequest [threadid]
   ⦿ acceptFriendRequest [uid]
   ⦿ changeBio [text]
   ⦿ setMaxImage [integer]
   ⦿ setTextComplextion [complextion]
   ⦿ setMaxTokens [integer]
   ⦿ setTemperature [integer]
   ⦿ setFrequencyPenalty [integer]
   ⦿ setProbabilityMass [integer]
   ⦿ setAutoMarkRead [on|off]
   ⦿ setOnline [on|off]
   ⦿ setSelfListen [on|off]
   ⦿ setSendTypingIndicator [on|off]
   ⦿ setAutoMarkDelivery [on|off]
   ⦿ setPresence [on|off]
   ⦿ setReportingThread [uid]

Only the AI Administrator can use this command.
`;

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