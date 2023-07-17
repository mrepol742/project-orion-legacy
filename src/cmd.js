/*
 *
 * Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the Mrepol742 License, version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/Mrepol742-the-License
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

let help = `
Memory address 0x0000001 Not Found.
`;

let help1 = `
Memory address 0x0000002 Not Found.
`;

let help2 = `
Memory address 0x20023232 Not Found.
`;

let help3 = `
Memory address 0x0224501 Not Found.
`;

let help4 = `
Memory address 0x2424001 Not Found.
`;

let help5 = `
Memory address 0x0424401 Not Found.
`;

let help6 = `
Memory address 0x241222 Not Found.
`;

let help7 = `
Memory address 0x243454 Not Found.
`;

let help8 = `
Memory address 0x0000009 Not Found.
`;

let helpadmin = `
Hello %USER%, this is the admin panel.

   ⦿ unsend
   ⦿ unsend [on|off]
   ⦿ delay [on|off]
   ⦿ nsfw [on|off]
   ⦿ debug [on|off]
   ⦿ antiLeave [on|off]
   ⦿ simultaneousExecution [on|off]
   ⦿ clearCache
   ⦿ refreshState
   ⦿ saveState
   ⦿ fontIgnore ^^
   ⦿ isBot ^^
   ⦿ addAdmin ^^
   ⦿ remAdmin ^^
   ⦿ kickUser ^^
   ⦿ blockUser ^^
   ⦿ unblockUser ^^
   ⦿ blockGroup
   ⦿ unblockGroup
   ⦿ setPrefix [prefix]
   ⦿ remPrefix
   ⦿ ignore [prefix]
   ⦿ setKey [name]:[key]

You guessed it, Only admins of the AI can used this commands.
`;

let helpuser = `
Hello %USER%, this is the command list for user.

     addInstance
   ⦿ setTimezone [timezone]
   ⦿ uid 
   ⦿ mute
   ⦿ unmute
   ⦿ smartReply [on|off]
   ⦿ setNickname [text]
   ⦿ acceptMessageRequest
   ⦿ rname

   Note: This data will be used to make the AI response accurate
   ⦿ setBirthday [date]
   ⦿ setGender [gender]
   ⦿ setUsername [username]
   ⦿ setAddress [address]
   ⦿ setBio [info]

You can set those information to enable awesome features.
`;

let helpgroup = `
Hello %USER%, this is the command list for groups.

   ⦿ gname
   ⦿ ginfo
   ⦿ guid
   ⦿ gphoto
   ⦿ addUser [uid]
   ⦿ everyone

You can set those information to enable awesome features.
`;

let helproot = `
Hello %USER%, you reached the root user command list.

   ⦿ shell [code]
   ⦿ sql [query]
   ⦿ stop
   ⦿ sync
   ⦿ exit
   ⦿ push
   ⦿ resume
   ⦿ restart
   ⦿ notify
   ⦿ destroy
   ⦿ unblockAll
   ⦿ unblockAll --bot
   ⦿ acceptMessageRequest [threadid]
   ⦿ acceptFriendRequest [uid]
   ⦿ changeBio [text]
   ⦿ setMaxImage [integer]
   ⦿ setTextComplextion [complextion]
   ⦿ setMaxTokens [integer]
   ⦿ setTemperature [integer]
   ⦿ setFrequencyPenalty [integer]
   ⦿ setProbabilityMass [integer]
   ⦿ setAutoMarkRead [on|off]
   ⦿ setOnline [on|off]
   ⦿ setSelfListen [on|off]
   ⦿ setSendTypingIndicator [on|off]
   ⦿ setAutoMarkDelivery [on|off]
   ⦿ setPresence [on|off]
   ⦿ setReportingThread [uid]

Only the AI Administrator can use this command.
`;

module.exports = {
    help: help,
    help1: help1,
    help2: help2,
    help3: help3,
    help4: help4,
    help5: help5,
    help6: help6,
    help7: help7,
    help8: help8,
    helpadmin: helpadmin,
    helproot: helproot,
    helpuser: helpuser,
    helpgroup: helpgroup,
};