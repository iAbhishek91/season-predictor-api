import { Router } from 'express';
import documentRoute from './documentation';

const v1RouteEntry = Router();

v1RouteEntry.use('/docs', documentRoute);

export default v1RouteEntry;
