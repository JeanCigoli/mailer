import { TokenXml } from '../../../../../domain/usecases/ura/response/token-xml';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbTokenXml implements TokenXml {
  handle(body: any): string {
    const token = formatNumberToUra(body.data.authCode);

    const [first, second] = body.messages;

    const message = `${token.length + body.messages.length}-${first};${
      token.data
    };${second}`;

    return makeResponseXml({
      status: 'P01',
      messages: message,
    });
  }
}
