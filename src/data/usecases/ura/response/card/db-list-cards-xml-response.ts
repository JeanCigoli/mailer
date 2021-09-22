import { ListCardsXml } from '../../../../../domain/usecases/ura/response/list-card-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { Card } from '../../../../../domain/models';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';

export class DbListCardsXmlResponse implements ListCardsXml {
  format(body: any): string {
    const cards: Array<Card> = body.data.cards;

    const [single, second] = body.messages;

    if (second) {
      const [listCard, create] = JSON.parse(second);

      const messages = `${cards.length * 7 + 3}-${single};${listCard};${cards
        .map((card, index) => {
          const digit = formatNumberToUra(card.lastDigits);

          return `digite${index + 1}.wav;${card.audio};final.wav;${digit.data}`;
        })
        .join(';')};${create}`;

      return makeResponseXml({
        status: 'P00',
        messages: messages,
      });
    }

    const [listCard, create] = JSON.parse(single);

    const messages = `${cards.length * 7 + 2}-${listCard};${cards
      .map((card, index) => {
        const digit = formatNumberToUra(card.lastDigits);

        return `digite${index + 1}.wav;${card.audio};final.wav;${digit.data}`;
      })
      .join(';')};${create}`;

    return makeResponseXml({
      status: 'P00',
      messages: messages,
    });
  }
}
