import express from 'express';
import bodyParser from 'body-parser';
import routeEntry from './routers';
import logger from './middleware/logger';
import throwAIPError from './middleware/throwAIPError';
import errorHandler from './middleware/errorHandler';

const app = express();
export const validRoutes = {
  apiURI: '/api',
};

app.use(logger);

app.use(bodyParser.json());

app.use(validRoutes.apiURI, routeEntry);

app.use(throwAIPError(404, 'Endpoint not found', `Endpoint not found. Valid URI ${JSON.stringify(validRoutes)}`));

app.use(errorHandler);

export default app;
