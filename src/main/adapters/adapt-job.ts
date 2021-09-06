import { Job } from '../protocols/job';

export function adaptJob(job: Job) {
  return async () => {
    await job.handle();
  };
}
