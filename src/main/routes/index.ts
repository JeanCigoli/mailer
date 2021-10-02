import { Router } from 'express';
import { adaptMiddleware, adaptRoute } from '../adapters';
import { makeSendShipments } from '../factories/controller';
import { makeAuthenticateByTokenMiddleware } from '../factories/middleware';

export default (routes: Router) => {
  routes.get('/', async (_, res) => {
    return res.json({
      message: 'API mailer is on',
    });
  });

  routes.post(
    '/shipments',
    adaptMiddleware(makeAuthenticateByTokenMiddleware()),
    adaptRoute(makeSendShipments()),
  );
};
