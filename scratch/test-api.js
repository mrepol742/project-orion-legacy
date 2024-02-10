const fs = require("fs");

let settings = JSON.parse(fs.readFileSync("../data/accountPreferences.json", "utf8"));

for (pref in settings) {
    if (settings[pref].owner && settings[pref].owner == "61555574259943") {
        //settings[pref]["openai"] = "test";
    }
}

console.log(getApiKey("61555574259943"))
function getApiKey(login) {
    if (settings[login].openai) {
        return {
            apiKey: settings[login].openai,
        };
    }
    return {
        apiKey: settings.shared.apikey.ai,
    };
}
