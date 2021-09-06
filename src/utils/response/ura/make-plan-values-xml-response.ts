import { Plan } from '../../types/plan-values/plan-values-type';
import { makeResponseXml } from '../response-xml';

export const makePlanValuesXmlResponse = (plans: Array<Plan>) => {
  const reducedPlans = plans.map((value, index) => {
    if (index === 0) return `${plans.length}-${value.audio}*${value.value}`;

    if (index === plans.length - 1) return `${value.audio}*${value.value}`;

    return `${value.audio}*${value.value};`;
  });

  const concatenedPlans = reducedPlans.reduce((acumulator, current) => {
    return (acumulator = acumulator + current);
  });

  return makeResponseXml({
    values: concatenedPlans,
  });
};
