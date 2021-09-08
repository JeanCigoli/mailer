import { TokenXml } from '../../../../../domain/usecases/ura/response/token-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbTokenXml implements TokenXml {
  handle(body: any): string {
    return makeResponseXml({
      status: body.status ? 'P00' : 'P01',
      messages: body.messages,
      token: body.data.authCode,
    });
  }
}
