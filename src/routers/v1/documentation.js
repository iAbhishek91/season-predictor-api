import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import path from 'path';

const docRouter = Router();

docRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(yamljs.load(path.join(__dirname, '../../../', 'docs', 'api', 'v1', 'swagger.yml'))),
);

export default docRouter;
