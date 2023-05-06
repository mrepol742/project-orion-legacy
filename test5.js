const path = require("path");
const fs = require("fs/promises");

const dirSize = async (dir) => {
    const files = await fs.readdir(dir, { withFileTypes: true });

    const paths = files.map(async (file) => {
        const path1 = path.join(dir, file.name);

        if (file.isDirectory()) return await dirSize(path1);

        if (file.isFile()) {
            const { size } = await fs.stat(path1);

            return size;
        }

        return 0;
    });

    return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0);
};
async function a() {
    const size = await dirSize(__dirname + "/");
    console.log(convertBytes(size));
}
a();
let sizesM = ["Bytes", "KB", "MB", "GB", "TB"];

const convertBytes = function (bytes) {
    if (bytes == 0) {
        return "n/a";
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) {
        return bytes + " " + sizesM[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizesM[i];
};
