import { TokenSms } from '../../../../domain/usecases/sms/token/token-sms';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class TokenJobSms implements Job {
  constructor(private readonly tokenSms: TokenSms) {}
  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      await this.tokenSms.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
