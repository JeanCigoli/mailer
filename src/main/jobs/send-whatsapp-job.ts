import errorLogger from '../../utils/logger';
import { Job } from '../protocols/listener-job';

export class SendWhatsAppJob implements Job {
  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      console.log(message);

      message.step = {
        stepId: 35,
      };

      next();
    } catch (error) {
      errorLogger(error);
    }
  }
}
