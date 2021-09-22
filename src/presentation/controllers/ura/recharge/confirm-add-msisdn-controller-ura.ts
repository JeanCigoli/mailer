import { ConfirmAddMsisdn } from '../../../../domain/usecases/ura';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConfirmAddMsisdnControllerUra implements Controller {
  constructor(private readonly confirmAddMsisdn: ConfirmAddMsisdn) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.confirmAddMsisdn.format(httpRequest.body);

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
          messages: httpRequest.body.messages,
        }),
        headers: contentTypeXml,
      };
    }
  }
}
