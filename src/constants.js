/* eslint-disable import/prefer-default-export */
export const seasonDefinition = [
  ['WINTER', {
    temperature: {
      range: { min: 0, max: 45 },
    },
    humidity: {
      range: { min: 0, max: 50 },
    },
  }],
  ['SUMMER', {
    temperature: {
      range: { min: 46, max: 100 },
    },
    humidity: {
      range: { min: 51, max: 100 },
    },
  }],
  ['AUTUMN', {
    temperature: {
      range: { min: 0, max: 45 },
    },
    humidity: {
      range: { min: 51, max: 100 },
    },
  }],
  ['SPRING', {
    temperature: {
      range: { min: 46, max: 100 },
    },
    humidity: {
      range: { min: 0, max: 50 },
    },
  }],
];
