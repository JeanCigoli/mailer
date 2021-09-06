import { SendSmsCallback } from '../../domain/usecases/core/sms/send-sms-callback';
import { Job } from '../protocols/listener-job';

export class SendSmsJob implements Job {
  constructor(private readonly sendSmsCallback: SendSmsCallback) {}

  async handle(message: string): Promise<void> {
    try {
      const json = JSON.parse(message);

      await this.sendSmsCallback.handle({
        message: json.message,
        msisdn: json.msisdn,
      });
    } catch (e) {
      console.log({ e });
    }
  }
}
