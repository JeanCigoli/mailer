import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { GetUserCards } from '../../../protocols/core/http/get-user-cards';

export class HttpListCards implements ListCards {
  constructor(private readonly getUserCards: GetUserCards) {}

  async handle(clientToken: string): ListCards.Result {
    const result = await this.getUserCards.get(clientToken);

    if (!result.status || !result.payload) {
      throw new Error('ERROR_GET_CARDS');
    }

    return { cards: result.payload };
  }
}
