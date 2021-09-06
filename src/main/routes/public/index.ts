import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepWhatsApp } from '../../factories/middlewares/core/make-verify-step-whats';
import { makeXmlParser } from '../../factories/middlewares/ura';
import {
  stepMiddlewareSwitchConfig,
  stepCoreSwitchConfig,
  formatUraSwitchConfig,
} from '../config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareXml(makeXmlParser()),
    adaptMiddlewareStep(makeVerifyStepWhatsApp()),
    adaptSwitchMiddleware(stepMiddlewareSwitchConfig),
    adaptSwitchMiddleware(stepCoreSwitchConfig),
    adaptSwitchMiddleware(formatUraSwitchConfig),
  );
};
