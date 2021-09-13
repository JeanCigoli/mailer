import { HttpConsumptionSms } from '../../../../../data/usecases/sms/consumption/http-consumption-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { ConsumptionControllerSms } from '../../../../../presentation/controllers/sms/consumption/consumption-controller-sms';

export const makeConsumptionControllerSms = () => {
  // console.log({ phoenixSms });

  const httpClient = new RequestAdapter(phoenixSms);
  const sendSmsService = new SendSmsService(httpClient);
  const httpConsumptionSms = new HttpConsumptionSms(sendSmsService);

  return new ConsumptionControllerSms(httpConsumptionSms);
};
