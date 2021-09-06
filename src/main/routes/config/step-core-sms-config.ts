import { NextFunction, Request, Response } from 'express';
import { adaptMiddleware } from '../../adapters/adapt-middleware';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeAuthenticationSms } from '../../factories/middlewares/core';

export const stepCoreSmsSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddleware(makeAuthenticationSms()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
