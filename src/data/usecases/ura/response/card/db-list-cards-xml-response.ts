import { ListCardsXml } from '../../../../../domain/usecases/ura/response/list-card-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { Card } from '../../../../../domain/models';

export class DbListCardsXmlResponse implements ListCardsXml {
  format(body: any): string {
    const cards: Array<Card> = body.data.cards;

    const reducedCards = `${cards.length}-${cards
      .map((card) => `${card.audio}*${card.binCode}*${card.lastDigits}`)
      .join(';')}`;

    return makeResponseXml({
      status: body.status ? 'P00' : 'P01',
      messages: body.messages,
      cards: reducedCards,
    });
  }
}
