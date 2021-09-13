import { ConsumptionSms } from '../../../../domain/usecases/sms/consumption/consumption-sms';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpConsumptionSms implements ConsumptionSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): ConsumptionSms.Result {
    const internet = body.data.consumption.data;
    const sms = body.data.consumption.sms;
    const voice = body.data.consumption.voice;

    const message = replaceKeyToValue(body.messages, {
      usedInternet: internet.used,
      usedSms: sms.used,
      usedVoice: voice.used,
      availableInternet: internet.available,
      availableSms: sms.available,
      availableVoice: voice.available,
      dateGrace: body.data.dateGrace,
    });

    await this.sendSms.send({
      message,
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
  }
}
