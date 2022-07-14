const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { hasHusky, updatePackage } = require("../../utils");
const inquirer = require("inquirer");

async function generateEslint() {
  shell.exec(
    "npm i -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser"
  );
  shell.exec("npm i -D prettier eslint-config-prettier eslint-plugin-prettier");
  updatePackage(["scripts", "lint:fix"], "eslint src --fix --ext .ts,.js");
  fs.copyFileSync(path.resolve(__dirname, ".eslintrc.json"), ".eslintrc.json");
  fs.copyFileSync(path.resolve(__dirname, ".prettierrc.js"), ".prettierrc.js");

  const { result } = await inquirer.prompt([
    {
      type: "list",
      name: "result",
      message: "是否安装lint-staged并添加git hook以用于在提交前进行code lint",
      choices: ["YES", "NO"],
    },
  ]);
  if (result === "YES") {
    shell.exec("npx husky install");
    shell.exec("npx husky add .husky/pre-commit");
    shell.ls(".husky/pre-commit").forEach((file) => {
      shell.sed("-i", "undefined", "npx --no-install lint-staged", file);
    });
    shell.exec("npm i -D lint-staged");
    updatePackage(["lint-staged"], {
      "./src/*.ts": ["eslint src --fix --ext .ts", "git add ."],
    });
  }
}

module.exports = generateEslint;
