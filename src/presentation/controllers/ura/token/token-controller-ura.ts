import { TokenXml } from '../../../../domain/usecases/ura/response/token-xml';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class TokenControllerUra implements Controller {
  constructor(private readonly tokenXml: TokenXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.tokenXml.handle(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml({ status: 'P01', values: 'erro.wap' }),
        headers: contentTypeXml,
      };
    }
  }
}
