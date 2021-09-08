import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class SuccessControllerUra implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return {
        statusCode: 200,
        body: makeResponseXml({
          status: 'P00',
          messages: httpRequest.body.messages,
        }),
        headers: contentTypeXml,
      };
    } catch (e) {
      errorLogger(e);
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
