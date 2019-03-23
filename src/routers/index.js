import { Router } from 'express';
import v1Route from './v1';

const routeEntry = Router();

routeEntry.use('/v1', v1Route);

export default routeEntry;
