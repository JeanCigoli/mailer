import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class IndexController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = {
      messages: httpRequest.body.messages,
    };

    // console.log('CHEGOU AQUI HEHEHE');

    try {
      return {
        statusCode: 200,
        body: makeResponseXml(body),
        headers: contentTypeXml,
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml(body),
        headers: contentTypeXml,
      };
    }
  }
}
