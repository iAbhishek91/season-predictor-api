import { Router } from 'express';
import v1Route from './v1';
import errorHandler from '../middleware/errorHandler';

const routeEntry = Router();
const validRoutes = {
  v1URI: '/v1',
};

routeEntry.use(validRoutes.v1URI, v1Route);

routeEntry.use(errorHandler(validRoutes));

export default routeEntry;
