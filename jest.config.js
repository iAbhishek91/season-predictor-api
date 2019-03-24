module.exports = {
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['node_modules', 'dist', 'src/mock'],
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'src/mock'],
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
