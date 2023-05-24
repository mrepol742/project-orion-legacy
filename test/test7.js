const fs = require("fs");

fs.readdir(__dirname + "/test/", function (err, files) {
    if (err) return utils.logged(err);
    if (files.length > 0) {
        let fe;
        for (fe = 0; fe < files.length; fe++) {
            let file = files[fe];
            fs.unlinkSync(__dirname + "/test/" + file, (err) => {
                if (err) utils.logged(err);
            });
        }
    }
}); 