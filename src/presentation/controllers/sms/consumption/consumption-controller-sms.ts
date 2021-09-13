import { ConsumptionSms } from '../../../../domain/usecases/sms/consumption/consumption-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ConsumptionControllerSms implements Controller {
  constructor(private readonly consumptionSms: ConsumptionSms) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.consumptionSms.handle(httpRequest.body);
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
