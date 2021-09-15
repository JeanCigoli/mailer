import { ValidatePlanValuesOptionSms } from '../../../../domain/usecases/sms/plan-values/validate-plan-values-option-sms';
import errorLogger from '../../../../utils/logger';
import { Job } from '../../../protocols/listener-job';

export class ValidatePlanValuesOptionJobSms implements Job {
  constructor(
    private readonly validatePlanValuesOptionSms: ValidatePlanValuesOptionSms,
  ) {}

  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      this.validatePlanValuesOptionSms.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
