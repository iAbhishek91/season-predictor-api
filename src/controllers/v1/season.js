import config from 'config';
import { seasonDefinition } from '../../constants';
import request from '../../util/request';

const seasonMap = new Map(seasonDefinition);

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
  let season;

  try {
    const { temperature, humidity } = await temperatureRequest(
      '/api/v1/weather',
      'GET',
      { longitude, latitude },
    );

    if (temperature && humidity) season = determineSeason(temperature, humidity);

    return { status: 200, json: season };
  } catch (e) {
    return { status: e.status || 500, json: e };
  }
};

export default async (req, res) => {
  const { longitude, latitude } = req.headers;
  const { status, json } = await seasonHelper(longitude, latitude);
  res.status(status).json(json);
};
