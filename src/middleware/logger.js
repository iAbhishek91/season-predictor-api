import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const stream = fs.createWriteStream(
  path.join(__dirname, '../../', 'app.log'),
  { flag: 'a' },
);

export default morgan('combined', { stream });
