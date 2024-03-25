module.exports = function (defaultFuncs, api, ctx) {
    return function getCurrentUserID() {
        return ctx.userID;
    };
};
