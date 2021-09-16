import { SuccessSms } from '../../../../domain/usecases/sms/default/success-sms';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SuccessJobSms implements Job {
  constructor(private readonly successSms: SuccessSms) {}
  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      await this.successSms.handle(message.body);
    } catch (e) {
      console.log({ message });
      errorLogger(e);
    }
  }
}
