import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepUra } from '../../factories/middlewares/dialogue';
import { sourceSwitchConfig } from '../config';
import { formatSmsSwitchConfig } from '../config/format-sms-config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareStep(makeVerifyStepUra()),
    adaptSwitchMiddleware(sourceSwitchConfig),
    adaptSwitchMiddleware(formatSmsSwitchConfig),
  );
};
