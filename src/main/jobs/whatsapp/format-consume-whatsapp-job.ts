import { FormatConsumeWhatsApp } from '../../../domain/usecases/whatsapp';
import errorLogger from '../../../utils/logger';
import { Job } from '../../protocols/listener-job';

export class FormatConsumeWhatsAppJob implements Job {
  constructor(private readonly formatConsumeWhatsApp: FormatConsumeWhatsApp) {}

  async handle(message: Record<string, any>, next: Function): Promise<void> {
    try {
      const result = this.formatConsumeWhatsApp.format(message.body);

      message.body = result;

      next();
    } catch (error) {
      errorLogger(error);
    }
  }
}
