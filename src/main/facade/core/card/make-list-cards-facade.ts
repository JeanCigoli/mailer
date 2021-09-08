import { HttpListCards } from '../../../../data/usecases/core/card/http-find-cards';
import { ListCards } from '../../../../domain/usecases/core/card/list-cards';
import { phoenixManagerCardClient } from '../../../../infra/core/http/helpers/phoenix-client';
import { GetCardsService } from '../../../../infra/core/http/phoenix/card/get-cards-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeListCardsFacade: ListCards.Facade = (clientToken: string) => {
  const httpClient = new RequestAdapter(phoenixManagerCardClient);
  const listCardsService = new GetCardsService(httpClient);

  return new HttpListCards(listCardsService).handle(clientToken);
};
