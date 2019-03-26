import { Router } from 'express';
import documentRoute from './documentation';
import seasonRoute from './season';
import errorHandler from '../../middleware/errorHandler';
import throwAIPError from '../../middleware/throwAIPError';

const v1RouteEntry = Router();
const validRoutes = {
  docsURI: '/docs',
  season: {
    method: 'GET',
    URI: '/season',
  },
};

v1RouteEntry.use(validRoutes.docsURI, documentRoute);

v1RouteEntry.use(validRoutes.season.URI, seasonRoute);

v1RouteEntry.use(throwAIPError(404, 'Endpoint not found', `valid URI ${JSON.stringify(validRoutes)}`));

v1RouteEntry.use(errorHandler);

export default v1RouteEntry;
