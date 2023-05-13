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

"use strict";

let help = `
Hello %USER%, here is the page 1 of 9 command list.

   ⦿ cmd 
   ⦿ cmd [number|all]
   ⦿ cmd [user|group]
   ⦿ cmd [admin|root]
   ⦿ stats|uptime|sysinfo
   ⦿ sendReport [text]
   ⦿ search [text]
   ⦿ searchincog [text]
   ⦿ searchimg [text]
   ⦿ searchimg --reverse
   ⦿ createimg [text]
   ⦿ run [lang] [reply]
       Java, Python, C, C++,
       JavaScript, PHP and Dragon
   
   And here's the AI commands,

    ⦿ mj [text]
    ⦿ melbin [text]
    ⦿ sim [text]
    ⦿ misaka [text]
    ⦿ codex [text]
    ⦿ openai [text]
    ⦿ chatgpt [text]
    ⦿ chad [text]
    ⦿ bing [text]
    ⦿ bard [text]
    ⦿ nraf [text]
    ⦿ skynet [text]
    ⦿ david [text]

If you have further questions, i am here to help you.
`;

let help1 = `
Hello %USER%, here is the page 2 of 9 command list.

   ⦿ thoughts
   ⦿ lulcat [text]
   ⦿ gemoji [emoji]

   ⦿ wiki [text]
   ⦿ urlshort [url]
   ⦿ pickup
   ⦿ landscape
   ⦿ landscape [text]
   ⦿ portrait
   ⦿ portrait [text]
   ⦿ solve [equation]
   ⦿ roi [revenue] [cost]
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
Hello %USER%, here is the page 3 of 9 command list.

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
Hello %USER%, here is the page 4 of 9 command list.

   ⦿ mnm ^^
   ⦿ trump ^^
   ⦿ parseFacebook ^^
   ⦿ invert ^^
   ⦿ greyscale ^^
   ⦿ ship @mention @mention
   ⦿ www @mention @mention
   ⦿ jokeover ^^
   ⦿ translate [text] to [language]
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
Hello %USER%, here is the page 5 of 9 command list.


   ⦿ morse [text]
   ⦿ joke
   ⦿ profilepic
   ⦿ wyr
   ⦿ 8ball
   ⦿ gmember
   ⦿ car
   ⦿ color

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

If you have any issues please let me know.
`;

let help5 = `
Hello %USER%, here is the page 6 of 9 command list.
 
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
   ⦿ animeinfo [text]
   ⦿ animesearch [text]
   ⦿ animegenre [text]
   ⦿ animetop
   ⦿ animetop --movie
   ⦿ hanime [category]

You can only add one category to the command else it won't gonna work. Trust Me.
`;

let help6 = `
Hello %USER%, here is the page 7 of 9 command list.

   ⦿ encodeBinary [text]
   ⦿ decodeBinary [text]
   ⦿ sayjap [text]
   ⦿ mathfacts
   ⦿ website [urrl]
   ⦿ mean [numbers]
   ⦿ median [numbers]
   ⦿ mode [numbers]
   ⦿ range [numbers]
   ⦿ divisible [number] [number]
   ⦿ factorial [number]
   ⦿ findGCD [number]
 
   ⦿ summ [text]
   ⦿ gcolor [theme]
       DefaultBlue, HotPink, AquaBlue, BrightPurple
       CoralPink, Orange, Green, LavenderPurple
       Red, Yellow, TealBlue, Aqua
       Mango, Berry, Citrus, Candy

I hate math, are you too??
`;

let help7 = `
Hello %USER%, here is the page 8 of 9 command list.

   ⦿ conan
   ⦿ encrypt [text]
   ⦿ decrypt [text] [key1]:[key2]
   ⦿ facts [text]





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
   ⦿ setkey [name]:[key]

You guessed it, Only admins of the AI can used this commands.
`;

let helpuser = `
Hello %USER%, this is the command list for user.

   ⦿ setTimezone [timezone]
   ⦿ uid 
   ⦿ mute
   ⦿ unmute
   ⦿ smartReply [on|off]
   ⦿ setBirthday [date]
   ⦿ setGender [gender]
   ⦿ setUsername [username]
   ⦿ setAddress [address]
   ⦿ setBio [info]
   ⦿ setNickname [text]

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

   ⦿ stop
   ⦿ resume
   ⦿ restart
   ⦿ notify
   ⦿ destroy
   ⦿ addPing [url]
   ⦿ remPing [url]
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

// total commands 233