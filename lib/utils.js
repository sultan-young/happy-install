const fs = require("fs");
const path = require("path");

function getPackageList() {
    return fs.readdirSync(path.resolve(__dirname, './packages'))
}

function hasHusky() {
    return fs.existsSync(`./.husky`)
}

function updatePackage(paths = [], value) {
    const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
    let current = null;
    for (let i = 0; i < paths.length; i ++) {
        const path = paths[i]
        if (!packageJson[path]) {
            packageJson[path] = {};
        }
        current = packageJson[path];

        console.log(current, path)

        if (i === paths.length - 1) {
            current[path] = value;
            break;
        }
    }

    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
}

module.exports = {
    getPackageList,
    hasHusky,
    updatePackage,
}