import { PlanValuesXmlResponse } from '../../../../../domain/usecases/ura/response/plan-values-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { Plan } from '../../../../../utils/types/plan-values/plan-values-type';

export class DbPlanValuesXmlResponse implements PlanValuesXmlResponse {
  format(body: any): string {
    const plans: Array<Plan> = body.data;
    const type = body.type;

    const reducedPlans = `${plans?.length}-${plans
      ?.filter((value) =>
        value.type === type ? `${value.audio}*${value.value}` : '',
      )
      .join(`;`)}`;

    return makeResponseXml({
      status: body.status ? 'P00' : 'P01',
      messages: body.messages,
      values: reducedPlans,
    });
  }
}
