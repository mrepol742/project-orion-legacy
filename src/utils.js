/* eslint-disable no-prototype-builtins */
var bluebird = require("bluebird");
var request = bluebird.promisify(require("request").defaults({ jar: true }));
var stream = require("stream");
var querystring = require("querystring");
var url = require("url");
var fsp = require("fs/promises");
var path = require("path");
var os = require("os");
var crypto = require("crypto");

let oldCPUTime = 0;
let oldCPUIdle = 0;

function logged(data) {
    if (typeof data === "string") {
        let d = data.normalize("NFKC").split(" ");
        if (d[0].includes("_")) {
            let db = d[0];
            let db1 = d[1] + "";
            d.shift();
            if (db1.length > 14 && /^\d+$/.test(parseInt(db1))) {
                d.shift();
                console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", "\x1b[40m", db, "\x1b[0m", "\x1b[34m", db1, "\x1b[0m", d.join(" "));
            } else {
                console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", "\x1b[40m", db, "\x1b[0m", d.join(" "));
            }
        } else {
            console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", d.join(" "));
        }
    } else {
        console.log("\x1b[36m[", getCurrentTime(), "]\x1b[0m", data);
    }
}

function getCurrentTime() {
    let options = {
            timeZone: "Asia/Manila",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        },
        formatter = new Intl.DateTimeFormat([], options);
    return formatter.format(new Date());
}

function setProxy(url) {
    if (!url)
        return (request = bluebird.promisify(
            require("request").defaults({
                jar: true,
            })
        ));
    return (request = bluebird.promisify(
        require("request").defaults({
            jar: true,
            proxy: url,
        })
    ));
}

function getHeaders(url, options, ctx, customHeader) {
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.facebook.com/",
        Host: url.replace("https://", "").split("/")[0],
        Origin: "https://www.facebook.com",
        "User-Agent": options.userAgent,
        Connection: "keep-alive",
    };
    if (customHeader) {
        Object.assign(headers, customHeader);
    }
    if (ctx && ctx.region) {
        headers["X-MSGR-Region"] = ctx.region;
    }

    return headers;
}

function isReadableStream(obj) {
    return obj instanceof stream.Stream && (getType(obj._read) === "Function" || getType(obj._read) === "AsyncFunction") && getType(obj._readableState) === "Object";
}

function get(url, jar, qs, options, ctx) {
    // I'm still confused about this
    if (getType(qs) === "Object") {
        for (var prop in qs) {
            if (qs.hasOwnProperty(prop) && getType(qs[prop]) === "Object") {
                qs[prop] = JSON.stringify(qs[prop]);
            }
        }
    }
    var op = {
        headers: getHeaders(url, options, ctx),
        timeout: 90000,
        qs: qs,
        url: url,
        method: "GET",
        jar: jar,
        gzip: true,
    };

    return request(op).then(function (res) {
        return res[0];
    });
}

function post(url, jar, form, options, ctx, customHeader) {
    var op = {
        headers: getHeaders(url, options, ctx, customHeader),
        timeout: 90000,
        url: url,
        method: "POST",
        form: form,
        jar: jar,
        gzip: true,
    };

    return request(op).then(function (res) {
        return res[0];
    });
}

function postFormData(url, jar, form, qs, options, ctx) {
    var headers = getHeaders(url, options, ctx);
    headers["Content-Type"] = "multipart/form-data";
    var op = {
        headers: headers,
        timeout: 90000,
        url: url,
        method: "POST",
        formData: form,
        qs: qs,
        jar: jar,
        gzip: true,
    };

    return request(op).then(function (res) {
        return res[0];
    });
}

function padZeros(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
}

function generateThreadingID(clientID) {
    var k = Date.now();
    var l = Math.floor(Math.random() * 4294967295);
    var m = clientID;
    return "<" + k + ":" + l + "-" + m + "@gmail.com>";
}

function binaryToDecimal(data) {
    var ret = "";
    while (data !== "0") {
        var end = 0;
        var fullName = "";
        var i = 0;
        for (; i < data.length; i++) {
            end = 2 * end + parseInt(data[i], 10);
            if (end >= 10) {
                fullName += "1";
                end -= 10;
            } else {
                fullName += "0";
            }
        }
        ret = end.toString() + ret;
        data = fullName.slice(fullName.indexOf("1"));
    }
    return ret;
}

function generateOfflineThreadingID() {
    var ret = Date.now();
    var value = Math.floor(Math.random() * 4294967295);
    var str = ("0000000000000000000000" + value.toString(2)).slice(-22);
    var msgs = ret.toString(2) + str;
    return binaryToDecimal(msgs);
}

var h;
var i = {};
var j = {
    _: "%",
    A: "%2",
    B: "000",
    C: "%7d",
    D: "%7b%22",
    E: "%2c%22",
    F: "%22%3a",
    G: "%2c%22ut%22%3a1",
    H: "%2c%22bls%22%3a",
    I: "%2c%22n%22%3a%22%",
    J: "%22%3a%7b%22i%22%3a0%7d",
    K: "%2c%22pt%22%3a0%2c%22vis%22%3a",
    L: "%2c%22ch%22%3a%7b%22h%22%3a%22",
    M: "%7b%22v%22%3a2%2c%22time%22%3a1",
    N: ".channel%22%2c%22sub%22%3a%5b",
    O: "%2c%22sb%22%3a1%2c%22t%22%3a%5b",
    P: "%2c%22ud%22%3a100%2c%22lc%22%3a0",
    Q: "%5d%2c%22f%22%3anull%2c%22uct%22%3a",
    R: ".channel%22%2c%22sub%22%3a%5b1%5d",
    S: "%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a",
    T: "%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a",
    U: "%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",
    V: "%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a",
    W: "%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a",
    X: "%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1",
    Y: "%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",
    Z: "%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a",
};
(function () {
    var l = [];
    for (var m in j) {
        i[j[m]] = m;
        l.push(j[m]);
    }
    l.reverse();
    h = new RegExp(l.join("|"), "g");
})();

function presenceEncode(str) {
    return encodeURIComponent(str)
        .replace(/([_A-Z])|%../g, function (m, n) {
            return n ? "%" + n.charCodeAt(0).toString(16) : m;
        })
        .toLowerCase()
        .replace(h, function (m) {
            return i[m];
        });
}

// eslint-disable-next-line no-unused-vars
function presenceDecode(str) {
    return decodeURIComponent(
        str.replace(/[_A-Z]/g, function (m) {
            return j[m];
        })
    );
}

function generatePresence(userID) {
    var time = Date.now();
    return (
        "E" +
        presenceEncode(
            JSON.stringify({
                v: 3,
                time: parseInt(time / 1000, 10),
                user: userID,
                state: {
                    ut: 0,
                    t2: [],
                    lm2: null,
                    uct2: time,
                    tr: null,
                    tw: Math.floor(Math.random() * 4294967295) + 1,
                    at: time,
                },
                ch: {
                    ["p_" + userID]: 0,
                },
            })
        )
    );
}

function generateAccessiblityCookie() {
    var time = Date.now();
    return encodeURIComponent(
        JSON.stringify({
            sr: 0,
            "sr-ts": time,
            jk: 0,
            "jk-ts": time,
            kb: 0,
            "kb-ts": time,
            hcm: 0,
            "hcm-ts": time,
        })
    );
}

function getGUID() {
    /** @type {number} */
    var sectionLength = Date.now();
    /** @type {string} */
    var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        /** @type {number} */
        var r = Math.floor((sectionLength + Math.random() * 16) % 16);
        /** @type {number} */
        sectionLength = Math.floor(sectionLength / 16);
        /** @type {string} */
        var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
        return _guid;
    });
    return id;
}

function _formatAttachment(attachment1, attachment2) {
    // TODO: THIS IS REALLY BAD
    // This is an attempt at fixing Facebook's inconsistencies. Sometimes they give us
    // two attachment objects, but sometimes only one. They each contain part of the
    // data that you'd want so we merge them for convenience.
    // Instead of having a bunch of if statements guarding every access to image_data,
    // we set it to empty object and use the fact that it'll return undefined.
    attachment2 = attachment2 || { id: "", image_data: {} };
    attachment1 = attachment1.mercury ? attachment1.mercury : attachment1;
    var blob = attachment1.blob_attachment;
    var type = blob && blob.__typename ? blob.__typename : attachment1.attach_type;
    if (!type && attachment1.sticker_attachment) {
        type = "StickerAttachment";
        blob = attachment1.sticker_attachment;
    } else if (!type && attachment1.extensible_attachment) {
        if (attachment1.extensible_attachment.story_attachment && attachment1.extensible_attachment.story_attachment.target && attachment1.extensible_attachment.story_attachment.target.__typename && attachment1.extensible_attachment.story_attachment.target.__typename === "MessageLocation") {
            type = "MessageLocation";
        } else {
            type = "ExtensibleAttachment";
        }

        blob = attachment1.extensible_attachment;
    }
    // TODO: Determine whether "sticker", "photo", "file" etc are still used
    // KEEP IN SYNC WITH getThreadHistory
    switch (type) {
        case "sticker":
            return {
                type: "sticker",
                ID: attachment1.metadata.stickerID.toString(),
                url: attachment1.url,

                packID: attachment1.metadata.packID.toString(),
                spriteUrl: attachment1.metadata.spriteURI,
                spriteUrl2x: attachment1.metadata.spriteURI2x,
                width: attachment1.metadata.width,
                height: attachment1.metadata.height,

                caption: attachment2.caption,
                description: attachment2.description,

                frameCount: attachment1.metadata.frameCount,
                frameRate: attachment1.metadata.frameRate,
                framesPerRow: attachment1.metadata.framesPerRow,
                framesPerCol: attachment1.metadata.framesPerCol,

                stickerID: attachment1.metadata.stickerID.toString(), // @Legacy
                spriteURI: attachment1.metadata.spriteURI, // @Legacy
                spriteURI2x: attachment1.metadata.spriteURI2x, // @Legacy
            };
        case "file":
            return {
                type: "file",
                filename: attachment1.name,
                ID: attachment2.id.toString(),
                url: attachment1.url,

                isMalicious: attachment2.is_malicious,
                contentType: attachment2.mime_type,

                name: attachment1.name, // @Legacy
                mimeType: attachment2.mime_type, // @Legacy
                fileSize: attachment2.file_size, // @Legacy
            };
        case "photo":
            return {
                type: "photo",
                ID: attachment1.metadata.fbid.toString(),
                filename: attachment1.fileName,
                thumbnailUrl: attachment1.thumbnail_url,

                previewUrl: attachment1.preview_url,
                previewWidth: attachment1.preview_width,
                previewHeight: attachment1.preview_height,

                largePreviewUrl: attachment1.large_preview_url,
                largePreviewWidth: attachment1.large_preview_width,
                largePreviewHeight: attachment1.large_preview_height,

                url: attachment1.metadata.url, // @Legacy
                width: attachment1.metadata.dimensions.split(",")[0], // @Legacy
                height: attachment1.metadata.dimensions.split(",")[1], // @Legacy
                name: attachment1.fileName, // @Legacy
            };
        case "animated_image":
            return {
                type: "animated_image",
                ID: attachment2.id.toString(),
                filename: attachment2.filename,

                previewUrl: attachment1.preview_url,
                previewWidth: attachment1.preview_width,
                previewHeight: attachment1.preview_height,

                url: attachment2.image_data.url,
                width: attachment2.image_data.width,
                height: attachment2.image_data.height,

                name: attachment1.name, // @Legacy
                facebookUrl: attachment1.url, // @Legacy
                thumbnailUrl: attachment1.thumbnail_url, // @Legacy
                mimeType: attachment2.mime_type, // @Legacy
                rawGifImage: attachment2.image_data.raw_gif_image, // @Legacy
                rawWebpImage: attachment2.image_data.raw_webp_image, // @Legacy
                animatedGifUrl: attachment2.image_data.animated_gif_url, // @Legacy
                animatedGifPreviewUrl: attachment2.image_data.animated_gif_preview_url, // @Legacy
                animatedWebpUrl: attachment2.image_data.animated_webp_url, // @Legacy
                animatedWebpPreviewUrl: attachment2.image_data.animated_webp_preview_url, // @Legacy
            };
        case "share":
            return {
                type: "share",
                ID: attachment1.share.share_id.toString(),
                url: attachment2.href,

                title: attachment1.share.title,
                description: attachment1.share.description,
                source: attachment1.share.source,

                image: attachment1.share.media.image,
                width: attachment1.share.media.image_size.width,
                height: attachment1.share.media.image_size.height,
                playable: attachment1.share.media.playable,
                duration: attachment1.share.media.duration,

                subattachments: attachment1.share.subattachments,
                properties: {},

                animatedImageSize: attachment1.share.media.animated_image_size, // @Legacy
                facebookUrl: attachment1.share.uri, // @Legacy
                target: attachment1.share.target, // @Legacy
                styleList: attachment1.share.style_list, // @Legacy
            };
        case "video":
            return {
                type: "video",
                ID: attachment1.metadata.fbid.toString(),
                filename: attachment1.name,

                previewUrl: attachment1.preview_url,
                previewWidth: attachment1.preview_width,
                previewHeight: attachment1.preview_height,

                url: attachment1.url,
                width: attachment1.metadata.dimensions.width,
                height: attachment1.metadata.dimensions.height,

                duration: attachment1.metadata.duration,
                videoType: "unknown",

                thumbnailUrl: attachment1.thumbnail_url, // @Legacy
            };
        case "error":
            return {
                type: "error",

                // Save error attachments because we're unsure of their format,
                // and whether there are cases they contain something useful for debugging.
                attachment1: attachment1,
                attachment2: attachment2,
            };
        case "MessageImage":
            return {
                type: "photo",
                ID: blob.legacy_attachment_id,
                filename: blob.filename,
                thumbnailUrl: blob.thumbnail.uri,

                previewUrl: blob.preview.uri,
                previewWidth: blob.preview.width,
                previewHeight: blob.preview.height,

                largePreviewUrl: blob.large_preview.uri,
                largePreviewWidth: blob.large_preview.width,
                largePreviewHeight: blob.large_preview.height,

                url: blob.large_preview.uri, // @Legacy
                width: blob.original_dimensions.x, // @Legacy
                height: blob.original_dimensions.y, // @Legacy
                name: blob.filename, // @Legacy
            };
        case "MessageAnimatedImage":
            return {
                type: "animated_image",
                ID: blob.legacy_attachment_id,
                filename: blob.filename,

                previewUrl: blob.preview_image.uri,
                previewWidth: blob.preview_image.width,
                previewHeight: blob.preview_image.height,

                url: blob.animated_image.uri,
                width: blob.animated_image.width,
                height: blob.animated_image.height,

                thumbnailUrl: blob.preview_image.uri, // @Legacy
                name: blob.filename, // @Legacy
                facebookUrl: blob.animated_image.uri, // @Legacy
                rawGifImage: blob.animated_image.uri, // @Legacy
                animatedGifUrl: blob.animated_image.uri, // @Legacy
                animatedGifPreviewUrl: blob.preview_image.uri, // @Legacy
                animatedWebpUrl: blob.animated_image.uri, // @Legacy
                animatedWebpPreviewUrl: blob.preview_image.uri, // @Legacy
            };
        case "MessageVideo":
            return {
                type: "video",
                filename: blob.filename,
                ID: blob.legacy_attachment_id,

                previewUrl: blob.large_image.uri,
                previewWidth: blob.large_image.width,
                previewHeight: blob.large_image.height,

                url: blob.playable_url,
                width: blob.original_dimensions.x,
                height: blob.original_dimensions.y,

                duration: blob.playable_duration_in_ms,
                videoType: blob.video_type.toLowerCase(),

                thumbnailUrl: blob.large_image.uri, // @Legacy
            };
        case "MessageAudio":
            return {
                type: "audio",
                filename: blob.filename,
                ID: blob.url_shimhash,

                audioType: blob.audio_type,
                duration: blob.playable_duration_in_ms,
                url: blob.playable_url,

                isVoiceMail: blob.is_voicemail,
            };
        case "StickerAttachment":
            return {
                type: "sticker",
                ID: blob.id,
                url: blob.url,

                packID: blob.pack ? blob.pack.id : null,
                spriteUrl: blob.sprite_image,
                spriteUrl2x: blob.sprite_image_2x,
                width: blob.width,
                height: blob.height,

                caption: blob.label,
                description: blob.label,

                frameCount: blob.frame_count,
                frameRate: blob.frame_rate,
                framesPerRow: blob.frames_per_row,
                framesPerCol: blob.frames_per_column,

                stickerID: blob.id, // @Legacy
                spriteURI: blob.sprite_image, // @Legacy
                spriteURI2x: blob.sprite_image_2x, // @Legacy
            };
        case "MessageLocation":
            var urlAttach = blob.story_attachment.url;
            var mediaAttach = blob.story_attachment.media;

            var u = querystring.parse(url.parse(urlAttach).query).u;
            var where1 = querystring.parse(url.parse(u).query).where1;
            var address = where1.split(", ");

            var latitude;
            var longitude;

            try {
                latitude = Number.parseFloat(address[0]);
                longitude = Number.parseFloat(address[1]);
            } catch (err) {
                /* empty */
            }

            var imageUrl;
            var width;
            var height;

            if (mediaAttach && mediaAttach.image) {
                imageUrl = mediaAttach.image.uri;
                width = mediaAttach.image.width;
                height = mediaAttach.image.height;
            }

            return {
                type: "location",
                ID: blob.legacy_attachment_id,
                latitude: latitude,
                longitude: longitude,
                image: imageUrl,
                width: width,
                height: height,
                url: u || urlAttach,
                address: where1,

                facebookUrl: blob.story_attachment.url, // @Legacy
                target: blob.story_attachment.target, // @Legacy
                styleList: blob.story_attachment.style_list, // @Legacy
            };
        case "ExtensibleAttachment":
            return {
                type: "share",
                ID: blob.legacy_attachment_id,
                url: blob.story_attachment.url,

                title: blob.story_attachment.title_with_entities.text,
                description: blob.story_attachment.description && blob.story_attachment.description.text,
                source: blob.story_attachment.source ? blob.story_attachment.source.text : null,

                image: blob.story_attachment.media && blob.story_attachment.media.image && blob.story_attachment.media.image.uri,
                width: blob.story_attachment.media && blob.story_attachment.media.image && blob.story_attachment.media.image.width,
                height: blob.story_attachment.media && blob.story_attachment.media.image && blob.story_attachment.media.image.height,
                playable: blob.story_attachment.media && blob.story_attachment.media.is_playable,
                duration: blob.story_attachment.media && blob.story_attachment.media.playable_duration_in_ms,
                playableUrl: blob.story_attachment.media == null ? null : blob.story_attachment.media.playable_url,

                subattachments: blob.story_attachment.subattachments,
                properties: blob.story_attachment.properties.reduce(function (obj, cur) {
                    obj[cur.key] = cur.value.text;
                    return obj;
                }, {}),

                facebookUrl: blob.story_attachment.url, // @Legacy
                target: blob.story_attachment.target, // @Legacy
                styleList: blob.story_attachment.style_list, // @Legacy
            };
        case "MessageFile":
            return {
                type: "file",
                filename: blob.filename,
                ID: blob.message_file_fbid,

                url: blob.url,
                isMalicious: blob.is_malicious,
                contentType: blob.content_type,

                name: blob.filename,
                mimeType: "",
                fileSize: -1,
            };
        default:
            throw new Error("unrecognized attach_file of type " + type + "`" + JSON.stringify(attachment1, null, 4) + " attachment2: " + JSON.stringify(attachment2, null, 4) + "`");
    }
}

function formatAttachment(attachments, attachmentIds, attachmentMap, shareMap) {
    attachmentMap = shareMap || attachmentMap;
    return attachments
        ? attachments.map(function (val, i) {
              if (!attachmentMap || !attachmentIds || !attachmentMap[attachmentIds[i]]) {
                  return _formatAttachment(val);
              }
              return _formatAttachment(val, attachmentMap[attachmentIds[i]]);
          })
        : [];
}

function formatDeltaMessage(m) {
    var md = m.delta.messageMetadata;

    var mdata = m.delta.data === undefined ? [] : m.delta.data.prng === undefined ? [] : JSON.parse(m.delta.data.prng);
    var m_id = mdata.map((u) => u.i);
    var m_offset = mdata.map((u) => u.o);
    var m_length = mdata.map((u) => u.l);
    var mentions = {};
    for (var i = 0; i < m_id.length; i++) {
        mentions[m_id[i]] = m.delta.body.substring(m_offset[i], m_offset[i] + m_length[i]);
    }

    return {
        type: "message",
        senderID: formatID(md.actorFbId.toString()),
        body: m.delta.body || "",
        threadID: formatID((md.threadKey.threadFbId || md.threadKey.otherUserFbId).toString()),
        messageID: md.messageId,
        attachments: (m.delta.attachments || []).map((v) => _formatAttachment(v)),
        mentions: mentions,
        timestamp: md.timestamp,
        isGroup: !!md.threadKey.threadFbId,
    };
}

function formatID(id) {
    if (id != undefined && id != null) {
        return id.replace(/(fb)?id[:.]/, "");
    } else {
        return id;
    }
}

function formatMessage(m) {
    var originalMessage = m.message ? m.message : m;
    var obj = {
        type: "message",
        senderName: originalMessage.sender_name,
        senderID: formatID(originalMessage.sender_fbid.toString()),
        participantNames: originalMessage.group_thread_info ? originalMessage.group_thread_info.participant_names : [originalMessage.sender_name.split(" ")[0]],
        participantIDs: originalMessage.group_thread_info
            ? originalMessage.group_thread_info.participant_ids.map(function (v) {
                  return formatID(v.toString());
              })
            : [formatID(originalMessage.sender_fbid)],
        body: originalMessage.body || "",
        threadID: formatID((originalMessage.thread_fbid || originalMessage.other_user_fbid).toString()),
        threadName: originalMessage.group_thread_info ? originalMessage.group_thread_info.name : originalMessage.sender_name,
        location: originalMessage.coordinates ? originalMessage.coordinates : null,
        messageID: originalMessage.mid ? originalMessage.mid.toString() : originalMessage.message_id,
        attachments: formatAttachment(originalMessage.attachments, originalMessage.attachmentIds, originalMessage.attachment_map, originalMessage.share_map),
        timestamp: originalMessage.timestamp,
        timestampAbsolute: originalMessage.timestamp_absolute,
        timestampRelative: originalMessage.timestamp_relative,
        timestampDatetime: originalMessage.timestamp_datetime,
        tags: originalMessage.tags,
        reactions: originalMessage.reactions ? originalMessage.reactions : [],
        isUnread: originalMessage.is_unread,
    };

    if (m.type === "pages_messaging") obj.pageID = m.realtime_viewer_fbid.toString();
    obj.isGroup = obj.participantIDs.length > 2;

    return obj;
}

function formatEvent(m) {
    var originalMessage = m.message ? m.message : m;
    var logMessageType = originalMessage.log_message_type;
    var logMessageData;
    if (logMessageType === "log:generic-admin-text") {
        logMessageData = originalMessage.log_message_data.untypedData;
        logMessageType = getAdminTextMessageType(originalMessage.log_message_data.message_type);
    } else {
        logMessageData = originalMessage.log_message_data;
    }

    return Object.assign(formatMessage(originalMessage), {
        type: "event",
        logMessageType: logMessageType,
        logMessageData: logMessageData,
        logMessageBody: originalMessage.log_message_body,
    });
}

function formatHistoryMessage(m) {
    switch (m.action_type) {
        case "ma-type:log-message":
            return formatEvent(m);
        default:
            return formatMessage(m);
    }
}

// Get a more readable message type for AdminTextMessages
function getAdminTextMessageType(type) {
    switch (type) {
        case "change_thread_theme":
            return "log:thread_color";
        case "change_thread_nickname":
            return "log:user_nickname";
        case "change_thread_icon":
            return "log:thread_icon";
        case "group_poll":
            return "log:group_poll";
        case "change_thread_quick_reaction":
            return "log:quick_reaction";
        case "magic_words":
            return "log:magic_words";
        case "change_thread_approval_mode":
            return "log:approval_mode";
        case "joinable_group_link_mode_change":
            return "log:group_link";
        case "change_thread_admins":
            return "log:change_admins";
        case "group_thread_created":
            return "log:group_created";
        case "messenger_call_log":
            return "log:call";
        case "participant_joined_group_call":
            return "log:call_participant_joined";
        case "pin_messages_v2":
            return "log:pin_messages";
        case "unpin_messages_v2":
            return "log:unpin_messages";
        default:
            return type;
    }
}

function formatDeltaEvent(m) {
    var logMessageType;
    var logMessageData;
    switch (m.class) {
        default:
            logged(m.class);
            break;
        case "AdminTextMessage":
            logMessageData = m.untypedData;
            logMessageType = getAdminTextMessageType(m.type);
            break;
        case "ThreadName":
            logMessageType = "log:thread_name";
            logMessageData = { name: m.name };
            break;
        case "ParticipantsAddedToGroupThread":
            logMessageType = "log:group_participants_add";
            logMessageData = { addedParticipants: m.addedParticipants };
            break;
        case "ParticipantLeftGroupThread":
            logMessageType = "log:group_participants_left";
            logMessageData = { leftParticipantFbId: m.leftParticipantFbId };
            break;
    }

    return {
        type: "event",
        threadID: formatID((m.messageMetadata.threadKey.threadFbId || m.messageMetadata.threadKey.otherUserFbId).toString()),
        logMessageType: logMessageType,
        logMessageData: logMessageData,
        logMessageBody: m.messageMetadata.adminText,
        author: m.messageMetadata.actorFbId,
    };
}

function formatTyp(event) {
    return {
        isTyping: !!event.st,
        from: event.from.toString(),
        threadID: formatID((event.to || event.thread_fbid || event.from).toString()),
        // When receiving typ indication from mobile, `from_mobile` isn't set.
        // If it is, we just use that value.
        fromMobile: event.hasOwnProperty("from_mobile") ? event.from_mobile : true,
        userID: (event.realtime_viewer_fbid || event.from).toString(),
        type: "typ",
    };
}

function formatDeltaReadReceipt(delta) {
    // otherUserFbId seems to be used as both the readerID and the threadID in a 1-1 chat.
    // In a group chat actorFbId is used for the reader and threadFbId for the thread.
    return {
        reader: (delta.threadKey.otherUserFbId || delta.actorFbId).toString(),
        time: delta.actionTimestampMs,
        threadID: formatID((delta.threadKey.otherUserFbId || delta.threadKey.threadFbId).toString()),
        type: "read_receipt",
    };
}

function formatReadReceipt(event) {
    return {
        reader: event.reader.toString(),
        time: event.time,
        threadID: formatID((event.thread_fbid || event.reader).toString()),
        type: "read_receipt",
    };
}

function formatRead(event) {
    return {
        threadID: formatID(((event.chat_ids && event.chat_ids[0]) || (event.thread_fbids && event.thread_fbids[0])).toString()),
        time: event.timestamp,
        type: "read",
    };
}

function getFrom(str, startToken, endToken) {
    var start = str.indexOf(startToken) + startToken.length;
    if (start < startToken.length) return "";

    var lastHalf = str.substring(start);
    var end = lastHalf.indexOf(endToken);
    if (end === -1) {
        throw Error("Could not find endTime `" + endToken + "` in the given string.");
    }
    return lastHalf.substring(0, end);
}

function makeParsable(html) {
    let withoutForLoop = html.replace(/for\s*\(\s*;\s*;\s*\)\s*;\s*/, "");

    // (What the fuck FB, why windows style newlines?)
    // So sometimes FB will send us base multiple objects in the same response.
    // They're all valid JSON, one after the other, at the top level. We detect
    // that and make it parse-able by JSON.parse.
    //       Ben - July 15th 2017
    //
    // It turns out that Facebook may insert random number of spaces before
    // next object begins (issue #616)
    //       rav_kr - 2018-03-19
    let maybeMultipleObjects = withoutForLoop.split(/\}\r\n *\{/);
    if (maybeMultipleObjects.length === 1) return maybeMultipleObjects;

    return "[" + maybeMultipleObjects.join("},{") + "]";
}

function arrToForm(form) {
    return arrayToObject(
        form,
        function (v) {
            return v.name;
        },
        function (v) {
            return v.val;
        }
    );
}

function arrayToObject(arr, getKey, getValue) {
    return arr.reduce(function (acc, val) {
        acc[getKey(val)] = getValue(val);
        return acc;
    }, {});
}

function getSignatureID() {
    return Math.floor(Math.random() * 2147483648).toString(16);
}

function generateTimestampRelative() {
    var d = new Date();
    return d.getHours() + ":" + padZeros(d.getMinutes());
}

function makeDefaults(html, userID, ctx) {
    var reqCounter = 1;
    var fb_dtsg = getFrom(html, 'name="fb_dtsg" value="', '"');

    // @Hack Ok we've done hacky things, this is definitely on top 5.
    // We totally assume the object is flat and try parsing until a }.
    // If it works though it's cool because we get a bunch of extra data things.
    //
    // Update: we don't need this. Leaving it in in case we ever do.
    //       Ben - July 15th 2017

    // var siteData = getFrom(html, "[\"SiteData\",[],", "},");
    // try {
    //   siteData = JSON.parse(siteData + "}");
    // } catch(e) {
    //   log.warn("makeDefaults", "Couldn't parse SiteData. Won't have access to some variables.");
    //   siteData = {};
    // }

    var ttstamp = "2";
    for (var i = 0; i < fb_dtsg.length; i++) {
        ttstamp += fb_dtsg.charCodeAt(i);
    }
    var revision = getFrom(html, 'revision":', ",");

    function mergeWithDefaults(obj) {
        // @TODO This is missing a key called __dyn.
        // After some investigation it seems like __dyn is some sort of set that FB
        // calls BitMap. It seems like certain responses have a "define" key in the
        // res.jsmods arrays. I think the code iterates over those and calls `set`
        // on the bitmap for each of those keys. Then it calls
        // bitmap.toCompressedString() which returns what __dyn is.
        //
        // So far the API has been working without this.
        //
        //              Ben - July 15th 2017
        var newObj = {
            __user: userID,
            __req: (reqCounter++).toString(36),
            __rev: revision,
            __a: 1,
            // __af: siteData.features,
            fb_dtsg: ctx.fb_dtsg ? ctx.fb_dtsg : fb_dtsg,
            jazoest: ctx.ttstamp ? ctx.ttstamp : ttstamp,
            // __spin_r: siteData.__spin_r,
            // __spin_b: siteData.__spin_b,
            // __spin_t: siteData.__spin_t,
        };

        // @TODO this is probably not needed.
        //         Ben - July 15th 2017
        // if (siteData.be_key) {
        //   newObj[siteData.be_key] = siteData.be_mode;
        // }
        // if (siteData.pkg_cohort_key) {
        //   newObj[siteData.pkg_cohort_key] = siteData.pkg_cohort;
        // }

        if (!obj) return newObj;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (!newObj[prop]) {
                    newObj[prop] = obj[prop];
                }
            }
        }

        return newObj;
    }

    function postWithDefaults(url, jar, form, ctxx) {
        return post(url, jar, mergeWithDefaults(form), ctx.globalOptions, ctxx || ctx);
    }

    function getWithDefaults(url, jar, qs, ctxx) {
        return get(url, jar, mergeWithDefaults(qs), ctx.globalOptions, ctxx || ctx);
    }

    function postFormDataWithDefault(url, jar, form, qs, ctxx) {
        return postFormData(url, jar, mergeWithDefaults(form), mergeWithDefaults(qs), ctx.globalOptions, ctxx || ctx);
    }

    return {
        get: getWithDefaults,
        post: postWithDefaults,
        postFormData: postFormDataWithDefault,
    };
}

function parseAndCheckLogin(ctx, defaultFuncs, retryCount) {
    if (retryCount == undefined) {
        retryCount = 0;
    }
    return function (data) {
        return bluebird.try(function () {
            //logged("fca_login " + data.body);
            if (data.statusCode >= 500 && data.statusCode < 600) {
                if (retryCount >= 5) {
                    throw {
                        error: "Request retry failed. Check the `res` and `statusCode` property on this error.",
                        statusCode: data.statusCode,
                        res: data.body,
                    };
                }
                retryCount++;
                var retryTime = Math.floor(Math.random() * 5000);
                logged("fca_login  Got status code " + data.statusCode + " - " + retryCount + ". attempt to retry in " + retryTime + " milliseconds...");
                var url = data.request.uri.protocol + "//" + data.request.uri.hostname + data.request.uri.pathname;
                if (data.request.headers["Content-Type"].split(";")[0] === "multipart/form-data") {
                    return bluebird
                        .delay(retryTime)
                        .then(function () {
                            return defaultFuncs.postFormData(url, ctx.jar, data.request.formData, {});
                        })
                        .then(parseAndCheckLogin(ctx, defaultFuncs, retryCount));
                } else {
                    return bluebird
                        .delay(retryTime)
                        .then(function () {
                            return defaultFuncs.post(url, ctx.jar, data.request.formData);
                        })
                        .then(parseAndCheckLogin(ctx, defaultFuncs, retryCount));
                }
            }
            if (data.statusCode !== 200) throw new Error("parseAndCheckLogin got status code: " + data.statusCode + ". Bailing out of trying to parse response.");

            var res = null;
            try {
                res = JSON.parse(makeParsable(data.body));
            } catch (e) {
                throw {
                    error: "JSON.parse error. Check the `detail` property on this error.",
                    detail: e,
                    res: data.body,
                };
            }

            // In some cases the response contains only a redirect URL which should be followed
            if (res.redirect && data.request.method === "GET") {
                return defaultFuncs.get(res.redirect, ctx.jar).then(parseAndCheckLogin(ctx, defaultFuncs));
            }

            // TODO: handle multiple cookies?
            if (res.jsmods && res.jsmods.require && Array.isArray(res.jsmods.require[0]) && res.jsmods.require[0][0] === "Cookie") {
                res.jsmods.require[0][3][0] = res.jsmods.require[0][3][0].replace("_js_", "");
                var cookie = formatCookie(res.jsmods.require[0][3], "facebook");
                var cookie2 = formatCookie(res.jsmods.require[0][3], "messenger");
                ctx.jar.setCookie(cookie, "https://www.facebook.com");
                ctx.jar.setCookie(cookie2, "https://www.messenger.com");
            }

            // On every request we check if we got a DTSG and we mutate the context so that we use the latest
            // one for the next requests.
            if (res.jsmods && Array.isArray(res.jsmods.require)) {
                var arr = res.jsmods.require;
                for (var i in arr) {
                    if (arr[i][0] === "DTSG" && arr[i][1] === "setToken") {
                        ctx.fb_dtsg = arr[i][3][0];

                        // Update ttstamp since that depends on fb_dtsg
                        ctx.ttstamp = "2";
                        for (var j = 0; j < ctx.fb_dtsg.length; j++) {
                            ctx.ttstamp += ctx.fb_dtsg.charCodeAt(j);
                        }
                    }
                }
            }

            if (res.error === 1357001) {
                throw { error: "Not logged in." };
            }
            return res;
        });
    };
}

function saveCookies(jar) {
    return function (res) {
        var cookies = res.headers["set-cookie"] || [];
        cookies.forEach(function (c) {
            if (c.indexOf(".facebook.com") > -1) {
                jar.setCookie(c, "https://www.facebook.com");
            }
            var c2 = c.replace(/domain=\.facebook\.com/, "domain=.messenger.com");
            jar.setCookie(c2, "https://www.messenger.com");
        });
        return res;
    };
}

var NUM_TO_MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var NUM_TO_DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function formatDate(date) {
    var d = date.getUTCDate();
    d = d >= 10 ? d : "0" + d;
    var h = date.getUTCHours();
    h = h >= 10 ? h : "0" + h;
    var m = date.getUTCMinutes();
    m = m >= 10 ? m : "0" + m;
    var s = date.getUTCSeconds();
    s = s >= 10 ? s : "0" + s;
    return NUM_TO_DAY[date.getUTCDay()] + ", " + d + " " + NUM_TO_MONTH[date.getUTCMonth()] + " " + date.getUTCFullYear() + " " + h + ":" + m + ":" + s + " GMT";
}

function formatCookie(arr, url) {
    return arr[0] + "=" + arr[1] + "; Path=" + arr[3] + "; Domain=" + url + ".com";
}

function formatThread(data) {
    return {
        threadID: formatID(data.thread_fbid.toString()),
        participants: data.participants.map(formatID),
        participantIDs: data.participants.map(formatID),
        name: data.name,
        nicknames: data.custom_nickname,
        snippet: data.snippet,
        snippetAttachments: data.snippet_attachments,
        snippetSender: formatID((data.snippet_sender || "").toString()),
        unreadCount: data.unread_count,
        messageCount: data.message_count,
        imageSrc: data.image_src,
        timestamp: data.timestamp,
        serverTimestamp: data.server_timestamp, // what is this?
        muteUntil: data.mute_until,
        isCanonicalUser: data.is_canonical_user,
        isCanonical: data.is_canonical,
        isSubscribed: data.is_subscribed,
        folder: data.folder,
        isArchived: data.is_archived,
        recipientsLoadable: data.recipients_loadable,
        hasEmailParticipant: data.has_email_participant,
        readOnly: data.read_only,
        canReply: data.can_reply,
        cannotReplyReason: data.cannot_reply_reason,
        lastMessageTimestamp: data.last_message_timestamp,
        lastReadTimestamp: data.last_read_timestamp,
        lastMessageType: data.last_message_type,
        emoji: data.custom_like_icon,
        color: data.custom_color,
        adminIDs: data.admin_ids,
        threadType: data.thread_type,
    };
}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function formatProxyPresence(presence, userID) {
    if (presence.lat === undefined || presence.p === undefined) return null;
    return {
        type: "presence",
        timestamp: presence.lat * 1000,
        userID: userID,
        statuses: presence.p,
    };
}

function formatPresence(presence, userID) {
    return {
        type: "presence",
        timestamp: presence.la * 1000,
        userID: userID,
        statuses: presence.a,
    };
}

function decodeClientPayload(payload) {
    /*
  Special function which Client using to "encode" clients JSON payload
  */
    return JSON.parse(String.fromCharCode.apply(null, payload));
}

function getAppState(jar) {
    return jar.getCookies("https://www.facebook.com").concat(jar.getCookies("https://facebook.com")).concat(jar.getCookies("https://www.messenger.com"));
}

async function getProjectTotalSize(dir) {
    const files = await fsp.readdir(dir, { withFileTypes: true });

    const paths = files.map(async (file) => {
        const path1 = path.join(dir, file.name);

        if (file.isDirectory()) return await getProjectTotalSize(path1);

        if (file.isFile()) {
            const { size } = await fsp.stat(path1);

            return size;
        }

        return 0;
    });

    return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0);
}

