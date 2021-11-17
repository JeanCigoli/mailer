import { SendMail } from '../../../domain/usecases';
import { ListDefaultParamsRepository } from '../../protocols/db/mssql';
import { SendMailMailer } from '../../protocols/mailer';

export class HttpSendMail implements SendMail {
  constructor(
    private readonly sendMailMailer: SendMailMailer,
    private readonly listDefaultParamsRepository: ListDefaultParamsRepository,
  ) {}

  async send(params: SendMail.Params): SendMail.Result {
    const { mvnoId, context, ...props } = params;

    const mvno = await this.listDefaultParamsRepository.findDefaultParams({
      mvnoId: params.mvnoId,
    });

    await this.sendMailMailer.send({
      ...props,
      context: {
        ...context,
        ...mvno,
      },
    });
  }
}
