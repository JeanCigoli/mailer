import { format } from 'date-fns';
import { ConsumptionSms } from '../../../../domain/usecases/sms/consumption/consumption-sms';
import { removedAccent } from '../../../../utils';
import { replaceKeyToValue } from '../../../../utils/replace-key-to-value';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpConsumptionSms implements ConsumptionSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): ConsumptionSms.Result {
    const internet = body.data.consumption.data;
    const sms = body.data.consumption.sms;
    const voice = body.data.consumption.voice;

    const message = replaceKeyToValue(body.messages[0], {
      usedInternet: internet.used || 0,
      usedSms: sms.used || 0,
      usedVoice: voice.used || 0,
      availableInternet: (internet.available / 1024).toFixed(1),
      availableSms: sms.available,
      availableVoice: voice.available,
      dateGrace: format(new Date(body.data.dateGrace), 'dd/MM/yyyy'),
    });

    await this.sendSms.send({
      message: removedAccent(message),
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
  }
}
