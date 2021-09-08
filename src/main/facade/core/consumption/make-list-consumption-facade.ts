import { HttpListConsumption } from '../../../../data/usecases/core/consumption/http-list-consumption';
import { ListConsumption } from '../../../../domain/usecases/core/consumption/list-consumption';
import { phoenixConsumptionClient } from '../../../../infra/core/http/helpers/phoenix-client';
import { GetUserConsumptionService } from '../../../../infra/core/http/phoenix/consumption/get-user-consumption-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

const makeListConsumption: ListConsumption.Facade = (
  clientToken: string,
): ListConsumption.Result => {
  const httpClient = new RequestAdapter(phoenixConsumptionClient);

  const listConsumptionService = new GetUserConsumptionService(httpClient);

  return new HttpListConsumption(listConsumptionService).handle(clientToken);
};
