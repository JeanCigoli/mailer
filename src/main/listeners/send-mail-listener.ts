import { adaptListenerJob, listenerMiddlewareAdapter } from '../adapters';
import { makeSendMail } from '../factories/jobs';
import { Listener } from '../protocols/listener';

const middlewares = [adaptListenerJob(makeSendMail())];

export const sendMailListener: Listener = {
  enable: true,
  queue: 'mailer',
  handle: listenerMiddlewareAdapter(...middlewares),
};
