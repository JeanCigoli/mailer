import { adaptJob } from '../adapters/adapt-job';
import { adaptListenerJob } from '../adapters/adapt-listener-job';
import { makeSendSmsJob } from '../factories/jobs/make-send-sms-job';
import { Listener } from '../protocols/listener';

export const xpto: Listener = {
  enable: true,
  queue: 'xpto',
  handle: adaptListenerJob(makeSendSmsJob()),
};
