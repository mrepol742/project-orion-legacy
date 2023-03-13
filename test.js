const axios = require('axios');
const FormData = require('form-data')

const OPENAI_API_KEY = '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';

const client = axios.create({
    headers: {
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
  });
  
  const params = {
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
  let aa = await openai.post("https://api.openai.com/v1/completions", params)
    .then((result) => {
        return result;
    })
    .catch((err) => {
     return err;
    });
    return aa;
}

async function  aa() {
let aaa = await createCompletions(params)
console.log(aaa);
}