const utils = require("../utils.js");

module.exports = function (defaultFuncs, api, ctx) {
    return function setAdminStatus(threadID, adminIDs, adminStatus, callback) {
        if (utils.getType(threadID) !== "String") {
            throw { error: "setAdminStatus: threadID must be a string" };
        }

        if (utils.getType(adminIDs) === "String") {
            adminIDs = [adminIDs];
        }

        if (utils.getType(adminIDs) !== "Array") {
            throw { error: "setAdminStatus: adminIDs must be an array or string" };
        }

        if (utils.getType(adminStatus) !== "Boolean") {
            throw { error: "setAdminStatus: adminStatus must be a string" };
        }

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

        if (utils.getType(callback) !== "Function" && utils.getType(callback) !== "AsyncFunction") {
            throw { error: "setAdminStatus: callback is not a function" };
        }

        let form = {
            thread_fbid: threadID,
        };

        let i = 0;
        for (let u of adminIDs) {
            form[`admin_ids[${i++}]`] = u;
        }
        form["add"] = adminStatus;

        defaultFuncs
            .post("https://www.facebook.com/messaging/save_admins/?dpr=1", ctx.jar, form)
            .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
            .then(function (resData) {
                if (resData.error) {
                    switch (resData.error) {
                        case 1976004:
                            throw { error: "Cannot alter admin status: you are not an admin.", rawResponse: resData };
                        case 1357031:
                            throw { error: "Cannot alter admin status: this thread is not a group chat.", rawResponse: resData };
                        default:
                            throw { error: "Cannot alter admin status: unknown error.", rawResponse: resData };
                    }
                }

                callback();
            })
            .catch(function (err) {
                return callback(err);
            });

        return returnPromise;
    };
};
