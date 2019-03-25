import express from 'express';
import bodyParser from 'body-parser';
import routeEntry from './routers';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';

const app = express();
export const validRoutes = {
  apiURI: '/api',
};

app.use(logger);

app.use(bodyParser.json());

app.use(validRoutes.apiURI, routeEntry);

app.use(errorHandler(validRoutes));

export default app;
