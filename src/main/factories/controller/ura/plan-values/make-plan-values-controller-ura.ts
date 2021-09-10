import { DbPlanValuesXmlResponse } from '../../../../../data/usecases/ura/response/plan-values/db-plan-values-xml-response';
import { PlanValuesControllerUra } from '../../../../../presentation/controllers/ura/plan-values/plan-values-controller-ura';

export const makeRechargePlanValuesControllerUra = () => {
  const dbPlanValuesXmlResponse = new DbPlanValuesXmlResponse();
  return new PlanValuesControllerUra(dbPlanValuesXmlResponse);
};
