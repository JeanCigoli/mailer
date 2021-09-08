import { Router } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adaptMiddlewareStep } from '../../adapters/adapt-middleware-step';
import { adaptMiddlewareXml } from '../../adapters/adapt-middleware-xml';
import { adaptSwitchMiddleware } from '../../adapters/adapt-switch-middleware';
import { makeVerifyStepUra } from '../../factories/middlewares/core/make-verify-step-ura';
import { makeXmlParser } from '../../factories/middlewares/ura';
import {
  formatUraSwitchConfig,
  stepCoreSwitchConfig,
  stepMiddlewareSwitchConfig,
} from '../config';

export default (routes: Router) => {
  routes.post(
    '/',
    adaptMiddlewareXml(makeXmlParser()),
    adaptMiddlewareStep(makeVerifyStepUra()),
    adaptSwitchMiddleware(stepMiddlewareSwitchConfig),
    adaptSwitchMiddleware(stepCoreSwitchConfig),
    adaptSwitchMiddleware(formatUraSwitchConfig),
  );
};
