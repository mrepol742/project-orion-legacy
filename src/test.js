const welcomeGif = require("./welcome.js")


async function main() {
    console.log(await welcomeGif.generateWelcomeGif(__dirname + "/me.jpg", "Melvin Jones Gallano Repol", "HOC Enthusiasts. sfsdfds fds f dsf sd f sd", "199th member"));
}

main();