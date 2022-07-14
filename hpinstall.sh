#!/usr/bin/env node
const inquirer = require('inquirer');
const shell = require("shelljs")
const generateCommitLint = require('./lib/packages/commit-lint/start');
const { Entry_Map } = require('./lib/map.js');

async function questionInquirer() {
    const result = await inquirer.prompt([
        {
          type: 'list',
          name: 'installName',
          message: '请选择一键安装内容',
          choices: Object.keys(Entry_Map),
        }
    ]);
    return result;
};

questionInquirer().then(res => {
    const name = res.installName;
    if (Entry_Map[name]) {
        Entry_Map[name]();
    } else {
        shell.echo('未匹配到对应命令。')
    }
})