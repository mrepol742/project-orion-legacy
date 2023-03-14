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

for (let i = 0; i < aa.listv2.length; i++) {
    console.log(aa.listv2[i].id)
    if (aa.listv2[i].id == "42444424") {
        aa.listv2[i]["birthday"] = "12-2-2002";
        aa.listv2[i]["location"] = "mars";
        aa.listv2[i]["gender"] = ""
    }
}

    console.log(aa);
