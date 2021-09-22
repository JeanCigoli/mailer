import { MenuXml } from '../../../../domain/usecases/ura';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class MenuControllerUra implements Controller {
  constructor(private readonly menuXml: MenuXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.menuXml.format(httpRequest.body);

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
