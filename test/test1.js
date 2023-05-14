const axios = require("axios");
const utils = require("./assets/mj-fca/utils.js");

const type = {
    eye_color: ["brown", "Grey", "Blue", "Green"],
    emotion: ["joy", "neutral"],
    face: ["all", "natural", "beautified"],
    head_pose: ["front-facing", "left-facing", "right-facing"],
    gender: ["male", "female"],
    age: ["young-adult", "adult", "child", "elderly", "infant"],
    ethnicity: ["white", "black", "latino", "asian"],
    hair_color: ["brown", "black", "blond", "gray"],
    hair_length: ["short", "medium", "long"],
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomType(key) {
    return type[key][getRandomInt(0, type[key].length)];
}
//?page=1&per_page=30&face=beautified&head_pose=front-facing&age=young-adult&ethnicity=white&hair_color=blond&hair_length=long&emotion=joy&gender=female&eye_color=brown
async function AI_FACE(types) {
    try {
        const { data } = await axios.get("https://api.generated.photos/api/frontend/v1/images/", {
            params: {
                page: 1,
                per_page: 30,
                eye_color: types.eye_color,
                emotion: types.emotion,
                head_pose: types.head_pose,
                age: types.age,
                face: types.face,
                ethnicity: types.ethnicity,
                hair_color: types.hair_color,
                gender: types.gender,
                hair_length: types.hair_length,
            },
            headers: {
                authorization: "API-Key Cph30qkLrdJDkjW-THCeyA",
            },
        });
        return data["images"][getRandomInt(1, 30)]["thumb_url"];
    } catch (err) {
        utils.logged(err);
        return err;
    }
}

async function doS() {
    let aaa = await AI_FACE({
        eye_color: "Blue",
        emotion: "neutral",
        face: "beautified",
        head_pose: "front-facing",
        gender: "female",
        age: "young-adult",
        ethnicity: "asian",
        hair_color: "black",
        hair_length: "short",
    });
    utils.logged(aaa);
}
doS();
