import { adaptListenerJob } from '../../adapters/adapt-listener-job';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeAccountNotFound,
  makeSendDeleteCardSuccess,
  makeSendListsCardsDelete,
  makeSendBilletRecharge,
  makeSendConsumption,
  makeSendListCardRecharge,
  makeSendListValuesRecharge,
  makeSendMessageDefault,
  makeSendConfirmAddCard,
  makeSendRechargeError,
} from '../../factories/jobs/whatsapp';
import { makeSendConfirmRecharge } from '../../factories/jobs/whatsapp/payment/make-send-confirm-recharge';

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
    handle: adaptListenerJob(makeSendListsCardsDelete()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 21 },
    handle: adaptListenerJob(makeSendConfirmRecharge()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 24 },
    handle: adaptListenerJob(makeSendRechargeError()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 29 },
    handle: adaptListenerJob(makeSendDeleteCardSuccess()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 26 },
    handle: adaptListenerJob(makeSendConfirmAddCard()),
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
