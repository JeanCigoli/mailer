import { NextFunction, Request, Response } from 'express';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';

export const stepMiddlewareSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou no primeiro step');

      return next();
    },
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou 2 step');

      return next();
    },
  },
  {
    handle: (req: Request, res: Response, next: NextFunction) => {
      console.log('Estou na rota default');

      return next();
    },
  },
];
