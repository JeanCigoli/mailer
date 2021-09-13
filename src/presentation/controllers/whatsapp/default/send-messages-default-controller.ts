import { SendMessagesDefault } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendMessagesDefaultController implements Job {
  constructor(private readonly sendMessagesDefault: SendMessagesDefault) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendMessagesDefault.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
