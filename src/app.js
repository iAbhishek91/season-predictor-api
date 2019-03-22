import app from './server';
import logger from './middleware/logger';

app.use(logger);
