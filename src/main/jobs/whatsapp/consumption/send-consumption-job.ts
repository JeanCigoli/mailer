import { SendConsumption } from '../../../../domain/usecases/whatsapp';
import { Job } from '../../../../main/protocols/listener-job';
import errorLogger from '../../../../utils/logger';

export class SendConsumptionJob implements Job {
  constructor(private readonly sendConsumption: SendConsumption) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      await this.sendConsumption.send({
        ...message.body,
        ...message.step,
      });

      next();
    } catch (error: any) {
      errorLogger(error);
    }
  }
}
