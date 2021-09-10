import { DeleteCard } from '../../../../domain/usecases/core/card/delete-card';
import { DeleteUserCard } from '../../../protocols/core/http/delete-user-card';

export class HttpDeleteCard implements DeleteCard {
  constructor(private readonly deleteUserCard: DeleteUserCard) {}

  async handle(params: DeleteCard.Params): DeleteCard.Result {
    const result = await this.deleteUserCard.delete(params);

    if (!result.status) {
      return result;
    }

    return result;
  }
}
