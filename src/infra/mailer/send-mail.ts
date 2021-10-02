import {
  CreateLogSendMailRepository,
  UpdateLogSendMailRepository,
} from '../../data/protocols/db/mongo';
import { SendMailMailer } from '../../data/protocols/mailer';
import { MailerServer } from './helpers';

export class SendMail implements SendMailMailer {
  constructor(
    private readonly mailServer: MailerServer,
    private readonly createLogSendMailRepository: CreateLogSendMailRepository,
    private readonly updateLogSendMailRepository: UpdateLogSendMailRepository,
  ) {}

  async send(params: SendMailMailer.Params): SendMailMailer.Result {
    const id = new Date().getTime();
    try {
      await this.createLogSendMailRepository.create({
        id,
        ...params,
      });

      const transport = this.mailServer.getByAlias(params.alias);

      const result = await transport.sendMail(params);

      await this.updateLogSendMailRepository.update(
        {
          response: result,
        },
        id,
      );

      return result;
    } catch (error) {
      await this.updateLogSendMailRepository.update(
        {
          response: error,
        },
        id,
      );
      return false;
    }
  }
}
