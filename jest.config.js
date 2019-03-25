module.exports = {
  testMatch: ['<rootDir>/src/**/*.test.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'src/mockServer', '__mocks__', 'docs', 'test'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'season unit-test result',
        outputPath: 'unitTestResult.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        dateFormat: 'dd-mmm-yy HH:MM:ss',
      },
    ],
  ],
};
