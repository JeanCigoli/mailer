import { ConsumptionXml } from '../../../../../domain/usecases/ura/response/consumption-xml';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { SendSms } from '../../../../protocols/core/http/send-sms';

export class DbConsumptionXmlResponse implements ConsumptionXml {
  constructor(private readonly SendSms: SendSms) {}

  async handle(body: any): Promise<string> {
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

    await this.SendSms.send({
      message,
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });

    return makeResponseXml({
      status: body.status ? 'P00' : 'P01',
      messages: body.messages,
    });
  }
}
