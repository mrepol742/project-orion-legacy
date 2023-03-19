var graph = require('fbgraph');

var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};
graph.setAccessToken("6628568379%7Cc1e620fa708a1d5696fb991c1bde5662");

graph.get("/zuck/picture?access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", function(err, res) {
    // returns the post id
    console.log(res); // { id: xxxxx}
});