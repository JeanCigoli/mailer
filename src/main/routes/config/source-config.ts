import { stepCoreUraSwitchConfig } from '.';
import { Source } from '../../../utils/enum/source';
import {
  adapterOptions,
  adaptSwitchMiddleware,
} from '../../adapters/adapt-switch-middleware';

export const sourceSwitchConfig: adapterOptions = [
  {
    target: { step: 'sourceId' },
    expected: { sourceId: Source.URA },
    handle: adaptSwitchMiddleware(stepCoreUraSwitchConfig),
  },
  {
    target: { step: 'sourceId' },
    expected: { sourceId: Source.WHATSAPP },
    handle: adaptSwitchMiddleware(stepCoreUraSwitchConfig),
  },
  {
    target: { step: 'sourceId' },
    expected: { sourceId: Source.SMS },
    handle: adaptSwitchMiddleware(stepCoreUraSwitchConfig),
  },
];