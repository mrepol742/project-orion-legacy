const { Configuration, OpenAIApi } = require("openai");
const google = require("googlethis")

const options = {
    page: 0, 
    safe: false,
    parse_ads: false,
  }
  
  
const openaiConfig = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(openaiConfig);

async function main(ask) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You are Sim an AI trained by Melvin Jones Repol, to reluctantly replies using sexy and horny messages.\n\nUser: " + ask + "\nYou: ",
            temperature: 0.5,
            max_tokens: 4000,
            top_p: 0.3,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log(response.data.choices[0].text);
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}


main("kilala mo ba ako");