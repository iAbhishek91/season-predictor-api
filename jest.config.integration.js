module.exports = {
  testMatch: ['<rootDir>/test/tests/*.js'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'season integration-test result',
        outputPath: 'integrationTestResult.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        dateFormat: 'dd-mmm-yy HH:MM:ss',
      },
    ],
  ],
};
