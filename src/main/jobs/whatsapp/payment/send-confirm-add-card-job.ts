import { SendConfirmAddCard } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendConfirmAddCardJob implements Job {
  constructor(private readonly confirmAddCard: SendConfirmAddCard) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.confirmAddCard.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
