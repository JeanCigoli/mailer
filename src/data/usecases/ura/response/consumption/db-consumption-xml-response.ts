import { ConsumptionXml } from '../../../../../domain/usecases/ura/response/consumption-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { SendSms } from '../../../../protocols/core/http/send-sms';

export class DbConsumptionXmlResponse implements ConsumptionXml {
  constructor(private readonly SendSms: SendSms) {}

  async handle(body: any): Promise<string> {
    await this.SendSms.send({
      message: JSON.stringify(body.data),
      msisdn: body.msisdn,
    });

    return makeResponseXml({
      status: body.status ? 'P00' : 'P01',
      messages: body.messages,
    });
  }
}
