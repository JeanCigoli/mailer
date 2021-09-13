import { HttpPlanValuesSms } from '../../../../../data/usecases/sms/plan-values/http-plan-values-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { PlanValuesControllerSms } from '../../../../../presentation/controllers/sms/plan-values/plan-values-controller-sms';

export const makePlanValuesControllerSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);

  const sendSmsService = new SendSmsService(httpClient);

  const httpPlanValuesSms = new HttpPlanValuesSms(sendSmsService);

  return new PlanValuesControllerSms(httpPlanValuesSms);
};
