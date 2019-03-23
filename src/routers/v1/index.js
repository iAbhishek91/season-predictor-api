import { Router } from 'express';
import documentRoute from './documentation';
import errorHandler from '../../middleware/errorHandler';

const v1RouteEntry = Router();
const validRoutes = {
  docsURI: '/docs',
};

v1RouteEntry.use(validRoutes.docsURI, documentRoute);

v1RouteEntry.use(errorHandler(validRoutes));

export default v1RouteEntry;
