const {defaults} = require('jest-config');

module.exports = {
    roots: ["./"],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node']
}
