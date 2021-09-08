import { AddCard } from '../../../../domain/usecases/core/card/add-card';
import { AddUserCard } from '../../../protocols/core/http/add-user-card';

export class HttpAddCard implements AddCard {
  constructor(private readonly addUserCard: AddUserCard) {}

  async handle(params: AddCard.Params): AddCard.Result {
    const result = await this.addUserCard.add(params);

    if (!result.status || !result.payload) {
      throw new Error('ERROR_ADD_CARD');
    }

    return { payload: result.payload };
  }
}