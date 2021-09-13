import { HttpSuccessSms } from '../../../../../data/usecases/sms/default/http-success-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SuccessControllerSms } from '../../../../../presentation/controllers/sms/default/success-controller-sms';

export const makeSuccessControllerSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);

  const httpSendSms = new SendSmsService(httpClient);

  const httpSuccessSms = new HttpSuccessSms(httpSendSms);

  return new SuccessControllerSms(httpSuccessSms);
};
