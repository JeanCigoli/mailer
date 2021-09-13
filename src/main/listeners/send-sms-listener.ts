import { adaptListenerJob } from '../adapters/adapt-listener-job';
import { makeSendSmsJob } from '../factories/jobs/make-send-sms-job';
import { Listener } from '../protocols/listener';

export const sendSmsListener: Listener = {
  enable: true,
  queue: 'sms',
  handle: adaptListenerJob(makeSendSmsJob()),
};
