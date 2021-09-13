import { Job } from '../../../main/protocols/listener-job';
import errorLogger from '../../../utils/logger';

export class SmsBodyJob implements Job {
  async handle(message: Record<string, any>, next: Function): Promise<void> {
    console.log({ message });

    try {
      const json = message.body;

      const body = {
        msisdn: json.ani,
        message: json.text,
        sourceId: json.sourceId,
      };

      message.body = body;

      return next();
    } catch (e) {
      errorLogger(e);
    }
  }
}
