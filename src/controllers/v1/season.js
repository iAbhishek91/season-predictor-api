import config from 'config';
import { seasonDefinition } from '../../constants';
import request from '../../util/request';

const seasonMap = new Map(seasonDefinition);

export const validateLongitude = longitude => (
  longitude
    ? (Number(longitude) <= 180 && Number(longitude) >= -180)
    : false
);

export const validateLatitude = latitude => (
  latitude
    ? (Number(latitude) <= 90 && Number(latitude) >= -90)
    : false
);

export const determineSeason = (temperature, humidity) => {
  let season;

  seasonMap.forEach((value, key) => {
    const isTermperatureValid = temperature >= value.temperature.range.min
    && temperature <= value.temperature.range.max;

    const isHumidityValid = humidity >= value.humidity.range.min
    && humidity <= value.humidity.range.max;

    if (isTermperatureValid && isHumidityValid) season = key;
  });

  return { season };
};

export const seasonHelper = async (longitude, latitude) => {
  const temperatureRequest = request(config.temperatureUrl);
  const response = {};
  let season;

  if (
    validateLongitude(longitude)
    && validateLatitude(latitude)
  ) {
    try {
      const { temperature, humidity } = await temperatureRequest(
        '/api/v1/weather',
        'GET',
        { longitude, latitude },
      );

      if (temperature && humidity) season = determineSeason(temperature, humidity);
      if (season) {
        response.status = 200;
        response.json = season;
      } else {
        const e = new Error('Not able to determine season');
        e.status = 500;
        throw e;
      }
    } catch (e) {
      response.status = e.status || 500;
      response.json = e;
    }
  } else {
    response.status = 400;
    response.json = {
      error: `Invalid headers: longitude or latitude value.
        Valid values of "LONGITUDE" should be between -180 to 180 and "LATITUDE" should be between -90 and 90`,
    };
  }

  return response;
};

export default async (req, res) => {
  const { longitude, latitude } = req.headers;
  const { status, json } = await seasonHelper(longitude, latitude);
  res.status(status).json(json);
};
