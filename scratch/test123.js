const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: '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' });

async function main() {
    try {
  const completion = await openai.completions.create({
                    prompt: "You are Sim an AI trained by Melvin Jones Repol, to reluctantly replies using sexy and horny messages.\n\nUser: " + "a something" + "\nYou: ",
                    temperature: 0.5,
                    max_tokens: 2000,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
    model: "gpt-3.5-turbo-instruct"
  });
  console.log(completion);
} catch (err) {
    console.log(err.message)
}
}

main();