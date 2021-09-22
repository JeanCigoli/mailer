import { ConfirmAddCardXml } from '../../../../../domain/usecases/ura';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbConfirmAddCardXml implements ConfirmAddCardXml {
  format(params: any): ConfirmAddCardXml.Result {
    const cardLength = params.data.newCard.cardNumber.length;

    const lastDigits = params.data.newCard.cardNumber.substr(
      cardLength - 4,
      cardLength - 1,
    );

    const [first, second] = params.messages;
    const split = formatNumberToUra(lastDigits);

    if (second) {
      const [begin, digit, end] = JSON.parse(second);

      return makeResponseXml({
        status: 'P00',
        messages: [first, begin, ...split.data.split(';'), digit, end],
      });
    }

    const [begin, digit, end] = JSON.parse(first);

    return makeResponseXml({
      status: 'P00',
      messages: [begin, ...split.data.split(';'), digit, end],
    });
  }
}
