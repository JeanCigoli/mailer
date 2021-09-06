import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepWhatsApp } from '../../factories/middlewares/dialogue';
import { makeXmlParser } from '../../factories/middlewares/ura';
import { stepCoreSwitchConfig, formatUraSwitchConfig } from '../config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareXml(makeXmlParser()),
    adaptMiddlewareStep(makeVerifyStepWhatsApp()),
    adaptSwitchMiddleware(stepCoreSwitchConfig),
    adaptSwitchMiddleware(formatUraSwitchConfig),
  );
};
