import { SendMail } from '../../domain/usecases';
import { Job } from '../../main/protocols/listener-job';
import errorLogger from '../../utils/logger';

export class SendMailJob implements Job {
  constructor(private readonly sendMail: SendMail) {}
  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendMail.send({
        ...message.body,
      });

      return;
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
