import { Job } from '../protocols/listener-job';

export function adaptListenerJob(job: Job) {
  return async (message: object, next?: Function) => {
    await job.handle(message, next);
  };
}
