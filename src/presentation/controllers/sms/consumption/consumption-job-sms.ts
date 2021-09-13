import { ConsumptionSms } from '../../../../domain/usecases/sms/consumption/consumption-sms';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class ConsumptionJobSms implements Job {
  constructor(private readonly consumptionSms: ConsumptionSms) {}
  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      await this.consumptionSms.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
