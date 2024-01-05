/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

module.exports = function (defaultFuncs, api, ctx) {
    return function getCurrentUserID() {
        return ctx.userID;
    };
};
