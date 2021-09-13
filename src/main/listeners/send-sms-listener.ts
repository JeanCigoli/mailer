import {
  adaptMiddlewareStepJob,
  adaptSwitchMiddleware,
  listenerMiddlewareAdapter,
} from '../adapters';
import { adaptListenerJob } from '../adapters/adapt-listener-job';
import { makeVerifyStepSms } from '../factories/middlewares/dialogue';
import { makeSmsBodyJob } from '../factories/middlewares/sms/make-sms-body-job';
import { Listener } from '../protocols/listener';
import { sourceSwitchConfig } from '../routes/config';
import { formatSmsSwitchConfig } from '../routes/config/format-sms-config';

const middlewares = [
  adaptListenerJob(makeSmsBodyJob()),
  adaptMiddlewareStepJob(makeVerifyStepSms()),
  adaptSwitchMiddleware(sourceSwitchConfig),
  adaptSwitchMiddleware(formatSmsSwitchConfig),
];

export const sendSmsListener: Listener = {
  enable: true,
  queue: 'datora-communication-sms',
  handle: listenerMiddlewareAdapter(...middlewares),
};
