import { Request, Response } from 'express';
import { makeResponseXml } from '../../../utils/response/response-xml';
import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeRechargePlanValuesControllerUra } from '../../factories/ura/plan-values/make-plan-values-controller-ura';

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
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRoute(makeRechargePlanValuesControllerUra()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRoute(),
  },
  {
    handle: (req: Request, res: Response) => {
      console.log('Estou na rota default');

      return res.json({ message: 'retorno default' });
    },
  },
];
