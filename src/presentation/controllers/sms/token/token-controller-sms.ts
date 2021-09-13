import { TokenSms } from '../../../../domain/usecases/sms/token/token-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class TokenControllerSms implements Controller {
  constructor(private readonly tokenSms: TokenSms) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.tokenSms.handle(httpRequest.body);

      return {
        statusCode: 200,
      };
    } catch (e) {
      errorLogger(e);
      return {
        statusCode: 400,
      };
    }
  }
}
