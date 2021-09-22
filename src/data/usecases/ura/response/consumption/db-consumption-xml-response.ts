import { format } from 'date-fns';
import { ConsumptionXml } from '../../../../../domain/usecases/ura/response/consumption-xml';
import { removedAccent } from '../../../../../utils';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { SendSms } from '../../../../protocols/core/http/send-sms';

export class DbConsumptionXmlResponse implements ConsumptionXml {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): Promise<string> {
    const internet = body.data.consumption.data;
    const sms = body.data.consumption.sms;
    const voice = body.data.consumption.voice;

    const message = replaceKeyToValue(
      'Internet - usado: {{usedInternet}}GB, disponivel: {{availableInternet}}GB. SMS - usado: {{usedSms}}, disponivel: {{availableSms}}. Ligacao - usado: {{usedVoice}}min, disponivel: {{availableVoice}}min, validade: {{dateGrace}}',
      {
        usedInternet: internet.used || 0,
        usedSms: sms.used || 0,
        usedVoice: voice.used || 0,
        availableInternet: (internet.available / 1024).toFixed(1),
        availableSms: sms.available,
        availableVoice: voice.available,
        dateGrace: format(new Date(body.data.dateGrace), 'dd/MM/yyyy'),
      },
    );

    await this.sendSms.send({
      message: removedAccent(message),
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
    return makeResponseXml({
      status: 'P01',
      messages: body.messages,
    });
  }
}
