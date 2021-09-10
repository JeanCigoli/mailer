import { SendSms } from '../../../../data/protocols/core/http/send-sms';
import { SuccessSms } from '../../core/sms/success-sms';

export class HttpSuccessSms implements SuccessSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): SuccessSms.Result {
    // const { body, messages } = params;

    const messages: Array<string> = body.messages;

    const data = body.data;

    messages.map(async (message) => {
      const newMessage = replaceKeyToValue(message, data);

      const result = await this.sendSms.send({
        message: newMessage,
        msisdn: body.msisdn,
      });
    });
    return { status: true };
  }
}
