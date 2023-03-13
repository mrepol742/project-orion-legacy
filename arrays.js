"use strict";

let isMyPrefixList = ["mj", "melvin", "melvinjones", "melvinjonesgallanorepol", "repol", "melvinjonesrepol", "mrepol742", "misaka", "search"];
let sup = ["I'm tired", "Not much, you?", "Meh...", "I'm great, how about you?", "What's up with you?", "Nothing much, you?"];
let hey = ["Sup", "Hey :D", "hey", "yup?", "yes?", "How are you?", "How you doing?", "wassup", "whats new?", "how can i help you?", "hello", "hi", "hellooooo", "hiiiiii"];
let heyMelbin = ["Sup!!", "hey you!", "why!", "no?", "How are you!", "How you doing!", "wassup!", "whats new!", "how can i suss you!", "hello!!", "hi!!", "hellooooo...", "hiiiiii...."];
let heySim = ["Sup uhhhh", "heyyyyyyy", "yes i like that.", "Ho-w ar-e yo-u?", "Ughhh how you doinggg?", "wassup but i like wassdown..", "whats new or whats that uhg", "how can i _**;' you?", "hello", "hi", "hellooooo", "hiiiiii"];
let unsendMessage = ["deleted the following.", "unsent the following.", "tries to delete this message.", "removed a message that contains:", "remove a message.", "tries conceal this information."];
let idknow = [
    "Can you clarify what do you mean by that. It seems i have problems trying to understand what you want me to do.",
    "Please elaborate on what you mean by that. I seem to be struggling to comprehend what you want me to do.",
    "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do.",
    "Could you please elaborate on what you mean? Trying to grasp what you want me to accomplish seems to be a challenge for me.",
    "Could you please explain what you mean by that? It appears that I am finding it difficult to comprehend what you want me to do.",
];
let funD = ["🤣🤣🤣", "🤣", "😆😆", "😂😂🤣🤣", "😆😆🤣", "😂😆", "😆", "ahahaahh", "hahahahhah", "haahaaa", "ahhaa😂", "hhahahah😆", "🤣🤣hahaahhaha", "hahaa😆🤣"];
let mjme = ["Mj", "Melvin Jones Repol", "Melvin Jones Gallano Repol"];
let goodev = ["Good evening too... The sun set is so beautiful as always, hope you're seeing it too.", "Good evening, as well. As always, the sun set is quite lovely; I hope you can see it as well.", "Good evening as well... As always, the sun set is breathtaking; I hope you can see it too."];
let goodmo = [
    "Good morning too... Have a great day ahead, and always don't forget breakfast must be the heaviest meal of the day.",
    "Also good morning... Enjoy your day, and never forget that breakfast should always be the heaviest meal of the day.",
    "Greetings as well... Have a fantastic day, and never forget that breakfast ought to be the largest meal of the day.",
];
let goodni = ["Good night too... Have a nice and comfortable sleep, don't forget to wakeup early.", "Good night, as well. Sleep well and comfortably, and remember to get up early.", "Also good night. Enjoy a restful night's sleep, and remember to get up early."];
let goodaf = ["Good afternoon too... It's quite hot now.. Always remember to stay hydrated.", "Also good afternoon... Right now it's very hot. Never forget to drink plenty of water.", "Good afternoon, as well. Now that it's hot, Keep in mind to drink plenty of water."];
let sqq = ["in", "having", "an", "do", "does", "with", "are", "was", "the", "as far", "can you", "a", "did", "give", "example", "these", "those", "on", "is", "if", "for", "about", "gave", "there", "describe", "list", "identify", "write", "create"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let happyEE = ["haha", "ahah", "ahha", "funny ", "insane ", "lol", "lmao", "lmfao", "silly ", "laugh ", "laughable", "humorous", "amusing", "hilarious", "absurd", "ridicolous", "ludicrous", "entertaining"];
let sadEE = [
    "pain",
    "painful",
    "cry ",
    "crying ",
    "unhappy",
    "sad ",
    "tired",
    "sick ",
    "dejected",
    "regretful",
    "depressed",
    "downcast",
    "miserable ",
    "downhearted",
    "heartbroken",
    "wretched",
    "doleful",
    "low-spirited",
    "sorry",
    "disgraceful",
    "regrettable",
    "sorrowful",
    "upsetting",
    "traumatic",
    "truma",
    "pitiful",
    "depressing",
    "depress",
    "unfortunate",
    "awful",
    "miserable",
    "grievous",
    "cheerless",
];
let angryEE = ["angry", "irate", "irritated", "furious", "raving", "bitter", "hostile", "outraged", "incensed", "mad ", "filthy", "displeased", "provoked", "annoyed", "fury ", "rage ", "ire ", "wrath"];
let loveEE = ["love", "liking", "appreciation", "thank", "delight", "pleasure", "regards", "respects", "dear", "darling", "boyfriend", "girlfriend", "sweetheart", "angel", "honey", "adore", "treasure", "prize", "devotion", "friend"];
let sizesM = ["Bytes", "KB", "MB", "GB", "TB"];
let sendEffects = ["(sent with gift wrap effect)", "(sent with fire effect)", "(sent with celebration effect)", "(sent with love effect)"];
let example = ["For instance:", "For example:", "Like:", "Suppose that:", "e.g:", "In particular:", "To give you an idea:", "Let's say:", "Example:"];
let gcolor = {
    defaultblue: "196241301102133",
    hotpink: "169463077092846",
    aquablue: "2442142322678320",
    brightpurple: "234137870477637",
    coralpink: "980963458735625",
    orange: "175615189761153",
    green: "2136751179887052",
    lavenderpurple: "2058653964378557",
    red: "2129984390566328",
    yellow: "174636906462322",
    tealblue: "1928399724138152",
    aqua: "417639218648241",
    mango: "930060997172551",
    berry: "164535220883264",
    citrus: "370940413392601",
    candy: "205488546921017",
};
let gcolorn = ["defaultblue", "hotpink", "aquablue", "brightpurple", "coralpink", "orange", "green", "lavenderpurple", "red", "yellow", "tealblue", "aqua", "mango", "berry", "citrus", "candy"];
let qot1 = [
    "I'm Mj a ChatBot AI trained by billions of billions of parameters I could answer most of questions accurately, for list of commands message \"cmd\". If you have any questions don't hesitate to ask.",
    "I'm Mj, a ChatBot AI that was trained using a staggering number of parameters. If you have any questions, don't be afraid to ask. I was able to appropriately respond to the majority of inquiries regarding the list of commands message \"cmd\"",
    "I'm Mj, a ChatBot AI that has been trained on countless trillions of parameters. For the list of commands message \"cmd\". I was able to appropriately respond to the majority of inquiries. If you have any further questions, don't be afraid to ask.",
    "I'm an AI chatbot named Mj, and I was trained using a staggering number of parameters. If you have any questions, don't be afraid to ask. I could typically provide appropriate answers for questions involving the list of commands message \"cmd\".",
    "I'm Mj, a ChatBot AI that has been educated using countless trillions of parameters. If you have any questions, don't be afraid to ask. I was able to appropriately answer the majority of inquiries regarding the list of commands message \"cmd\".",
    "I'm Mj, a ChatBot AI that was trained using a staggering number of parameters. If you have any questions, don't be afraid to ask. I was able to appropriately respond to the majority of inquiries regarding the list of commands message \"cmd\".",
    "I'm an AI chatbot named Mj, and I was trained using a staggering number of parameters. If you have any questions, don't be afraid to ask. I could typically provide appropriate answers for questions involving the list of commands message \"cmd\".",
    "I'm Mj, a ChatBot AI that was trained using a staggering number of parameters. If you have any questions, don't be afraid to ask. I was able to appropriately respond to the majority of inquiries regarding the list of commands message \"cmd\".",
];

module.exports = {
    isMyPrefixList: isMyPrefixList,
    sup: sup,
    hey: hey,
    unsendMessage: unsendMessage,
    idknow: idknow,
    funD: funD,
    mjme: mjme,
    goodev: goodev,
    goodmo: goodmo,
    goodni: goodni,
    goodaf: goodaf,
    sqq: sqq,
    days: days,
    months: months,
    happyEE: happyEE,
    sadEE: sadEE,
    angryEE: angryEE,
    loveEE: loveEE,
    sizesM: sizesM,
    sendEffects: sendEffects,
    gcolor: gcolor,
    gcolorn: gcolorn,
    qot1: qot1,
    example: example,
    heyMelbin: heyMelbin,
    heySim: heySim
};
