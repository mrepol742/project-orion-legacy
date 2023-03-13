let aa = {"listv2":[]}

aa.listv2.push({
    id: "42424",
    name: "I am test",
    firstName: "TEst"
});

aa.listv2.push({
    id: "424424224",
    name: "I am test",
    firstName: "TEst"
});

aa.listv2.push({
    id: "42444424",
    name: "I am test",
    firstName: "TEst"
});


for (id in aa.listv2) {
    //console.log(aa.listv2[id].id)
}

console.log(aa.listv2.find(user => {user.id === "42444424"}))