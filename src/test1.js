const { exec } = require('child_process');
exec("curl -I google.com", function (err, stdout, stderr) {
   console.log(stdout)
});