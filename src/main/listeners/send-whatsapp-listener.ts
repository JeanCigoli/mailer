import {
  adaptMiddlewareStepJob,
  adaptSwitchMiddleware,
  listenerMiddlewareAdapter,
} from '../adapters';
import { adaptListenerJob } from '../adapters/adapt-listener-job';
import { makeFormatterWhatsApp } from '../factories/jobs/whatsapp';
import { makeVerifyStepWhatsApp } from '../factories/middlewares/dialogue';
import { Listener } from '../protocols/listener';
import {
  formatWhatsAppSwitchConfig,
  sourceSwitchConfig,
} from '../routes/config';

const middlewares = [
  adaptListenerJob(makeFormatterWhatsApp()),
  adaptMiddlewareStepJob(makeVerifyStepWhatsApp()),
  adaptSwitchMiddleware(sourceSwitchConfig),
  adaptSwitchMiddleware(formatWhatsAppSwitchConfig),
];

const sendWhatsAppMessage: Listener = {
  enable: true,
  queue: 'datora-communication-whatsapp',
  handle: listenerMiddlewareAdapter(...middlewares),
};

export { sendWhatsAppMessage };
