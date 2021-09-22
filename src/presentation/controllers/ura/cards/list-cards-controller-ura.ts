import { ListCardsXml } from '../../../../domain/usecases/ura/response/cards/list-card-xml';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import errorLogger from '../../../../utils/logger';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListCardsControllerUra implements Controller {
  constructor(private readonly listCardXml: ListCardsXml) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.listCardXml.format(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      errorLogger(e);
      return {
        statusCode: 400,
        body: makeResponseXml({
          status: 'P01',
          messages: 'error.wav',
        }),
        headers: contentTypeXml,
      };
    }
  }
}
