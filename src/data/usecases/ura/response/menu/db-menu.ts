import { MenuXml } from '../../../../../domain/usecases/ura';
import { removedSymbols } from '../../../../../utils';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbMenuXml implements MenuXml {
  format(params: any): string {
    const [first, second] = params.messages;
    const mvno = params.data.mvno;

    if (second) {
      return makeResponseXml({
        status: 'P00',
        messages: [first, `${removedSymbols(mvno)}.wav`, second],
      });
    }

    return makeResponseXml({
      status: 'P00',
      messages: [first],
    });
  }
}
