import { SendSms } from '../../../protocols/core/http/send-sms';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { SuccessSms } from '../../../../domain/usecases/sms/default/success-sms';

export class HttpSuccessSms implements SuccessSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): SuccessSms.Result {
    // const { body, messages } = params;

    console.log({ body });

    const messages: Array<string> = body.messages;

    const data = body.data;

    // console.log({ data });

    messages.map(async (message) => {
      const newMessage = replaceKeyToValue(message, data);

      await this.sendSms.send({
        message: newMessage,
        msisdn: data.msisdn,
        clientToken: data.token,
      });
    });
    return { status: true };
  }
}
