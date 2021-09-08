import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';
import { SERVER } from '../../utils/config/constants';

export default (app: Express, channel: 'ura' | 'sms' | 'whats'): void => {
  const router = Router();

  switch (channel) {
    case 'ura':
      app.use(SERVER.BASE_URI_URA, router);
      break;
    case 'sms':
      app.use(SERVER.BASE_URI_SMS, router);
      break;
    case 'whats':
      app.use(SERVER.BASE_URI_WHATS, router);
      break;
    default:
      app.use(SERVER.BASE_URI, router);
  }

  const routesFolderPath = path.resolve(__dirname, '..', 'routes', channel);

  readdirSync(routesFolderPath).map(async (file) => {
    if (!file.includes('.spec.') && !file.endsWith('.map')) {
      (await import(`${routesFolderPath}/${file}`)).default(router);
    }
  });
};
