import {
  validateLongitude,
  validateLatitude,
  determineSeason,
  seasonHelper,
} from './season';
import { seasonDefinition } from '../../constants';

const seasonHelperValidResponse = {
  status: 200,
  json: {
    season: seasonDefinition[0][0],
  },
};
const seasonHelperInvalidResponse = {
  status: 400,
  json: {
    status: 400,
    message: 'Bad request, probably invalid headers',
    details: 'Bad request, probably invalid headers. Longitude or latitude value. Valid values of LONGITUDE should be between -180 to 180 and LATITUDE should be between -90 and 90',
  },
};


describe('season', () => {
  beforeEach(() => jest.resetModules());
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
      it(`validate ${testCase.testName}`, () => {
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
      it(`validate ${testCase.testName}`, () => {
        expect(
          validateLatitude(testCase.latitude),
        ).toBe(testCase.expected);
      });
    });
  });

  describe('determineSeason', () => {
    it('validate lowest boundary of temperature and humidity should return WINTER', () => {
      expect(determineSeason(0, 0).season).toEqual(seasonDefinition[0][0]);
    });

    it('validate when temperature and humidity is in valid range then should return WINTER', () => {
      expect(determineSeason(30, 30).season).toEqual(seasonDefinition[0][0]);
    });

    it('validate highest boundary of temperature and humidity should return WINTER', () => {
      expect(determineSeason(45, 50).season).toEqual(seasonDefinition[0][0]);
    });

    it('validate lowest boundary of temperature and humidity should return SUMMER', () => {
      expect(determineSeason(46, 51).season).toEqual(seasonDefinition[1][0]);
    });

    it('validate when temperature and humidity is in valid range then should return SUMMER', () => {
      expect(determineSeason(75, 75).season).toEqual(seasonDefinition[1][0]);
    });

    it('validate highest boundary of temperature and humidity should return SUMMER', () => {
      expect(determineSeason(100, 100).season).toEqual(seasonDefinition[1][0]);
    });

    it('validate lowest boundary of temperature and humidity should return AUTUMN', () => {
      expect(determineSeason(0, 51).season).toEqual(seasonDefinition[2][0]);
    });

    it('validate when temperature and humidity is in valid range then should return AUTUMN', () => {
      expect(determineSeason(30, 75).season).toEqual(seasonDefinition[2][0]);
    });

    it('validate highest boundary of temperature and humidity should return AUTUMN', () => {
      expect(determineSeason(45, 100).season).toEqual(seasonDefinition[2][0]);
    });

    it('validate lowest boundary of temperature and humidity should return SPRING', () => {
      expect(determineSeason(46, 0).season).toEqual(seasonDefinition[3][0]);
    });

    it('validate when temperature and humidity is in valid range then should return SPRING', () => {
      expect(determineSeason(75, 25).season).toEqual(seasonDefinition[3][0]);
    });

    it('validate highest boundary of temperature and humidity should return SPRING', () => {
      expect(determineSeason(100, 50).season).toEqual(seasonDefinition[3][0]);
    });
  });

  describe('seasonHelper', () => {
    it('validate valid response is returned when valid longitude and latitude is passed', async () => {
      const response = await seasonHelper('100', '20');
      expect(response).toEqual(seasonHelperValidResponse);
    });

    it('validate invalid response is returned when invalid longitude and valid latitude is passed', async () => {
      const response = await seasonHelper('190', '20');
      expect(response.json.message).toEqual(seasonHelperInvalidResponse.json.message);
      expect(response.json.details).toEqual(seasonHelperInvalidResponse.json.details);
    });

    it('validate invalid response is returned when valid longitude and invalid latitude is passed', async () => {
      const response = await seasonHelper('10', '99');
      expect(response.json.message).toEqual(seasonHelperInvalidResponse.json.message);
      expect(response.json.details).toEqual(seasonHelperInvalidResponse.json.details);
    });

    it('validate invalid response is returned when both longitude and latitude are invalid', async () => {
      const response = await seasonHelper('200', '99');
      expect(response.json.message).toEqual(seasonHelperInvalidResponse.json.message);
      expect(response.json.details).toEqual(seasonHelperInvalidResponse.json.details);
    });

    it('validate catch block is executed when "temperatureRequest" return promise rejection', async () => {
      jest.doMock('../../util/request', () => () => () => Promise.reject());

      const { seasonHelper: s } = require('./season'); // eslint-disable-line global-require
      const response = await s('180', '90');

      expect(response.json.message).toEqual('Internal server error');
      expect(response.json.details).toEqual('Internal server error. Exception thrown while determining season.');
    });
  });
});
