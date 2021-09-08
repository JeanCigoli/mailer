import { HttpListPlanValues } from '../../../../data/usecases/core/plan-values/http-list-plan-values';
import { phoenixClient } from '../../../../infra/core/http/helpers/phoenix-client';
import { GetPlanValuesService } from '../../../../infra/core/http/phoenix/values/get-plan-values-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';
import { PlanValuesControllerUra } from '../../../../presentation/controllers/ura/plan-values/plan-values-controller-ura';

export const makeRechargePlanValuesControllerUra = () => {
  const httpClient = new RequestAdapter(phoenixClient);

  const getPlansService = new GetPlanValuesService(httpClient);

  const httpRechargeValues = new HttpListPlanValues(getPlansService);

  return new PlanValuesControllerUra(httpRechargeValues);
};
