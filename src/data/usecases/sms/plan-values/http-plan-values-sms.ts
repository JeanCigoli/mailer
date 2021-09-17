import { Plan } from '../../../../domain/models';
import { PlanValuesSms } from '../../../../domain/usecases/sms/plan-values/plan-values-sms';
import { removedAccent } from '../../../../utils';
import { SendSms } from '../../../protocols/core/http/send-sms';

export class HttpPlanValuesSms implements PlanValuesSms {
  constructor(private readonly sendSms: SendSms) {}

  async handle(body: any): PlanValuesSms.Result {
    const plans: Array<Plan> = body.data.values;

    const messages = plans.map(async (plan, index) => {
      const text = `${index + 1} - ${plan.name}: R$${plan.value}  `;
      return text;
    });

    const reduceMessage = messages.reduce(async (accumulator, current) => {
      const accumulatorValue = await accumulator;
      const currentValue = await current;

      const text = accumulatorValue + currentValue;

      if (text.length >= 160) {
        await this.sendSms.send({
          message: accumulatorValue,
          msisdn: body.data.msisdn,
          clientToken: body.data.token,
        });

        accumulator = current;

        return accumulator;
      }

      accumulator = Promise.resolve(text);

      return accumulator;
    });

    const finalMessage = await reduceMessage;

    await this.sendSms.send({
      message: removedAccent(finalMessage),
      msisdn: body.data.msisdn,
      clientToken: body.data.token,
    });
  }
}
