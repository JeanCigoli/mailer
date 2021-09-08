import { HttpListPlanValues } from '../../../../data/usecases/core/plan-values/http-list-plan-values';
import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { phoenixAccount } from '../../../../infra/core/http/helpers/phoenix-account';
import { GetPlanValuesService } from '../../../../infra/core/http/phoenix/values/get-plan-values-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeListPlanValuesFacade: ListPlanValues.Facade = (
  params: ListPlanValues.Params,
): ListPlanValues.Result => {
  const httpClient = new RequestAdapter(phoenixAccount);

  const listPlansValuesService = new GetPlanValuesService(httpClient);

  return new HttpListPlanValues(listPlansValuesService).handle(params);
};