const generateCommitLint = require('./packages/commit-lint/start')
const generateEslint = require('./packages/eslint+ts+prettier/start')

const Entry_Map = {
    'commit-lint': generateCommitLint,
    'Eslint + Ts + Prettier': generateEslint,
};

module.exports = {
    Entry_Map,
}