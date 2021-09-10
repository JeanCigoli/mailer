import { SuccessSms } from '../../../../domain/usecases/core/sms/success-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class SuccessControllerSms implements Controller {
  constructor(private readonly successSms: SuccessSms) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.successSms.handle(httpRequest.body);
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
