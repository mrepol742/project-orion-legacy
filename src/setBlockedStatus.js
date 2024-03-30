var utils = require("../utils.js");

module.exports = function (defaultFuncs, api, ctx) {
    return function setBlockedStatus(userID, block, callback) {
        var resolveFunc = function () {};
        var rejectFunc = function () {};
        var returnPromise = new Promise(function (resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });

        if (!callback) {
            callback = function (err) {
                if (err) {
                    return rejectFunc(err);
                }
                resolveFunc();
            };
        }

        defaultFuncs
            .post(`https://www.facebook.com/messaging/${block ? "" : "un"}block_messages/`, ctx.jar, {
                fbid: userID,
            })
            .then(utils.saveCookies(ctx.jar))
            .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
            .then(function (resData) {
                if (resData.error) {
                    throw resData;
                }

                return callback();
            })
            .catch(function (err) {
                return callback(err);
            });
        return returnPromise;
    };
};
