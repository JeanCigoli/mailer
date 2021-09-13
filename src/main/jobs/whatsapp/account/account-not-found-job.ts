import { AccountNotFound } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class AccountNotFoundJob implements Job {
  constructor(private readonly AccountNotFound: AccountNotFound) {}
  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.AccountNotFound.notFound({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
