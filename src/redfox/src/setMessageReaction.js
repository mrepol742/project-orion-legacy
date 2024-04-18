/*
 * This file is part of Project Orion.
 *
 * Portions of this file are derived from code licensed under the MIT License.
 *
 * The original code licensed under the MIT and its copyright information can be found at <https://github.com/mrepol742/project-orion/blob/master/src/redfox/LICENSE/>.
 *
 * This file is also subject to the terms and conditions of the GNU General Public License (GPL) vesion 3.0 License, a copy of which can be found in the LICENSE file at the root of this distribution.
 *
 * Copyright (c) 2022 Melvin Jones
 */

const path = require("path");
var utils = require(path.join(__dirname, '..', 'utils'));

module.exports = function (defaultFuncs, api, ctx) {
    return function setMessageReaction(reaction, messageID, callback, forceCustomReaction) {
        var resolveFunc = function () {};
        var rejectFunc = function () {};
        var returnPromise = new Promise(function (resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });

        if (!callback) {
            callback = function (err, friendList) {
                if (err) {
                    return rejectFunc(err);
                }
                resolveFunc(friendList);
            };
        }

        var variables = {
            data: {
                client_mutation_id: ctx.clientMutationId++,
                actor_id: ctx.userID,
                action: reaction == "" ? "REMOVE_REACTION" : "ADD_REACTION",
                message_id: messageID,
                reaction: reaction,
            },
        };

        var qs = {
            doc_id: "1491398900900362",
            variables: JSON.stringify(variables),
            dpr: 1,
        };

        defaultFuncs
            .postFormData("https://www.facebook.com/webgraphql/mutation/", ctx.jar, {}, qs)
            .then(utils.parseAndCheckLogin(ctx.jar, defaultFuncs))
            .then(function (resData) {
                if (!resData) {
                    throw { error: "glowingheart returned empty object." };
                }
                if (resData.error) {
                    throw resData;
                }
                callback(null);
            })
            .catch(function (err) {
                return callback(err);
            });

        return returnPromise;
    };
};
