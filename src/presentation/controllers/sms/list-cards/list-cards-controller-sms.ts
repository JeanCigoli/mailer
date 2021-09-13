import { ListCardsSms } from '../../../../domain/usecases/sms/list-cards/list-cards-sms';
import errorLogger from '../../../../utils/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListCardsControllerSms implements Controller {
  constructor(private readonly listCardsSms: ListCardsSms) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.listCardsSms.handle(httpRequest.body);

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
