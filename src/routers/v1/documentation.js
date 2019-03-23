import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import path from 'path';

const docRouter = Router();

docRouter.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(yamljs.load(path.join(__dirname, '../../../', 'swagger.yml'))),
);

export default docRouter;
