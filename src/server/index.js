import express from 'express';
import config from 'config';

const app = express();
const port = config.get('port');

app.listen(port, () => {
  console.log(`server started at ${port}...`);// eslint-disable-line no-console
});

export default app;
