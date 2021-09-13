import { adaptListenerJob } from '../../adapters/adapt-listener-job';
import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAccountNotFound,
  makeSendBilletRecharge,
  makeSendConsumption,
  makeSendListCardRecharge,
  makeSendListValuesRecharge,
  makeSendMessageDefault,
} from '../../factories/controller/whatsapp';

export const formatWhatsAppSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptRoute(makeSendConsumption()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptRoute(makeSendListValuesRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 15 },
    handle: adaptRoute(makeSendBilletRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptRoute(makeSendListCardRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 32 },
    handle: adaptRoute(makeAccountNotFound()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 35 },
    handle: (message: any, next: any) => {
      console.log('Estou na rota default');
      console.log(message);

      return next();
    },
  },
  {
    handle: adaptListenerJob(makeSendMessageDefault()),
  },
];
