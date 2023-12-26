/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */

async function array(groups) {
    try {

    let ids = [];
    for (a in groups.list) {
        id = groups.list[a].id;
        if (!ids.includes(id)) {
            ids.push(id);
        } else {
            delete groups.list[a];
        }
    }
    
    return groups;
} catch (err) {
}
    return null; 
}



module.exports = {
    array
};