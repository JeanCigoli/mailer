import { adaptRoute } from '../../adapters/adapt-route';
import { adapterOptions } from '../../adapters/adapt-switch-middleware';
import { makeSendMessageDefault } from '../../factories/controller/whatsapp';

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
    expected: { stepId: 8 },
    handle: adaptRoute(makeSendMessageDefault([1, 2, 0])),
  },
];
