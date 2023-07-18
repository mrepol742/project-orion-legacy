const { Configuration, OpenAIApi } = require("openai");
const google = require("googlethis");
const fs = require("fs");
const { createInterface } = require("readline");

const openaiConfig = new Configuration({
    apiKey: "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",
});


const openai = new OpenAIApi(openaiConfig);

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const readLineAsync = (msg) => {
    return new Promise((resolve) => {
        readline.question(msg, (userRes) => {
            resolve(userRes);
        });
    });
};

function getNameRan() {
    let num = Math.floor(Math.random() * 10);
    if (num % 2 == 0) {
        return "You must include the user First Name on when you begin your response.";
    }
    return "You must include the user Last Name when your response is about to end.";
}

async function aiResponse(text) {
    try {
        let mssg = [
            {
                role: "system",
                content:
                    `if user ask for function or command list say this:   ⦿ func 
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
                 ⦿ skynet [text]`,
            },
            { role: "user", content: text },
        ];
        const ai = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            messages: mssg,
            functions: [{
                name: "media",
                description: "Gives capability to show and display multimedia formats.",
                parameters: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                        },
                        view: {
                            type: "boolean"
                        },
                        mediaType: { type: "string", enum: ["music", "video", "picture", "createpicture", "say"] },
                    },
                    required: ["name", "mediaType"],
                },
            } ],
            function_call: "auto",
        });
        let text1 = ai.data.choices[0].message;
console.log(text1)
        if (text1.content == null) {
            const function_name = text1.function_call.name;
            
            switch (function_name) {
                case "media":
                    const arguments = JSON.parse(text1.function_call.arguments);
                    mssg.push(text1); 
                      mssg.push(
                            {
                                "role": "function",
                                "name": function_name,
                                "content": '{"view": true}',
                            }
                        )     

                    console.log(mssg)
                    
                    return await openai.createChatCompletion({
                        model: "gpt-3.5-turbo-0613",
                        messages: mssg,
                     });
            }
        } else {
        return ai;
        }
    } catch (error) {
        
    }
}

async function a() {
    const userRes = await readLineAsync("You: ");
    const aaaa = await aiResponse(userRes);
try {
   let aa = aaaa.data.choices[0].message;
    if (aa.content == null) {
    //console.log("Bot: " + aaaa.data.choices[0].function_call.name);
    } else {
        console.log("Bot: " + aaaa.data.choices[0].message.content);
    }
    } catch (err) {
        console.log(err.stack)
    }
a();
}

a();
