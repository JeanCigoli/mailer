import { Plan } from '../../../../domain/models';
import { PlanValuesSms } from '../../../../domain/usecases/sms/plan-values/plan-values-sms';
import { removedAccent } from '../../../../utils';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpPlanValuesSms implements PlanValuesSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): PlanValuesSms.Result {
    const plans: Array<Plan> = body.data.plans;

    const messages = plans.map(async (plan, index) => {
      const text = `${index + 1} - ${plan.name}: R$${plan.value} \n `;
      return text;
    });

    const reduceMessage = messages.reduce(async (acumulator, current) => {
      const acumulatorValue = await acumulator;
      const currentValue = await current;

      const text = acumulatorValue + currentValue;

      if (text.length >= 160) {
        await this.sendSms.send({
          message: acumulatorValue,
          msisdn: body.data.msisdn,
          clientToken: body.data.token,
        });

        acumulator = current;

        return acumulator;
      }

      acumulator = Promise.resolve(text);

      return acumulator;
    });

    const finalMessage = await reduceMessage;

    await this.sendSms.send({
      message: removedAccent(finalMessage),
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
  }
}
