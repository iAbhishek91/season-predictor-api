import {
  validateLongitude,
  validateLatitude,
  determineSeason,
} from './season';
import { seasonDefinition } from '../../constants';

describe('season', () => {
  describe('validateLongitude', () => {
    [{
      testName: 'string should return "false"',
      longitude: 'string',
      expected: false,
    }, {
      testName: 'symbols should return "false"',
      longitude: '@£$!@£$',
      expected: false,
    }, {
      testName: '180.01 should return "false"',
      longitude: '180.01',
      expected: false,
    }, {
      testName: '181 should return "false"',
      longitude: '181',
      expected: false,
    }, {
      testName: '-180.01 should return "false"',
      longitude: '-180.01',
      expected: false,
    }, {
      testName: '-181 should return "false"',
      longitude: '-181',
      expected: false,
    }, {
      testName: '"" should return "false"',
      longitude: '',
      expected: false,
    }, {
      testName: '-180 should return "true"',
      longitude: '-180',
      expected: true,
    }, {
      testName: '180 should return "true"',
      longitude: '180',
      expected: true,
    }, {
      testName: '0 should return "true"',
      longitude: '0',
      expected: true,
    }, {
      testName: '150 as number should return "true"',
      longitude: 150,
      expected: true,
    }].forEach((testCase) => {
      test(`validate ${testCase.testName}`, () => {
        expect(
          validateLongitude(testCase.longitude),
        ).toBe(testCase.expected);
      });
    });
  });

  describe('validateLatitude', () => {
    [{
      testName: 'string should return "false"',
      latitude: 'string',
      expected: false,
    }, {
      testName: 'symbols should return "false"',
      latitude: '@£$!@£$',
      expected: false,
    }, {
      testName: '90.01 should return "false"',
      latitude: '90.01',
      expected: false,
    }, {
      testName: '91 should return "false"',
      latitude: '91',
      expected: false,
    }, {
      testName: '-90.01 should return "false"',
      latitude: '-90.01',
      expected: false,
    }, {
      testName: '-91 should return "false"',
      latitude: '-91',
      expected: false,
    }, {
      testName: '"" should return "false"',
      latitude: '',
      expected: false,
    }, {
      testName: '-90 should return "true"',
      latitude: '-90',
      expected: true,
    }, {
      testName: '90 should return "true"',
      latitude: '90',
      expected: true,
    }, {
      testName: '0 should return "true"',
      latitude: '0',
      expected: true,
    }, {
      testName: '30 as number should return "true"',
      latitude: 30,
      expected: true,
    }].forEach((testCase) => {
      test(`validate ${testCase.testName}`, () => {
        expect(
          validateLatitude(testCase.latitude),
        ).toBe(testCase.expected);
      });
    });
  });

  describe('determineSeason', () => {
    test('validate lowest boundary of temperature and humidity should return WINTER', () => {
      expect(determineSeason(0, 0).season).toEqual(seasonDefinition[0][0]);
    });

    test('validate when temperature and humidity is in valid range then should return WINTER', () => {
      expect(determineSeason(30, 30).season).toEqual(seasonDefinition[0][0]);
    });

    test('validate highest boundary of temperature and humidity should return WINTER', () => {
      expect(determineSeason(45, 50).season).toEqual(seasonDefinition[0][0]);
    });

    test('validate lowest boundary of temperature and humidity should return SUMMER', () => {
      expect(determineSeason(46, 51).season).toEqual(seasonDefinition[1][0]);
    });

    test('validate when temperature and humidity is in valid range then should return SUMMER', () => {
      expect(determineSeason(75, 75).season).toEqual(seasonDefinition[1][0]);
    });

    test('validate highest boundary of temperature and humidity should return SUMMER', () => {
      expect(determineSeason(100, 100).season).toEqual(seasonDefinition[1][0]);
    });

    test('validate lowest boundary of temperature and humidity should return AUTUMN', () => {
      expect(determineSeason(0, 51).season).toEqual(seasonDefinition[2][0]);
    });

    test('validate when temperature and humidity is in valid range then should return AUTUMN', () => {
      expect(determineSeason(30, 75).season).toEqual(seasonDefinition[2][0]);
    });

    test('validate highest boundary of temperature and humidity should return AUTUMN', () => {
      expect(determineSeason(45, 100).season).toEqual(seasonDefinition[2][0]);
    });

    test('validate lowest boundary of temperature and humidity should return SPRING', () => {
      expect(determineSeason(46, 0).season).toEqual(seasonDefinition[3][0]);
    });

    test('validate when temperature and humidity is in valid range then should return SPRING', () => {
      expect(determineSeason(75, 25).season).toEqual(seasonDefinition[3][0]);
    });

    test('validate highest boundary of temperature and humidity should return SPRING', () => {
      expect(determineSeason(100, 50).season).toEqual(seasonDefinition[3][0]);
    });
  });
});
