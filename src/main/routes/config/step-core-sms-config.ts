import { NextFunction, Request, Response } from 'express';
import { adaptMiddlewareJob } from '../../adapters';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAuthenticationSms,
  makeMainMenuSms,
  makeMenuTokenSms,
} from '../../factories/middlewares/core';

export const stepCoreSmsSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddlewareJob(makeAuthenticationSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddlewareJob(makeMenuTokenSms()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddlewareJob(makeMainMenuSms()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
