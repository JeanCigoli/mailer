import { ConsumptionSms } from '../../../../domain/usecases/sms/consumption/consumption-sms';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpConsumptionSms implements ConsumptionSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): ConsumptionSms.Result {
    const internet = body.data.consumption.data;
    const sms = body.data.consumption.sms;
    const voice = body.data.consumption.voice;

    const message = `Consumo:\n Internet: usado: ${internet.used} GB, disponível: ${internet.available} GB \n SMS: usado: ${sms.used}, disponível: ${sms.available} \n ligação: usado: ${voice.used} min, disponível: ${voice.available} min, \n validade: ${body.data.dateGrace}`;

    await this.sendSms.send({
      message,
      msisdn: body.msisdn,
    });
  }
}
