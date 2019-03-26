import config from 'config';
import { seasonDefinition } from '../../constants';
import request from '../../util/request';
import AIPError from '../../util/APIError';

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
  console.log(config.temperatureUrl);
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
      console.log(`temperature${temperature}, humidity${humidity}`);
      if (temperature && humidity) season = determineSeason(temperature, humidity);

      response.status = 200;
      response.json = season;
    } catch (e) {
      const aipError = new AIPError(
        500,
        'Internal server error',
        'Exception thrown while determining season.',
      );
      response.status = aipError.status;
      response.json = aipError;
    }
  } else {
    const aipError = new AIPError(
      400,
      'Bad request, probably invalid headers',
      'longitude or latitude value. Valid values of LONGITUDE should be between -180 to 180 and LATITUDE should be between -90 and 90',
    );
    response.status = aipError.status;
    response.json = aipError;
  }

  return response;
};

export default async (req, res) => {
  const { longitude, latitude } = req.headers;
  const { status, json } = await seasonHelper(longitude, latitude);
  res.status(status).json(json);
};
