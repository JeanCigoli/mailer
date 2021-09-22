import { ConfirmAddCardXml } from '../../../../domain/usecases/ura';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConfirmAddCardControllerUra implements Controller {
  constructor(private readonly ConfirmAddCardXml: ConfirmAddCardXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.ConfirmAddCardXml.format(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      errorLogger(e);
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
