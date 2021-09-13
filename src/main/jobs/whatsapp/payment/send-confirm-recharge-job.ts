import { SendConfirmRecharge } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendConfirmRechargeJob implements Job {
  constructor(private readonly confirmRecharge: SendConfirmRecharge) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.confirmRecharge.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
