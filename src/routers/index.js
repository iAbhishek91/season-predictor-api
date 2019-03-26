import { Router } from 'express';
import v1Route from './v1';
import errorHandler from '../middleware/errorHandler';
import throwAIPError from '../middleware/throwAIPError';

const routeEntry = Router();
const validRoutes = {
  v1URI: '/v1',
};

routeEntry.use(validRoutes.v1URI, v1Route);

routeEntry.use(throwAIPError(404, 'Endpoint not found', `valid URI ${JSON.stringify(validRoutes)}`));

routeEntry.use(errorHandler);

export default routeEntry;
