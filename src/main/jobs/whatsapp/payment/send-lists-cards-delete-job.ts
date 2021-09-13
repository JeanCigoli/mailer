import { SendListsCardsDelete } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendListsCardsDeleteJob implements Job {
  constructor(private readonly listsCardsDelete: SendListsCardsDelete) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.listsCardsDelete.list({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
