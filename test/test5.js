let users = [{
    uid: "1000",
    date: "1688821450725",
    exec: function() {
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].uid == "100")
            }
    }
}]

console.log(JSON.stringify(users));

users[0].exec();

function task(func, time) {
    return setInterval(func, time);
}
