const fs = require('fs');
const path = require('path');
const shell = require("shelljs");
const { hasHusky } = require('../../utils');

function generateCommitLint() {
    const result = shell.exec('git rev-parse --is-inside-work-tree', {
        silent: true
    });
    if (!result.stdout) {
        shell.echo('❌ 当前仓库未在git管理控制下，请先执行git init')
        shell.exit();
    }
    if (!hasHusky()) {
        shell.echo('installing husky');
        shell.exec('npm install husky -D');
        shell.echo('create husky dir')
        shell.exec('npx husky install');
    }
 
    shell.echo('正在安装commit-lint及其相关内容');
    shell.exec('npm install @commitlint/config-conventional @commitlint/cli -D')
  
    shell.exec(`npx husky add .husky/commit-msg`);
    shell.ls('.husky/commit-msg').forEach(file => {
        shell.sed('-i', 'undefined', "npx --no-install commitlint --edit ''", file)
    })
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
    packageJson.scripts.prepare = 'husky install';
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    fs.copyFileSync(path.resolve(__dirname, '.commitlintrc.js'), '.commitlintrc.js')
    shell.exec('npm install');
    shell.echo('✅ 安装完成!')
}

module.exports = generateCommitLint;