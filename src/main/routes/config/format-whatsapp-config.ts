import { adaptListenerJob } from '../../adapters/adapt-listener-job';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAccountNotFound,
  makeListsCardsDelete,
  makeSendBilletRecharge,
  makeSendConsumption,
  makeSendListCardRecharge,
  makeSendListValuesRecharge,
  makeSendMessageDefault,
} from '../../factories/jobs/whatsapp';

export const formatWhatsAppSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptListenerJob(makeSendConsumption()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 13 },
    handle: adaptListenerJob(makeSendListValuesRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 15 },
    handle: adaptListenerJob(makeSendBilletRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 16 },
    handle: adaptListenerJob(makeSendListCardRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 28 },
    handle: adaptListenerJob(makeListsCardsDelete()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 32 },
    handle: adaptListenerJob(makeAccountNotFound()),
  },
  {
    handle: adaptListenerJob(makeSendMessageDefault()),
  },
];
