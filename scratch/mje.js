const http = require("http");
const axios = require("axios");
const FormData = require("form-data")

const PORT = 80;
const HOST = "0.0.0.0";

const server1 = http.createServer(getRoutes()).listen(PORT, () => {
    console.log("server_running http://localhost:" + PORT);
});

async function main() {
    const form_data = new FormData();
    form_data.append("hello", "hi");
    console.log(form_data.getHeaders())
    let res = await axios.post("http://0.0.0.0/mj", form_data, {
        headers: form_data.getHeaders(),
    });
};

main();

function getRoutes() {
    return async function (req, res) {
        let ress = req.url;
        let url = ress.split("?")[0];
        console.log(req.method + " " + req.headers.origin + " " + url);
        if (url == "/mj" && req.method == "POST") { 
            console.log("body " + JSON.stringify(req.body))
        }
    };
}