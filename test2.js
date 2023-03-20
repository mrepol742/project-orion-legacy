var graph = require('fbgraph');

var options = {
    timeout:  3000
  , pool:     { maxSockets:  Infinity }
  , headers:  { connection:  "keep-alive" }
};
graph.setAccessToken("gsagseg");

graph.get("/zuck", function(err, res) {
  
    console.log(res); 
});