import { Plan } from '../../types/plan-values/plan-values-type';
import { makeResponseXml } from '../response-xml';

export const makePlanValuesXmlResponse = (
  status: string,
  plans: Array<Plan> | null,
) => {
  const reducedPlans = `${plans?.length}-${plans
    ?.map((value) => `${value.audio}*${value.value}`)
    .join(`;`)}`;

  return makeResponseXml({
    status,
    values: reducedPlans,
  });
};
