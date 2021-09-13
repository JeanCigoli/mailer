import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepSms } from '../../factories/middlewares/dialogue';
import { sourceSwitchConfig } from '../config';
import { formatSmsSwitchConfig } from '../config/format-sms-config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareStep(makeVerifyStepSms()),
    adaptSwitchMiddleware(sourceSwitchConfig),
    (req, res, next) => {
      console.log('ESTOU AQUI!');

      return next();
    },
    adaptSwitchMiddleware(formatSmsSwitchConfig),
  );

  routes.get('/', (req, res) => {
    res.json({ teste: 'on!' });
  });
};
