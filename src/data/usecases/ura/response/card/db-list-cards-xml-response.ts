import { ListCardsXml } from '../../../../../domain/usecases/ura/response/cards/list-card-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { Card } from '../../../../../domain/models';
import { formatNumberToUra } from '../../../../../utils/formatter/format-numbers-ura';

export class DbListCardsXmlResponse implements ListCardsXml {
  format(body: any): string {
    const cards: Array<Card> = body.data.cards.slice(0, 9);

    const [single, second] = body.messages;

    if (second) {
      const messages = `${cards.length * 7 + 2}-${single};${cards
        .map((card, index) => {
          const digit = formatNumberToUra(card.lastDigits);

          return `cartao${index + 1}.wav;${card.audio};final.wav;${digit.data}`;
        })
        .join(';')};${second}`;

      return makeResponseXml({
        status: 'P00',
        messages: messages,
      });
    }

    const messages = `${cards.length * 7 + 1}-${cards
      .map((card, index) => {
        const digit = formatNumberToUra(card.lastDigits);

        return `cartao${index + 1}.wav;${card.audio};final.wav;${digit.data}`;
      })
      .join(';')};${single}`;

    return makeResponseXml({
      status: 'P00',
      messages: messages,
    });
  }
}
