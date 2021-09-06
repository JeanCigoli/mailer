import { Router } from 'express';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepUra } from '../../factories/middlewares/dialogue';
import { makeXmlParser } from '../../factories/middlewares/ura';
import { formatUraSwitchConfig, sourceSwitchConfig } from '../config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareXml(makeXmlParser()),
    adaptMiddlewareStep(makeVerifyStepUra()),
    adaptSwitchMiddleware(sourceSwitchConfig),
    adaptSwitchMiddleware(formatUraSwitchConfig),
  );
};
