import { SendDeleteCardSuccess } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendDeleteCardSuccessJob implements Job {
  constructor(private readonly deleteCardSuccess: SendDeleteCardSuccess) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.deleteCardSuccess.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
