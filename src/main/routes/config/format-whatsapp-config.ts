import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import {
  makeSendConsumption,
  makeSendMessageDefault,
} from '../../factories/controller/whatsapp';

export const formatWhatsAppSwitchConfig: adapterOptions = [
  {
    target: { step: 'stepId' },
    expected: { stepId: 2 },
    handle: adaptRoute(makeSendMessageDefault([1, 2])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 3 },
    handle: adaptRoute(makeSendMessageDefault([])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 4 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 3])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 5 },
    handle: adaptRoute(makeSendConsumption()),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 8 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 0])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 0])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 9 },
    handle: adaptRoute(makeSendMessageDefault([])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 10 },
    handle: adaptRoute(makeSendMessageDefault([1, 0])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 11 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 0])),
  },
  {
    target: { step: 'stepId' },
    expected: { stepId: 12 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 0])),
  },
];
