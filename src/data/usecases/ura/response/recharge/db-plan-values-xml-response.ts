import { PlanValuesXmlResponse } from '../../../../../domain/usecases/ura/response/recharge/plan-values-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';
import { Plan } from '../../../../../domain/models';

export class DbPlanValuesXmlResponse implements PlanValuesXmlResponse {
  format(body: any): string {
    const plans: Array<Plan> = body.data.values;

    const [single, second] = body.messages;

    const length = body.messages.length + plans.length * 3;

    if (second) {
      const messages = `${length}-${single};${plans
        ?.map(
          (value, index) =>
            `digite${index + 1}.wav;pararecarregar.wav;${value.audio}`,
        )
        .join(`;`)};${second}`;

      return makeResponseXml({
        status: 'P00',
        messages: messages,
      });
    }

    const messages = `${length}-${plans
      ?.map(
        (value, index) =>
          `digite${index + 1}.wav;pararecarregar.wav;${value.audio}`,
      )
      .join(`;`)};${single}`;

    return makeResponseXml({
      status: 'P00',
      messages: messages,
    });
  }
}
