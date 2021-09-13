import { HttpTokenSms } from '../../../../../data/usecases/sms/token/http-token-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { TokenJobSms } from '../../../../../presentation/controllers/sms/token/token-job-sms';

export const makeTokenJobSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);

  const sendSmsService = new SendSmsService(httpClient);

  const httpTokenSms = new HttpTokenSms(sendSmsService);

  return new TokenJobSms(httpTokenSms);
};
