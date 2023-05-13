const { Innertube, UniversalCache, Utils } = require( 'youtubei.js' );
const fs = require('fs');

(async () => {
  const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });

  const search = await yt.music.search('Umaba', { type: 'song' });
  if (search.results) {
  const stream = await yt.download(search.results[0].id, {
    type: 'audio+video',
    quality: 'best',
    format: 'mp4'
  });
  console.log(search.results[0].id + " " + search.results[0].title);

  const file = fs.createWriteStream(`test.mp4`);

  for await (chunk of Utils.streamToIterable(stream)) {
    file.write(chunk);
  }
  } else {
    console.log("Unfortunately i cannot find any relevant information about ");
  }
})();