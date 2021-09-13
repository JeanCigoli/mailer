import { SuccessSms } from '../../../../domain/usecases/sms/default/success-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class SuccessControllerSms implements Controller {
  constructor(private readonly successSms: SuccessSms) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // console.log('REQUEST BODY', httpRequest);
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
