import { HttpDeleteCard } from '../../../../data/usecases/core/card/http-delete-card';
import { DeleteCard } from '../../../../domain/usecases/core/card/delete-card';
import { phoenixManagerCardClient } from '../../../../infra/core/http/helpers/phoenix-client';
import { DeleteCardService } from '../../../../infra/core/http/phoenix/card/delete-card-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeDeleteCardFacade: DeleteCard.Facade = (
  params: DeleteCard.Params,
): DeleteCard.Result => {
  const httpClient = new RequestAdapter(phoenixManagerCardClient);

  const deleteCardService = new DeleteCardService(httpClient);

  return new HttpDeleteCard(deleteCardService).handle(params);
};
