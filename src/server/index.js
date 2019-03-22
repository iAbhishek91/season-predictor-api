import config from 'config';
import app from '../app';

const port = config.get('port');

app.listen(port, () => {
  console.log(`server started at ${port}...`);// eslint-disable-line no-console
});

export default app;
