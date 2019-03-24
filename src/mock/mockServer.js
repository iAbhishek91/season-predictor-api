import express from 'express';
import positiveWeather from './responses/positiveWeather';

const app = express();

app.get('/api/v1/weather', (_, res) => {
  res.status(positiveWeather.status).json(positiveWeather.body);
});

app.listen(7070);
