import { HttpListConsumption } from '../../data/usecases/core';
import { phoenixAccount } from '../../infra/core/http/helpers/phoenix-account';
import { GetUserConsumptionService } from '../../infra/core/http/phoenix/consumption/get-user-consumption-service';
import { RequestAdapter } from '../../infra/core/http/web-service-rest-adapter';

export const listConsumptionFacade = (params: string) => {
  const requestAdapter = new RequestAdapter(phoenixAccount);

  const getUserConsumptionHttp = new GetUserConsumptionService(requestAdapter);

  const httpListConsumption = new HttpListConsumption(getUserConsumptionHttp);

  return httpListConsumption.handle(params);
};
