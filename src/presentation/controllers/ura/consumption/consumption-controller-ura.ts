import { ConsumptionXml } from '../../../../domain/usecases/ura/response/consumption-xml';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConsumptionControllerUra implements Controller {
  constructor(private readonly consumptionXml: ConsumptionXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const internet = httpRequest.body.consumption.data;
      const voice = httpRequest.body.consumption.voice;
      const sms = httpRequest.body.consumption.sms;
      const message = `Olá, segue consumo abaixo:\n Internet: usado: ${internet.used} GB, disponível: ${internet.available} GB \n SMS: usado: ${sms.used}, disponível: ${sms.available} \n ligação: usado: ${voice.used} min, disponível: ${voice.available} min,`;

      httpRequest.body.message = message;

      const result = await this.consumptionXml.handle(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      errorLogger(e);
      return {
        statusCode: 200,
        body: makeResponseXml({
          status: 'P01',
          messages: httpRequest.body.messages,
        }),
        headers: contentTypeXml,
      };
    }
  }
}
