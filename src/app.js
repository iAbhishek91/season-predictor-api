import express from 'express';
import router from './routers/v1/documentation';
import logger from './middleware/logger';

const app = express();

app.use(logger);

app.get('/', (_, req) => {
  req.status(200);
  req.json({
    message: 'home page',
  });
});

app.use('/docs', router);

export default app;
