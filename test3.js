const axios = require("axios");
const FormData = require("form-data");

async function doa() {
const form_data = new FormData();
form_data.append("query", "I am Test 3");
form_data.append("query1", "I am Test 3");
form_data.append("query2", "I am Test 3");
let res = await axios.post("http://127.0.0.1:7421/chat", form_data, {
    headers: form_data.getHeaders(),
});
console.log( res.data )
}
doa();