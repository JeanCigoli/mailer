import { TokenSms } from '../../../../domain/usecases/sms/token/token-sms';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpTokenSms implements TokenSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): TokenSms.Result {
    const messages: Array<string> = body.messages;

    for await (const message of messages) {
      await this.sendSms.send({
        message: replaceKeyToValue(message, body.data),
        msisdn: body.msisdn,
      });
    }
  }
}
