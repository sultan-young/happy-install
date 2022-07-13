const fs = require("fs");
const path = require("path");

function getPackageList() {
    return fs.readdirSync(path.resolve(__dirname, './packages'))
}

function hasHusky() {
    return fs.existsSync(`./.husky`)
}

module.exports = {
    getPackageList,
    hasHusky,
}