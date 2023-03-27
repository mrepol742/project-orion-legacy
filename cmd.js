"use strict";

let help = `
_______  Project Orion 1/9  _______

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
   ⦿ dictionary [text]
   ⦿ say [text]
   ⦿ baybayin [text]
   ⦿ weather [location]
   ⦿ music [text]
   ⦿ video [text]
   ⦿ lyrics [text]
   ⦿ github [username]
   ⦿ run [lang] [reply]
       Java, Python, C, C++,
       JavaScript, PHP and Dragon
   
   AI:
    ⦿ mj [text]
    ⦿ melbin [text]
    ⦿ sim [text]
    ⦿ misaka [text]
    ⦿ codex [text]
    ⦿ openai [text]
    ⦿ chatgpt [text]
    ⦿ chad [text]
__________________________________
`;

let help1 = `
_______  Project Orion 2/9  _______

   ⦿ thoughts
   ⦿ lulcat [text]
   ⦿ gemoji [emoji]
   ⦿ ig [username]
   ⦿ wiki [text]
   ⦿ urlshort [url]
   ⦿ pickup
   ⦿ landscape
   ⦿ landscape [text]
   ⦿ portrait
   ⦿ portrait [text]
   ⦿ problem [equation]
   ⦿ roi [revenue] [cost]
   ⦿ pin add
   ⦿ pin remove
   ⦿ sadcat [text]
   ⦿ biden [text]
   ⦿ pika [text]
   ⦿ god [text]
   ⦿ qrcode [text]
__________________________________
`;

let help2 = `
_______  Project Orion 3/9  _______

   ⦿ verse today
   ⦿ verse random
   ⦿ verse [book] [chapter]:[verse]
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
__________________________________
`;

let help3 = `
_______  Project Orion 4/9  _______

   ⦿ mnm [mention|me|name|url|uid|reply]
   ⦿ trump [mention|me|name|url|uid|reply]
   ⦿ parseFacebook [mention|me|name|url|uid|reply]
   ⦿ invert [mention|me|name|url|uid|reply]
   ⦿ greyscale [mention|me|name|url|uid|reply]
   ⦿ ship @mention @mention
   ⦿ www @mention @mention
   ⦿ jokeover [mention|me|name|url|uid|reply]
   ⦿ translate [text] to [language]
   ⦿ kiss [mention|me|name|url|uid|reply]
   ⦿ pet [mention|me|name|url|uid|reply]
   ⦿ jail [mention|me|name|url|uid|reply]
   ⦿ communist [mention|me|name|url|uid|reply]
   ⦿ wanted [mention|me|name|url|uid|reply]
   ⦿ gun [mention|me|name|url|uid|reply]
   ⦿ drip [mention|me|name|url|uid|reply]
   ⦿ clown [mention|me|name|url|uid|reply]
   ⦿ uncover [mention|me|name|url|uid|reply]
   ⦿ advert [mention|me|name|url|uid|reply]
   ⦿ blur [mention|me|name|url|uid|reply]
__________________________________
`;

let help4 = `
_______  Project Orion 5/9  _______

   ⦿ phub [text]
   ⦿ morse [text]
   ⦿ joke
   ⦿ profilepic
   ⦿ wyr
   ⦿ 8ball
   ⦿ gmember
   ⦿ car
   ⦿ color
   ⦿ animecouples
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
__________________________________
`;

let help5 = `
_______  Project Orion 6/9  _______
 
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
__________________________________
`;

let help6 = `
_______  Project Orion 7/9  _______

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
   ⦿ tiktok [username]
   ⦿ summ [text]
   ⦿ gcolor [theme]
       DefaultBlue, HotPink, AquaBlue, BrightPurple
       CoralPink, Orange, Green, LavenderPurple
       Red, Yellow, TealBlue, Aqua
       Mango, Berry, Citrus, Candy
__________________________________
`;

let help7 = `
_______  Project Orion 8/9  _______

   ⦿ conan
   ⦿ encrypt [text]
   ⦿ decrypt [text] [key1]:[key2]
   ⦿ facts [text]
   ⦿ cosplay
   ⦿ motor
   ⦿ darkjoke
   ⦿ blackpink
   ⦿ hololive
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
 __________________________________
`;

let help8 = `
_______  Project Orion 9/9  _______

   ⦿ datefacts
   ⦿ triviafacts
   ⦿ yearfacts
   ⦿ covid
   ⦿ covid [country]
   ⦿ parseImage [url]
   ⦿ ping [url]
__________________________________
`;

let helpadmin = `
_______  Project Orion Admin  _______

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
   ⦿ fontIgnore [mention|name|url|uid|reply]
   ⦿ isBot [mention|name|url|uid|reply]
   ⦿ addAdmin [mention|name|url|uid|reply]
   ⦿ remAdmin [mention|name|url|uid|reply]
   ⦿ kickUser [mention|name|url|uid|reply]
   ⦿ blockUser [mention|name|url|uid|reply]
   ⦿ unblockUser [mention|name|url|uid|reply]
   ⦿ blockGroup
   ⦿ unblockGroup
   ⦿ setPrefix [prefix]
   ⦿ remPrefix
   ⦿ ignore [prefix]
   ⦿ setkey [name]:[key]
____________________________________
`;

let helpuser = `
_______  Project Orion User  _______

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
____________________________________
`;


let helpgroup = `
_______  Project Orion Group  _______

   ⦿ gname
   ⦿ ginfo
   ⦿ guid
   ⦿ gphoto
   ⦿ addUser [uid]
   ⦿ everyone
____________________________________
`;

let helproot = `
_______  Project Orion Root  _______

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
____________________________________
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

// total commands 230