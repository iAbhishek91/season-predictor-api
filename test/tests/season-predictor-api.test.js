import config from 'config';
import {
  requestGet,
  requestPost,
} from '../utility/requestUtility';
import {
  seasonDefinition,
} from '../../src/constants';

const baseUrl = config.seasonUrl;
const header = (longitude, latitude) => ({ longitude, latitude });
const isValidSeason = season => [
  seasonDefinition[0][0],
  seasonDefinition[1][0],
  seasonDefinition[2][0],
  seasonDefinition[3][0],
].includes(season);

describe('season-predictor-api', () => {
  describe('valid end-points', () => {
    [{
      testName: 'valid mid value',
      longitude: '100',
      latitude: '50',
    }, {
      testName: 'minimum value',
      longitude: '-180',
      latitude: '-90',
    }, {
      testName: 'maximum value',
      longitude: '180',
      latitude: '90',
    }, {
      testName: 'string zero',
      longitude: '0',
      latitude: '0',
    }, {
      testName: 'number zero',
      longitude: 0,
      latitude: 0,
    }].forEach((testCase) => {
      test(`validate body returns "season" when ${testCase.testName} are passed on GET /api/v1/season/`, async () => {
        const { body, status } = await requestGet(
          baseUrl,
          'api/v1/season',
          header(testCase.longitude, testCase.latitude),
        );

        expect(isValidSeason(body.season)).toBe(true);
        expect(status).toEqual(200);
      });
    });

    test('validate that swagger docs end point is up and running', async () => {
      const { status } = await requestGet(
        baseUrl,
        'api/v1/docs',
        {},
      );

      expect(status).toBe(301);
    });
  });

  describe('invalid end-points', () => {
    test('GET /abcdef/ validate wrong end points returns "HTTP: 404" as status', async () => {
      const { status } = await requestGet(baseUrl, 'abcdef', header(100, 50));

      expect(status).toEqual(404);
    });

    test('validate "GET /abcdef/" end points returns "status", "message" and "details" of valid URI of root api', async () => {
      const { body } = await requestGet(baseUrl, 'abcdef', header(100, 50));

      expect(body).toEqual({
        status: 404,
        details: 'valid URI {"apiURI":"/api"}',
      });
    });

    test('GET /api/ validate wrong end points returns "HTTP: 404" as status', async () => {
      const { status } = await requestGet(baseUrl, 'api', header(100, 50));

      expect(status).toEqual(404);
    });

    test('validate "GET /api/" end points returns "status", "message" and "details" of valid URI for all underlying api route', async () => {
      const { body } = await requestGet(baseUrl, 'api', header(100, 50));

      expect(body).toEqual({
        status: 404,
        details: 'valid URI {"v1URI":"/v1"}',
      });
    });

    test('GET /api/v1/ validate wrong end points returns "HTTP: 404" as status', async () => {
      const { status } = await requestGet(baseUrl, 'api/v1', header(100, 50));

      expect(status).toEqual(404);
    });

    test('validate "GET /api/v1/" end points returns "status", "message" and "details" of valid URI for all underlying v1 route', async () => {
      const { body } = await requestGet(baseUrl, 'api/v1', header(100, 50));

      expect(body).toEqual({
        status: 404,
        details: 'valid URI {"docsURI":"/docs","season":{"method":"GET","URI":"/season"}}',
      });
    });

    test('validate error is returned when invalid HTTP verp is used instead of GET', async () => {
      const { status } = await requestPost(
        baseUrl,
        'api/v1/season',
        {},
      );

      expect(status).toBe(404);
    });
  });

  describe('invalid data', () => {
    [{
      testName: 'longitude below lower boundary',
      longitude: '-200',
      latitude: '45',
    }, {
      testName: 'latitude below lower boundary',
      longitude: '-170',
      latitude: '-99',
    }, {
      testName: 'longitude above highest boundary',
      longitude: '200',
      latitude: '45',
    }, {
      testName: 'latitude above highest boundary',
      longitude: '70',
      latitude: '99',
    }, {
      testName: 'longitude is blank string',
      longitude: '',
      latitude: '45',
    }, {
      testName: 'latitude is blank string',
      longitude: '70',
      latitude: '',
    }].forEach((testCase) => {
      it(`validate when ${testCase.testName} service throws error`, async () => {
        const { body, status } = await requestGet(
          baseUrl,
          'api/v1/season',
          header(testCase.longitude, testCase.latitude),
        );

        expect(status).toEqual(400);
        expect(body).toEqual({
          status: 400,
          details: 'longitude or latitude value. Valid values of LONGITUDE should be between -180 to 180 and LATITUDE should be between -90 and 90',
        });
      });
    });
  });
});
