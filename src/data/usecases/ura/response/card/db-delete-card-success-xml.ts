import { Card } from '../../../../../domain/models';
import { DeleteCardSuccessXml } from '../../../../../domain/usecases/ura';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbDeleteCardSuccessXml implements DeleteCardSuccessXml {
  format(params: any): DeleteCardSuccessXml.Result {
    const [first, second] = params.messages;

    const [card]: Card[] = params.data.cards.filter(
      (value: Card) => value.paymentId === params.data.cardId,
    );

    const split = formatNumberToUra(card?.lastDigits || '');

    if (second) {
      const [begin, end] = JSON.parse(second);

      return makeResponseXml({
        status: 'P00',
        messages: [
          first,
          begin,
          card.audio,
          'final.wav',
          ...split.data.split(';'),
          end,
        ],
      });
    }

    const [begin, end] = JSON.parse(first);

    return makeResponseXml({
      status: 'P00',
      messages: [begin, card.audio, 'final.wav', ...split.data.split(';'), end],
    });
  }
}
