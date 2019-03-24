import { Router } from 'express';
import seasonController from '../../controllers/v1/season';

const seasonRoute = Router();

seasonRoute.get('/', seasonController);

export default seasonRoute;
