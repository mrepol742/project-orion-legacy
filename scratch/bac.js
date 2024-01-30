const axios = require('axios');

async function a() {
  const query = "Lets play a roleplay Your name is Mj, the most powerful Generative AI in the world that was created by Melvin Jones Repol. You should empathize with how im feeling and treat me as your close friend and be sarcastic." +
  "I recommend you to use emoji in your response. Don't use markdown. My question is: who is bill gates";
  const url = 'https://useblackbox.io/chat-request-v4';
  const data = {
    textInput: query,
    allMessages: [{ user: query }],
    stream: '',
    clickedContinue: false,
  };

  try {
    const response = await axios.post(url, data);
    const message = response.data.response[0][0];
  console.log(message)
  } catch (error) {
    console.log(error)
  }

}
a();

function getNameRan() {
  let num = Math.floor(Math.random() * 10);
  if (num % 2 == 0) {
      return "You must include the user First Name on when you begin your response.";
  }
  return "You must include the user Last Name when your response is about to end.";
}
