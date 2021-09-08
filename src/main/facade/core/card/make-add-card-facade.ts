import { HttpAddCard } from '../../../../data/usecases/core/card/http-add-card';
import { AddCard } from '../../../../domain/usecases/core/card/add-card';
import { phoenixAccount } from '../../../../infra/core/http/helpers/phoenix-account';
import { AddCardService } from '../../../../infra/core/http/phoenix/card/add-card-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeAddCardFacade: AddCard.Facade = (
  params: AddCard.Params,
): AddCard.Result => {
  const httpClient = new RequestAdapter(phoenixAccount);

  const addCardService = new AddCardService(httpClient);

  return new HttpAddCard(addCardService).handle(params);
};
