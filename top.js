const fs = require("fs");

let users = JSON.parse(fs.readFileSync(__dirname + "/data/users.json", "utf8"));

let lead = [];
for (let i = 0; i < users.list.length; i++) {
    if (!(users.list[i].balance === undefined)) {
        lead.push({id: users.list[i].id, name: users.list[i].firstName, balance: users.list[i].balance});
    }
}
lead.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));
console.log(JSON.stringify(lead))
let construct = "";
for (let i1 = 1; i1 < 31; i1++) {
    construct += "\n" + i1 + ". " + formatDecNum((lead[i1-1].balance/ 1000) * 0.002) + " $ " + lead[i1-1].name;
}

console.log(construct)

function formatDecNum(num) {
    return numberWithCommas((Math.round(num * 100) / 100).toFixed(2));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}