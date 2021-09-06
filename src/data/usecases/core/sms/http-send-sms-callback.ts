import { SendSmsCallback } from '../../../../domain/usecases/core/sms/send-sms-callback';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpSendSmsCallback implements SendSmsCallback {
  constructor(private readonly sendSms: SendSms) {}

  async handle(params: SendSmsCallback.Params): SendSmsCallback.Result {
    const result = await this.sendSms.send(params);

    if (!result.status) {
      throw new Error('ERROR_SEND_SMS');
    }
  }
}
