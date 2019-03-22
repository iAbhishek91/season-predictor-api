import express from 'express';
import logger from './middleware/logger';

const app = express();

app.use(logger);

app.get('/', (_, req) => {
  req.status(200);
  req.json({
    message: 'home page',
  });
});

export default app;
