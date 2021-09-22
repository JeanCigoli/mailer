import { ConfirmRechargeXml } from '../../../../domain/usecases/ura';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConfirmRechargeControllerUra implements Controller {
  constructor(private readonly confirmRechargeXml: ConfirmRechargeXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.confirmRechargeXml.format(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml({
          status: 'P01',
          messages: 'error.wav',
        }),
        headers: contentTypeXml,
      };
    }
  }
}
