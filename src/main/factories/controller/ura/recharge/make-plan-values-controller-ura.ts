import { DbPlanValuesXmlResponse } from '../../../../../data/usecases/ura/response/recharge/db-plan-values-xml-response';
import { PlanValuesControllerUra } from '../../../../../presentation/controllers/ura/recharge/plan-values-controller-ura';

export const makeRechargePlanValuesControllerUra = () => {
  const dbPlanValuesXmlResponse = new DbPlanValuesXmlResponse();
  return new PlanValuesControllerUra(dbPlanValuesXmlResponse);
};
