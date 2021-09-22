import { DefaultStepXml } from '../../../../../domain/usecases/ura';
import { removedSymbols } from '../../../../../utils';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbDefaultStepXml implements DefaultStepXml {
  format(params: any): DefaultStepXml.Result {
    const [first, second] = params.messages;

    if (params.status) {
      return makeResponseXml({
        status: 'P00',
        messages: params.messages,
      });
    }

    if (!params.data) {
      return makeResponseXml({
        status: 'P01',
        messages: params.messages,
      });
    }

    if (second) {
      const [begin, end] = JSON.parse(second);

      const message = replaceKeyToValue(begin, {
        mvno: removedSymbols(params.data.mvno),
      });

      return makeResponseXml({
        status: 'P01',
        messages: [first, message, end],
      });
    }

    const [begin, end] = JSON.parse(first);

    const message = replaceKeyToValue(begin, {
      mvno: removedSymbols(params.data.mvno),
    });

    return makeResponseXml({
      status: 'P01',
      messages: [message, end],
    });
  }
}
