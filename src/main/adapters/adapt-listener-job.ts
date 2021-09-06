import { Job } from '../protocols/listener-job';
import { Message } from 'amqplib';

export function adaptListenerJob(job: Job) {
  return async (message: Message) => {
    await job.handle(message.content.toString());
  };
}
