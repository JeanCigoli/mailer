import { SendTypeRecharge } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';
export class SendTypeRechargeJob implements Job {
  constructor(private readonly sendTypeRecharge: SendTypeRecharge) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendTypeRecharge.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
