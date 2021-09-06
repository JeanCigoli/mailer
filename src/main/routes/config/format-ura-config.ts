import { Request, Response } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';

export const formatUraSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 1 },
    handle: (req: Request, res: Response) => {
      console.log(req.body);
      console.log(req.step);

      return res.send(makeResponseXml({ ...req.step, ...req.body }));
    },
  },
  {
    handle: (req: Request, res: Response) => {
      console.log('Estou na rota default');

      return res.json({ message: 'retorno default' });
    },
  },
];
