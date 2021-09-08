import { TokenXml } from '../../../../domain/usecases/ura/response/token-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class TokenControllerUra implements Controller {
  constructor(private readonly tokenXml: TokenXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return { statusCode: 200 };
    } catch (e) {
      return { statusCode: 400 };
    }
  }
}
