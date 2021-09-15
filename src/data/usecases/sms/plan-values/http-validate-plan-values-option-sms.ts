import { ValidatePlanValuesOptionSms } from '../../../../domain/usecases/sms/plan-values/validate-plan-values-option-sms';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpValidatePlanValuesOptionSms
  implements ValidatePlanValuesOptionSms
{
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): Promise<void> {
    const messages: Array<string> = body.messages;
    const canRechargeSingle: Boolean = body.canRechargeSingle;

    const [text] = messages;

    const [firstMessage, options] = text.split('|||');

    const arrayOptions = JSON.parse(options);

    const finalText = `${firstMessage} ${
      canRechargeSingle ? arrayOptions[0] : arrayOptions[1]
    }`;

    await this.sendSms.send({
      clientToken: body.token,
      message: finalText,
      msisdn: body.msisdn,
    });
  }
}
