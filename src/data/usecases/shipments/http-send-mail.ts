import { SendMail } from '../../../domain/usecases';
import { SendMailMailer } from '../../protocols/mailer';

export class HttpSendMail implements SendMail {
  constructor(private readonly sendMailMailer: SendMailMailer) {}

  async send(params: SendMail.Params): SendMail.Result {
    await this.sendMailMailer.send(params);
  }
}
