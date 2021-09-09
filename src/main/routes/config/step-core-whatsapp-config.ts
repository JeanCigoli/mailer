import { NextFunction, Request, Response } from 'express';
import { adaptMiddleware } from '../../adapters/adapt-middleware';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAuthenticationWhats,
  makeConfirmInformationNumberWhats,
  makeInformationNumberWhats,
  makeMainMenuWhats,
  makeMenuRechargeWhats,
  makeMenuTokenWhats,
  makeResendInformationNumberWhats,
} from '../../factories/middlewares/core';

export const stepCoreWhatsAppSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: adaptMiddleware(makeAuthenticationWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptMiddleware(makeMenuTokenWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptMiddleware(makeMainMenuWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptMiddleware(makeMenuRechargeWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptMiddleware(makeInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptMiddleware(makeResendInformationNumberWhats()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptMiddleware(makeConfirmInformationNumberWhats()),
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      console.log(req.step);

      return next();
    },
  },
];
