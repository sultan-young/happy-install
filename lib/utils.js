const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

function getPackageList() {
  return fs.readdirSync(path.resolve(__dirname, "./packages"));
}

function hasHusky() {
  return fs.existsSync(`./.husky`);
}

function updatePackage(paths = [], value) {
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  let current = packageJson;
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (i === paths.length - 1) {
      current[path] = value;
      break;
    }
    if (!packageJson[path]) {
      packageJson[path] = {};
    }
    current = packageJson[path];
  }

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
}

function versionCompare(preVersion='', lastVersion='') {
    var sources = preVersion.replace(/[a-zA-Z]/g, '').split('.');
    var dests = lastVersion.replace(/[a-zA-Z]/g, '').split('.');

    var maxL = Math.max(sources.length, dests.length);
    var result = 0;
    for (let i = 0; i < maxL; i++) {  
        let preValue = sources.length>i ? sources[i]:0;
        let preNum = isNaN(Number(preValue)) ? preValue.charCodeAt() : Number(preValue);
        let lastValue = dests.length>i ? dests[i]:0;
        let lastNum =  isNaN(Number(lastValue)) ? lastValue.charCodeAt() : Number(lastValue);
        if (preNum < lastNum) {
            result = -1;
            break;
        } else if (preNum > lastNum) { 
            result = 1;
            break;
        }
    }
    return result;
}

// 检测是否在git仓库下
function isInGit() {
  const result = shell.exec("git rev-parse --is-inside-work-tree", {
    silent: true,
  });
  return !!result.stdout;
}

module.exports = {
  getPackageList,
  hasHusky,
  updatePackage,
  versionCompare,
  isInGit,
};
