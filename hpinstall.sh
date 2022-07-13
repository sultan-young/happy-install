#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require("shelljs")
const generateCommitLint = require('./lib/packages/commit-lint/start');
const { getPackageList } = require('./lib/utils');

async function questionInquirer() {
    const result = await inquirer.prompt([
        {
          type: 'list',
          name: 'installName',
          message: '请选择一键安装内容',
          choices: getPackageList()
        }
    ]);
    return result;
};

questionInquirer().then(res => {
    const name = res.installName;
    switch (name) {
        case 'commit-lint':
            generateCommitLint();
            break;
        default:
            shell.echo('未匹配到对应命令。')
            break;
    }
})