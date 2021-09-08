import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepWhatsApp } from '../../factories/middlewares/dialogue';
import { formatWhatsAppSwitchConfig, sourceSwitchConfig } from '../config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareStep(makeVerifyStepWhatsApp()),
    adaptSwitchMiddleware(sourceSwitchConfig),
    adaptSwitchMiddleware(formatWhatsAppSwitchConfig),
  );
};
