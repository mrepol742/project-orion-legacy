/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

const welcomeGif = require("./welcome.js");


async function main() {
let time = new Date();

 //let b =   welcomeGif.generateWelcomeGif(__dirname + "/me.jpg", "Melvin Jones Gallano Repol", "HOC Enthusiasts. sfsdfds fds f dsf sd f sd", "199th member")
 //await Promise.all([b])  
  console.log(await welcomeGif.generateWelcomeGif(__dirname + "/me.jpg", "Melvin Jones Gallano Repol", "HOC Enthusiasts. sfsdfds fds f dsf sd f sd", "199th member"));
console.log(new Date() - time);
}

main();