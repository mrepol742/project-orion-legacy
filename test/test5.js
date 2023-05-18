let a = [
    {
        key: "sb",
        value: "T3OoYxBs6E23jJvXAJjX7iM7",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "dpr",
        value: "0.8999999761581421",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "datr",
        value: "NCdWZOuGtMalH5F6lGoZlo5g",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "wd",
        value: "1517x734",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "locale",
        value: "en_US",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "c_user",
        value: "100071743848974",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "xs",
        value: "26%3AQeyH5aX3Jgh6Xw%3A2%3A1683907792%3A-1%3A3222%3A%3AAcXVtzgNxU5u0eUNe5tDfFNvYO41Ri3sazNePjjR778k",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
    {
        key: "fr",
        value: "09C3cMNzPCBLsozkf.AWUhO8KpoLfWunnZ_ISFE3FHwAY.BkX89U.dm.AAA.0.0.BkX89h.AWUOXkQQYCg",
        domain: "facebook.com",
        path: "/",
        hostOnly: false,
        creation: "2023-05-18T14:58:35.935Z",
        lastAccessed: "2023-05-18T14:58:35.935Z",
    },
];

function b(a) {
    if (Array.isArray(a)) {
        let score = 0;
        let id;
         for (let i = 0; i < a.length; i++) {
                if (Object.keys(a[i]).length != 7) {
                    console.log("Invalid Key.");
                    break;
                }
                if (Object.keys(a[i])[0] == "key") {
                    if (a[i].key == "c_user") {
                       id = a[i].value;
                    }
                    if (Object.keys(a[i])[1] == "value") {
                        if (Object.keys(a[i])[2] == "domain") {
                            if (a[i].domain != "facebook.com" && a[i].domain != "messenger.com") {
                                break;
                            }
                            if (Object.keys(a[i])[3] == "path") {
                                if (a[i].path != "/") {
                                    break;
                                }
                                if (Object.keys(a[i])[4] == "hostOnly") {
                                    if (a[i].hostOnly != false) {
                                        break;
                                    }
                                    if (Object.keys(a[i])[5] == "creation") {
                                        if (Object.keys(a[i])[6] == "lastAccessed") {
                                          score += 1;
                                        } else {
                                            break;
                                        }
                                    } else {
                                        break;
                                    }
                                } else {
                                    break;
                                }
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
            let totl =score == a.length;
        return {score: totl, uid: id}
    } else {
        return false;
    }
}
console.log(b(a).uid)
if (b(a).score) {
    console.log("Valid App State.");
} else {
    console.log("Invalid app state")
}