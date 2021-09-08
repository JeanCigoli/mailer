import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListCardsControllerUra implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
    } catch (e) {
      return {
        statusCode: 400,
      };
    }
  }
}
