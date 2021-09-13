import {
  adaptMiddlewareStepJob,
  adaptSwitchMiddleware,
  listenerMiddlewareAdapter,
} from '../adapters';
import { adaptListenerJob } from '../adapters/adapt-listener-job';
import { sendWhatsAppMiddleware } from '../factories/jobs';
import { makeVerifyStepWhatsApp } from '../factories/middlewares/dialogue';
import { Listener } from '../protocols/listener';
import {
  formatWhatsAppSwitchConfig,
  sourceSwitchConfig,
} from '../routes/config';

const middlewares = [
  adaptListenerJob(sendWhatsAppMiddleware()),
  adaptMiddlewareStepJob(makeVerifyStepWhatsApp()),
  adaptSwitchMiddleware(sourceSwitchConfig),
  adaptSwitchMiddleware(formatWhatsAppSwitchConfig),
];

const sendWhatsAppMessage: Listener = {
  enable: true,
  queue: 'mailer',
  handle: listenerMiddlewareAdapter(...middlewares),
};

export { sendWhatsAppMessage };
