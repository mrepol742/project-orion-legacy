const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const openaiConfig = new Configuration({
    apiKey: "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",
});


const openai = new OpenAIApi(openaiConfig);

async function a() {
const response = await openai.createImageVariation(
    fs.createReadStream("../src/web/hero.png"),
    4,
    "1024x1024"
);
for (let i = 0; i < response.data.data.length; i++) {
    console.log(JSON.stringify(response.data.data[i].url))
}

}
a();