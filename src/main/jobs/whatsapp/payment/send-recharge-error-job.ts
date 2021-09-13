import { SendRechargeError } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendRechargeErrorJob implements Job {
  constructor(private readonly rechargeError: SendRechargeError) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.rechargeError.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
