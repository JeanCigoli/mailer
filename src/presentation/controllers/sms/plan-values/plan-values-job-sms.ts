import { PlanValuesSms } from '../../../../domain/usecases/sms/plan-values/plan-values-sms';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class PlanValuesJobSms implements Job {
  constructor(private readonly planValuesSms: PlanValuesSms) {}
  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      await this.planValuesSms.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
