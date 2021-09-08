import { Request, Response } from 'express';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';

export const formatWhatsAppSwitchConfig: adapterOptions = [
  {
    handle: (req: Request, res: Response) => {
      console.log('Step:', req.step);
      console.log('Body:', req.body);
      return res.send(req.body);
    },
  },
];
