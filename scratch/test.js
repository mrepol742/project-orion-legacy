const axios = require("axios");
const FormData = require("form-data");

const OPENAI_API_KEY = "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";

const client = axios.create({
    headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
    },
});

const params = {
    id: "cmpl-7BlVtrcMHjzfvlpPDw8O7yKYx8FLI",
    prompt: "How are you?",
    model: "text-davinci-003",
    max_tokens: 10,
    temperature: 0,
};

const openai = axios.create({
    headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
    },
});

async function createCompletions(params) {
    let aa = await openai
        .post("https://api.openai.com/v1/completions", params)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err;
        });
    return aa;
}

async function aa() {
    let aaa = await createCompletions(params);
    console.log(aaa);
}

aa();
