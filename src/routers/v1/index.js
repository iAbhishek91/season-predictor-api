import { Router } from 'express';
import documentRouter from './documentation';

const v1RouteEntry = Router();

v1RouteEntry.use('/docs', documentRouter);

export default v1RouteEntry;
