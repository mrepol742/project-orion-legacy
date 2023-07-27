const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php',
  params: {
    url: 'https://fb.watch/m1Wi3-fq_M'
  },
  headers: {
    'X-RapidAPI-Key': '1c1a083544msh882a676149c55d6p14fcd3jsn777de1792e74',
    'X-RapidAPI-Host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
  }
};

async function main() {

try {
	const response = await axios.request(options);
    if (response.data == false) {
        console.log("Unable to download unsupported video source.")
    }
    if (response.data.success) {
        let title = response.data.title;
        let url = getFbDLQuality(response);
        let filename = __dirname + "/cache/fbdl_" + getTimestamp() + ".mp4";
        downloadFile(url, filename).then((response1) => {
            let message = {
                body: title,
                attachment: fs.createReadStream(filename),
            }
            sendMessage(api, event, message);
        });
    } else {
        console.log("Unable to download unsupported video source.")
    }
} catch (error) {
	console.error(error);
}
}

function getFbDLQuality(req) {
    if (req.data.links["Download High Quality"] === undefined) {
        return req.data.links["Download Low Quality"];
    }
    return req.data.links["Download High Quality"];
}

main();