import { TransferXml } from '../../../../../domain/usecases/ura';
import { removedSymbols } from '../../../../../utils';
import { replaceKeyToValue } from '../../../../../utils/replace-key-to-value';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbTransferXml implements TransferXml {
  format(params: any): TransferXml.Result {
    const [first] = params.messages;

    return makeResponseXml({
      status: 'P02',
      messages: [first],
    });
  }
}
