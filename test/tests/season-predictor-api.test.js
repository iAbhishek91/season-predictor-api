import config from 'config';
import { validRoutes as appValidRoutes } from '../../src/app';
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
  });

  describe('invalid end-points', () => {
    test('GET /abcdef/ validate wrong end points returns "HTTP: 404" as status', async () => {
      const { status } = await requestGet(baseUrl, 'abcdef', header(100, 50));

      expect(status).toEqual(400);
    });

    test('GET /abcdef/ validate wrong end points returns valid URI guide as body', async () => {
      const { body } = await requestGet(baseUrl, 'abcdef', header(100, 50));

      expect(body).toEqual(JSON.stringify(appValidRoutes));
    });

    test('GET /api/v1/seaso/ validate wrong end points returns "HTTP: 404"');
    test('GET /api/v1/seaso/ validate wrong end points returns "HTTP: 404"');
  });
});
