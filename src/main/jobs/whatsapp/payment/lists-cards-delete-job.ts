import { ListsCardsDelete } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class ListsCardsDeleteJob implements Job {
  constructor(private readonly listsCardsDelete: ListsCardsDelete) {}

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
