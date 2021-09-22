import { ConfirmAddMsisdn } from '../../../../../domain/usecases/ura';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbConfirmAddMsisdn implements ConfirmAddMsisdn {
  format(params: any): ConfirmAddMsisdn.Result {
    const msisdn = params.data.msisdn.replace('55', '');

    const split = formatNumberToUra(msisdn);

    const [first, second] = params.messages;

    if (second) {
      const [begin, end] = JSON.parse(second);

      return makeResponseXml({
        status: 'P00',
        messages: [first, begin, ...split.data.split(';'), end],
      });
    }

    const [begin, end] = JSON.parse(first);

    return makeResponseXml({
      status: 'P00',
      messages: [begin, ...split.data.split(';'), end],
    });
  }
}
