import { ListCardsSms } from '../../../../domain/usecases/sms/list-cards/list-cards-sms';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class ListCardsJobSms implements Job {
  constructor(private readonly listCardsSms: ListCardsSms) {}
  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      await this.listCardsSms.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
