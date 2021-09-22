import { TokenXml } from '../../../../../domain/usecases/ura/response/token/token-xml';
import { removedSymbols } from '../../../../../utils';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbTokenXml implements TokenXml {
  handle(body: any): string {
    const token = formatNumberToUra(body.data.authCode);

    const [first, second] = body.messages;

    const [begin, end] = JSON.parse(second);

    const mvno = replaceKeyToValue(begin, {
      mvno: removedSymbols(body.data.mvno),
    });

    return makeResponseXml({
      status: 'P01',
      messages: [first, ...token.data.split(';'), mvno, end],
    });
  }
}
