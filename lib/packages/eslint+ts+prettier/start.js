const fs = require('fs');
const path = require('path');
const shell = require("shelljs");
const { hasHusky } = require('../../utils');

function generateEslint() {
    shell.exec('npm i -d eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser');
    shell.exec('npm i -d prettier eslint-config-prettier eslint-plugin-prettier');
    fs.copyFileSync(path.resolve(__dirname, '.eslintrc.json', '.eslintrc.json'));
    
    
    console.log(1)
}

module.exports = generateEslint;