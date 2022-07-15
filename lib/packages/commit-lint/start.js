const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { versionCompare, updatePackage, isInGit } = require("../../utils");

function generateCommitLint() {
  const nodeVersion = shell
    .exec("node --version", { silent: true })
    .stdout.replace(/[\r\n]/g, "");
    
  const isLessOrEqualNode13 = versionCompare(nodeVersion, "v13.0.0") !== 1;

  if (!isInGit) {
    shell.echo("❌ 当前仓库未在git管理控制下，请先执行git init");
    shell.exit();
  }

  shell.echo("正在安装commit-lint及其相关内容");

  if (isLessOrEqualNode13) {
    // commitlint新版本不再支持node12
    shell.exec("npm install @commitlint/config-conventional@16.2.4 @commitlint/cli@16.2.4 -D");
    shell.exec("npm install husky@7.0.4 -D");
    } else {
    shell.exec("npm install @commitlint/config-conventional @commitlint/cli -D");
    shell.exec("npm install husky -D");
  }

  // 安装husky&创建husky文件
  shell.exec("npx husky install");
  shell.exec(`npx husky add .husky/commit-msg`);
  shell.ls(".husky/commit-msg").forEach((file) => {
    shell.sed("-i", "undefined", "npx --no-install commitlint --edit ''", file);
  });
  updatePackage(['scripts', 'prepare'], 'husky install')
  fs.copyFileSync(
    path.resolve(__dirname, ".commitlintrc.js"),
    ".commitlintrc.js"
  );
  shell.exec("npm install");
  shell.echo("✅ 安装完成!");
}

module.exports = generateCommitLint;
