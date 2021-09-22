import { ConsumptionXml } from '../../../../domain/usecases/ura/response/consumption/consumption-xml';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConsumptionControllerUra implements Controller {
  constructor(private readonly consumptionXml: ConsumptionXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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
          status: 'P03',
          messages: 'error.wav',
        }),
        headers: contentTypeXml,
      };
    }
  }
}
