import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
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
    handle: adaptRoute(makeSendMessageDefault()),
  },
];
