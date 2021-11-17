import { HttpSendMail } from '../../../data/usecases';
import { HttpLogMailRepository } from '../../../infra/db/mongo/http-log-mail-repository';
import { ConfigRepository } from '../../../infra/db/mssql';
import { SendMail } from '../../../infra/mailer';
import { MailerServer } from '../../../infra/mailer/helpers';
import { SendMailJob } from '../../../presentation/jobs';

export const makeSendMail = () => {
  const httpLogMailRepository = new HttpLogMailRepository();
  const configRepository = new ConfigRepository();

  const mailer = MailerServer.getInstance();

  const sendMail = new SendMail(
    mailer,
    httpLogMailRepository,
    httpLogMailRepository,
  );

  const httpSendMail = new HttpSendMail(sendMail, configRepository);

  return new SendMailJob(httpSendMail);
};
