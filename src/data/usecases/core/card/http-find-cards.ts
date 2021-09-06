import { FindCards } from '../../../../domain/usecases/core/card/find-cards';
import { GetUserCards } from '../../../protocols/core/http/get-user-cards';

export class HttpFindCards implements FindCards {
  constructor(private readonly getUserCards: GetUserCards) {}

  async handle(clientToken: string): FindCards.Result {
    const result = await this.getUserCards.get(clientToken);

    if (!result.status || !result.payload) {
      throw new Error('ERROR_GET_CARDS');
    }

    return { cards: result.payload };
  }
}
