import { SendListValuesRecharge } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';
export class SendListValuesRechargeJob implements Job {
  constructor(
    private readonly sendListValuesRecharge: SendListValuesRecharge,
  ) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendListValuesRecharge.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
