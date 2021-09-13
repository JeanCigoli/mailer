import { PlanValuesSms } from '../../../../domain/usecases/sms/plan-values/plan-values-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class PlanValuesControllerSms implements Controller {
  constructor(private readonly planValuesSms: PlanValuesSms) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.planValuesSms.handle(httpRequest.body);
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
