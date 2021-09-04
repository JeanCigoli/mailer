import fs from 'fs';
import path from 'path';
import { formatDate } from './date';

function errorLogger(error: any) {
  const date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');

  const pathError = path.resolve('log', 'error', 'error.log');

  const stringError = `------------------------------------------------
Date: ${date}
Error: ${error?.name}: ${error?.message} at ${error?.stack}
`;

  fs.appendFile(pathError, stringError, (errorLog) => {
    if (errorLog) throw errorLog;
  });
}

export default errorLogger;
