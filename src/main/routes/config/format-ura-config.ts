import { Request, Response } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: (req: Request, res: Response) => {
      const body = {
        message: req.body.messages,
      };
      return res.send(makeResponseXml({ ...body }));
    },
  },
  {
    handle: (req: Request, res: Response) => {
      return res.json({ message: 'retorno default' });
    },
  },
];
