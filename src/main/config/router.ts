import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import { SERVER } from '../../utils/config/constants';

export default (app: Express): void => {
  const router = Router();

  app.use(SERVER.BASE_URI, router);

  const routesFolderPath = path.resolve(__dirname, '..', 'routes');

  readdirSync(routesFolderPath).map(async (file) => {
    if (!file.includes('.spec.') && !file.endsWith('.map')) {
      (await import(`${routesFolderPath}/${file}`)).default(router);
    }
  });
};
