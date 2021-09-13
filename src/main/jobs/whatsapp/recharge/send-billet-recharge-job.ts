import { SendBilletRecharge } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendBilletRechargeJob implements Job {
  constructor(private readonly sendBilletRecharge: SendBilletRecharge) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendBilletRecharge.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
