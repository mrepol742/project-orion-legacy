const { Configuration, OpenAIApi } = require("openai");
const google = require("googlethis")
const fs = require("fs");

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
    const response = await openai.createTranscription(
        fs.createReadStream('tts_1685127377.mp3'), // The audio file to transcribe.
        "whisper-1")
        console.log(response.data.text);
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

async function getWebResults(ask) {
    const response = await google.search(ask, options);
    if (response.results.length != 0) {
    let construct = "Generate a response using this data if necessary. If the  user asking for time, music or video ignore this data.";
    if (response.featured_snippet.title != null && response.featured_snippet.description != null) {
       construct += "\n\nFeatured Snippet: " + response.featured_snippet.title + "\n" + response.featured_snippet.description + "\n" + response.featured_snippet.url;
    }
    construct += "\n\nTitle: " + response.results[0].title + "\nDescription: " + response.results[0].description;
    construct += "\n\nTitle: " + response.results[1].title + "\nDescription: " + response.results[1].description;
    construct += "\n\nTitle: " + response.results[2].title + "\nDescription: " + response.results[2].description;
    return construct;
}
return "";
    
}

main("what hapened to tome sizemore");