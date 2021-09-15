import { HttpConsumptionSms } from '../../../../../data/usecases/sms/consumption/http-consumption-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { ConsumptionJobSms } from '../../../../jobs/sms/consumption/consumption-job-sms';

export const makeConsumptionJobSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);
  const sendSmsService = new SendSmsService(httpClient);
  const httpConsumptionSms = new HttpConsumptionSms(sendSmsService);

  return new ConsumptionJobSms(httpConsumptionSms);
};
