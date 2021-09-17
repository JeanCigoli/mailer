import { SendSmsCallback } from '../../domain/usecases/core/sms/send-sms-callback';
import errorLogger from '../../utils/logger';
import { Job } from '../protocols/listener-job';

export class SendSmsJob implements Job {
  constructor(private readonly sendSmsCallback: SendSmsCallback) {}

  async handle(json: Record<any, any>): Promise<void> {
    try {
      await this.sendSmsCallback.handle({
        message: json.message,
        msisdn: json.msisdn,
        clientToken: json.token,
      });
    } catch (e) {
      errorLogger(e);
    }
  }
}
