import { Request, Response } from 'express';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';

export const formatSmsSwitchConfig: adapterOptions = [
  {
    handle: (req: Request, res: Response) => {
      res.json({
        Teste: 'Ok',
      });
    },
  },
  // {
  //   target: { step : 'stepId' },
  //   expected: { stepId: 1 },
  //   handle: ,
  // },
];
