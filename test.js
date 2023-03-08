function log(data) {
    if (typeof data === "string") {
        let d = data.normalize('NFKC').split(" ");
        if (d[0].includes("_")) {
            let db = d[0];
            let db1 = d[1];
            log(db1)
            d.shift();
            if (db1.length > 14 && /^\d+$/.test(parseInt(db1))) {
                d.shift();
                console.log('\x1b[36m', "getCurrentTime()",'\x1b[0m',"|",'\x1b[40m', db ,'\x1b[0m','\x1b[34m', db1 ,'\x1b[0m', d.join(" "));
            } else {
                console.log('\x1b[36m', "getCurrentTime()",'\x1b[0m',"|",'\x1b[40m', db ,'\x1b[0m', d.join(" "));
            }
        } else {
            console.log('\x1b[36m', "getCurrentTime()",'\x1b[0m',"|", d.join(" "));
        }
    } else {
        let da = JSON.stringify(data);
        if (da == "") {
            return;
        }
        console.log('\x1b[36m'," getCurrentTime()", '\x1b[0m', " |", da.normalize('NFKC'));
    }
}

log("test_one 444444444444444 in the")