function getCPULoad() {
    let cpus = os.cpus();
    let totalTime = -oldCPUTime;
    let totalIdle = -oldCPUIdle;
    let i;
    for (i = 0; i < cpus.length; i++) {
        let cpu = cpus[i];
        for (let type in cpu.times) {
            totalTime += cpu.times[type];
            if (type == "idle") {
                totalIdle += cpu.times[type];
            }
        }
    }
    let load = 100 - Math.round((totalIdle / totalTime) * 100);
    oldCPUTime = totalTime;
    oldCPUIdle = totalIdle;
    return load;
}

function isBlockedSentence(str) {
    if ((/you're\sthe\s/.test(str) && /\smember\sof\sthis\s(shitty\sgroup|group)/.test(str)) || /unable\sto\sre-add\smember/.test(str) || /^active\santiout\smode/.test(str)) {
        return true;
    }
    if (/(you\shave\sbeen\sdetected\sas\sa\sbot|\supdate\suser\snicknames\s|\syour\skeyboard\shero\slevel\shas\sreached\slevel\s|\supdate\sthe\sgroup\sname\sto\s|you\shave\sno\spermission\sto\suse\scommand\s|here's\syour\smusic,\senjoy|how\scan\si\sassist\syou\stoday\?)/.test(str)) {
        return true;
    }
    return /(ina\smo\s|\stang-ina\s|\swala\skang\ssilbi\s|\swala\skang\skwenta\s|\sg4gu\s|\sgagu\s|\sbaliw\ska\s|\shayup\ska\s|\sulol\s|\sb1l4t\s|\sbilat\s|\staena\s|\stae\s|\sbobo\s|\spangit\smo\s|\sg4g0\s|\sgag0\s|\sgago\s|\st4ng1n4\s|\st4ngina\s|\stangina\s|\sliit\stt\s|\skain\stt\s|\st4mod\s|\stam0d\s|\st4m0d\s|\st1t1\s|\sp3p3\s|\spepe\s|\stite\s|\stamd\s|\stamod\s|\seat\sme\s|\sughhh\s|\sugh\s|\s1yut\s|\s1yut1n\s|\siyutin\s|\siyutan\s|\skantotan\s|\siyut\s|\skantot\s|\sahole\s|\sanus\s|\sash0le\s|\sash0les\s|\sasholes\s|\s\sass\s|\sAss\sMonkey\s|\sAssface\s|\sassh0le\s|\sassh0lez\s|\sasshole\s|\sassholes\s|\sassholz\s|\sasswipe\s|\sazzhole\s|\sbassterds\s|\sbastard\s|\sbastards\s|\sbastardz\s|\sbasterds\s|\sbasterdz\s|\sBiatch\s|\sbitch\s|\sbitches\s|\sBlow\sJob\s|\sboffing\s|\sbutthole\s|\sbuttwipe\s|\sc0ck\s|\sc0cks\s|\sc0k\s|\sCarpet\sMuncher\s|\scawk\s|\scawks\s|\sClit\s|\scnts\s|\scntz\s|\scock\s|\scockhead\s|\scock-head\s|\scocks\s|\sCockSucker\s|\scock-sucker\s|\scrap\s|\scum\s|\scunt\s|\scunts\s|\scuntz\s|\sdick\s|\sdild0\s|\sdild0s\s|\sdildo\s|\sdildos\s|\sdilld0\s|\sdilld0s\s|\sdominatricks\s|\sdominatrics\s|\sdominatrix\s|\sdyke\s|\senema\s|\sf\su\sc\sk\s|\sf\su\sc\sk\se\sr\s|\sfag\s|\sfag1t\s|\sfaget\s|\sfagg1t\s|\sfaggit\s|\sfaggot\s|\sfagg0t\s|\sfagit\s|\sfags\s|\sfagz\s|\sfaig\s|\sfaigs\s|\sfart\s|\sflipping\sthe\sbird\s|\sfuck\s|\sfucker\s|\sfuckin\s|\sfucking\s|\sfucks\s|\sFudge\sPacker\s|\sfuk\s|\sFukah\s|\sFuken\s|\sfuker\s|\sFukin\s|\sFukk\s|\sFukkah\s|\sFukken\s|\sFukker\s|\sFukkin\s|\sg00k\s|\sGod-damned\s|\sh00r\s|\sh0ar\s|\sh0re\s|\shells\s|\shoar\s|\shoor\s|\shoore\s|\sjackoff\s|\sjap\s|\sjaps\s|\sjerk-off\s|\sjisim\s|\sjiss\s|\sjizm\s|\sjizz\s|\sknob\s|\sknobs\s|\sknobz\s|\skunt\s|\skunts\s|\skuntz\s|\sLezzian\s|\sLipshits\s|\sLipshitz\s|\smasochist\s|\smasokist\s|\smassterbait\s|\smasstrbait\s|\smasstrbate\s|\smasterbaiter\s|\smasterbate\s|\smasterbates\s|\sMotha\sFucker\s|\sMotha\sFuker\s|\sMotha\sFukkah\s|\sMotha\sFukker\s|\sMother\sFucker\s|\sMother\sFukah\s|\sMother\sFuker\s|\sMother\sFukkah\s|\sMother\sFukker\s|\smother-fucker\s|\sMutha\sFucker\s|\sMutha\sFukah\s|\sMutha\sFuker\s|\sMutha\sFukkah\s|\sMutha\sFukker\s|\sn1gr\s|\snastt\s|\snigger;\s|\snigur;\s|\sniiger;\s|\sniigr;\s|\sorafis\s|\sorgasim;\s|\sorgasm\s|\sorgasum\s|\soriface\s|\sorifice\s|\sorifiss\s|\spacki\s|\spackie\s|\spacky\s|\spaki\s|\spakie\s|\spaky\s|\specker\s|\speeenus\s|\speeenusss\s|\speenus\s|\speinus\s|\spen1s\s|\spenas\s|\spenis\s|\spenis-breath\s|\spenus\s|\spenuus\s|\sPhuc\s|\sPhuck\s|\sPhuk\s|\sPhuker\s|\sPhukker\s|\spolac\s|\spolack\s|\spolak\s|\sPoonani\s|\spr1c\s|\spr1ck\s|\spr1k\s|\spusse\s|\spussee\s|\spussy\s|\spuuke\s|\spuuker\s|\sqweir\s|\srecktum\s|\srectum\s|\sretard\s|\ssadist\s|\sscank\s|\sschlong\s|\sscrewing\s|\ssemen\s|\ssex\s|\ssexy\s|\sSh!t\s|\ssh1t\s|\ssh1ter\s|\ssh1ts\s|\ssh1tter\s|\ssh1tz\s|\sshit\s|\sshits\s|\sshitter\s|\sShitty\s|\sShity\s|\sshitz\s|\sShyt\s|\sShyte\s|\sShytty\s|\sShyty\s|\sskanck\s|\sskank\s|\sskankee\s|\sskankey\s|\sskanks\s|\sSkanky\s|\sslag\s|\sslut\s|\ssluts\s|\sSlutty\s|\sslutz\s|\sson-of-a-bitch\s|\stit\s|\sturd\s|\sva1jina\s|\svag1na\s|\svagiina\s|\svagina\s|\svaj1na\s|\svajina\s|\svullva\s|\svulva\s|\sw0p\s|\swh00r\s|\swh0re\s|\swhore\s|\sxrated\s|\sxxx\s|\sb!+ch\s|\sbitch\s|\sblowjob\s|\sclit\s|\sarschloch\s|\sfuck\s|\sshit\s|\sass\s|\sasshole\s|\sb!tch\s|\sb17ch\s|\sb1tch\s|\sbastard\s|\sbi+ch\s|\sboiolas\s|\sbuceta\s|\sc0ck\s|\scawk\s|\schink\s|\scipa\s|\sclits\s|\scock\s|\scum\s|\scunt\s|\sdildo\s|\sdirsa\s|\sejakulate\s|\sfatass\s|\sfcuk\s|\sfuk\s|\sfux0r\s|\shoer\s|\shore\s|\sjism\s|\skawk\s|\sl3itch\s|\sl3i+ch\s|\smasturbate\s|\smasterbat\*\s|\smasterbat3\s|\smotherfucker\s|\ss\.o\.b\.\s|\smofo\s|\snazi\s|\snigga\s|\snigger\s|\snutsack\s|\sphuck\s|\spimpis\s|\sscrotum\s|\ssh!t\s|\sshemale\s|\sshi+\s|\ssh!+\s|\sslut\s|\ssmut\s|\steets\s|\stits\s|\sboobs\s|\sb00bs\s|\steez\s|\stestical\s|\stesticle\s|\stitt\s|\sw00se\s|\sjackoff\s|\swank\s|\swhoar\s|\swhore\s|\s\*damn\s|\s\*dyke\s|\s\*fuck\*\s|\s\*shit\*\s|\s@$$\s|\samcik\s|\sandskota\s|\sarse\*\s|\sassrammer\s|\sayir\s|\sbi7ch\s|\sbitch\*\s|\sbollock\*\s|\sbreasts\s|\sbutt-pirate\s|\scabron\s|\scazzo\s|\schraa\s|\schuj\s|\sCock\*\s|\scunt\*\s|\sd4mn\s|\sdaygo\s|\sdego\s|\sdick\*\s|\sdike\*\s|\sdupa\s|\sdziwka\s|\sejackulate\s|\sEkrem\*\s|\sEkto\s|\senculer\s|\sfaen\s|\sfag\*\s|\sfanculo\s|\sfanny\s|\sfeces\s|\sfeg\s|\sFelcher\s|\sficken\s|\sfitt\*\s|\sFlikker\s|\sforeskin\s|\sFotze\s|\sFu\(\*\s|\sfuk\*\s|\sfutkretzn\s|\sgook\s|\sguiena\s|\sh0r\s|\sh4x0r\s|\shell\s|\shelvete\s|\shoer\*\s|\shonkey\s|\sHuevon\s|\shui\s|\sinjun\s|\sjizz\s|\skanker\*\s|\skike\s|\sklootzak\s|\skraut\s|\sknulle\s|\skuk\s|\skuksuger\s|\sKurac\s|\skurwa\s|\skusi\*\s|\skyrpa\*\s|\slesbo\s|\smamhoon\s|\smasturbat\*\s|\smerd\*\s|\smibun\s|\smonkleigh\s|\smouliewop\s|\smuie\s|\smulkku\s|\smuschi\s|\snazis\s|\snepesaurio\s|\snigger\*\s|\sorospu\s|\spaska\*\s|\sperse\s|\spicka\s|\spierdol\*\s|\spillu\*\s|\spimmel\s|\spiss\*\s|\spizda\s|\spoontsee\s|\spoop\s|\sporn\s|\sp0rn\s|\spr0n\s|\spreteen\s|\spula\s|\spule\s|\sputa\s|\sputo\s|\sqahbeh\s|\squeef\*\s|\srautenberg\s|\sschaffer\s|\sscheiss\*\s|\sschlampe\s|\sschmuck\s|\sscrew\s|\ssh!t\*\s|\ssharmuta\s|\ssharmute\s|\sshipal\s|\sshiz\s|\sskribz\s|\sskurwysyn\s|\ssphencter\s|\sspic\s|\sspierdalaj\s|\ssplooge\s|\ssuka\s|\sb00b\*\s|\stesticle\*\s|\stitt\*\s|\stwat\s|\svittu\s|\swank\*\s|\swetback\*\s|\swichser\s|\swop\*\s|\syed\s|\szabourah)/.test(
        str
    );
}

function encrypt(text, key, iv) {
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key.toString("hex"), "hex"), Buffer.from(iv.toString("hex"), "hex"));
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
}

function decrypt(text, key, iv) {
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
           !isNaN(parseFloat(str))
  }

  function removeMarkdown(st) {
    // find url/image
    let url = st.match(/\[(.*?)\]\((.*?)\)/);
    if (url != null) {
        st = st.replace(/\[(.*?)\]\((.*?)\)/g, url[2]);
    }
    
    // find the bold/italic text
    let boldi = st.match(/\*\*\*(.*?)\*\*\*/);
    if (boldi != null) {
    st = st.replace(/\*\*\*(.*?)\*\*\*/g, boldi[1]);
    }
    
    // find the bold text
    let bold = st.match(/\*\*(.*?)\*\*/);
    if (bold != null) {
    st = st.replace(/\*\*(.*?)\*\*/g, bold[1]);
    }
    
    // find the italic
    let italic = st.match(/\*(.*?)\*/);
    if (italic != null) {
    st = st.replace(/\*(.*?)\*/g, italic[1]);
    }
    
    // replace code block
    st = st.replaceAll("```", "");
    
    return st;
}

function getContentType(file) {
    if (file.endsWith(".png")) {
        return "image/png";
    } else if (file.endsWith(".jpg")) {
        return "image/jpg"
    } else if (file.endsWith(".jpeg")) {
        return "image/jpeg"
    } else if (file.endsWith(".mp4")) {
        return "video/mp4";
    } else if (file.endsWith(".mp3")) {
        return "audio/mpeg";
    }
    return "";
}

function formatOutput(title, body, footer) {
    let construct = "⋆｡° " + title + "\n│\n";
    for (let i = 0; i < body.length; i++) {
        construct += '│   ⦿ ' + body[i] + "\n";
    }
    construct += '│\n└─  ' + footer;
    return construct;
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 90000) + Math.floor(Math.random() * 20000);
}

module.exports = {
    isReadableStream,
    get,
    post,
    postFormData,
    generateThreadingID,
    generateOfflineThreadingID,
    getGUID,
    getFrom,
    makeParsable,
    arrToForm,
    getSignatureID,
    getJar: request.jar,
    generateTimestampRelative,
    makeDefaults,
    parseAndCheckLogin,
    saveCookies,
    getType,
    _formatAttachment,
    formatHistoryMessage,
    formatID,
    formatMessage,
    formatDeltaEvent,
    formatDeltaMessage,
    formatProxyPresence,
    formatPresence,
    formatTyp,
    formatDeltaReadReceipt,
    formatCookie,
    formatThread,
    formatReadReceipt,
    formatRead,
    generatePresence,
    generateAccessiblityCookie,
    formatDate,
    decodeClientPayload,
    getAppState,
    getAdminTextMessageType,
    setProxy,
    logged,
    getCurrentTime,
    getProjectTotalSize,
    getCPULoad,
    isBlockedSentence,
    isNumeric,
    encrypt,
    decrypt,
    removeMarkdown,
    getContentType,
    formatOutput,
    getTimestamp,
};