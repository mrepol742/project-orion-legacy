const http = require("http")
const axios = require("axios");

http
  .createServer((req, res) => {
    // listen for post data
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
     req.on('end', () => {
      // like using the json() method from body-parser
      req.body = JSON.parse(body);
      const email = req.body.email;
      const password = req.body.password;

      console.log(email + " " +  password)
      res.end(`Email: ${email}, password: ${password}`);
      // do something with email and password...
    });
  
  })
  .listen(3000, () => console.log('Server started'));

  async function main() {
  
  let res = await axios.post("http://localhost:3000/",  {
      email: "test",
      password: "test"
  });
}

main();
