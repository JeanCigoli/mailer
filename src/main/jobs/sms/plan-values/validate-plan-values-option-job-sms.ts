import { ValidatePlanValuesOption } from '../../../../domain/usecases/sms/plan-values/validate-plan-values-option';
import errorLogger from '../../../../utils/logger';
import { Job } from '../../../protocols/listener-job';

export class ValidatePlanValuesOptionJobSms implements Job {
  constructor(
    private readonly validatePlanValuesOption: ValidatePlanValuesOption,
  ) {}

  async handle(message: Record<string, any>, next?: Function): Promise<void> {
    try {
      this.validatePlanValuesOption.handle(message.body);
    } catch (e) {
      errorLogger(e);
    }
  }
}
