import { HttpListConsumption } from '../../../../data/usecases/core/consumption/http-list-consumption';
import { ListConsumption } from '../../../../domain/usecases/core/consumption/list-consumption';
import { phoenixAccount } from '../../../../infra/core/http/helpers/phoenix-account';
import { GetUserConsumptionService } from '../../../../infra/core/http/phoenix/consumption/get-user-consumption-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeListConsumption: ListConsumption.Facade = (
  params: ListConsumption.Params,
): ListConsumption.Result => {
  const httpClient = new RequestAdapter(phoenixAccount);

  const listConsumptionService = new GetUserConsumptionService(httpClient);

  return new HttpListConsumption(listConsumptionService).handle(params);
};
