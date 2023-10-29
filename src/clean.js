const fs = require("fs");

async function do(groups) {
    try {

    let ids = [];
    for (a in groups.list) {
        id = groups.list[a].id;
        if (!ids.includes(id)) {
            ids.push(id);
        } else {
            delete groups.list[a]
        }
    }
    
    return groups;
} catch (err) {
}
    return null; 
}



module.exports = {
    do
}