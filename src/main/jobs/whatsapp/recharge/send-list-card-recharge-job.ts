import { SendListCardRecharge } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendListCardRechargeJob implements Job {
  constructor(private readonly sendListCardRecharge: SendListCardRecharge) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendListCardRecharge.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
