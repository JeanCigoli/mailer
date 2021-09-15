import { HttpValidatePlanValuesOptionSms } from '../../../../../data/usecases/sms/plan-values/http-validate-plan-values-option-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { ValidatePlanValuesOptionJobSms } from '../../../../jobs/sms/plan-values/validate-plan-values-option-job-sms';

export const makeValidatePlanValuesOptionJobSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);

  const sendSmsService = new SendSmsService(httpClient);

  const httpValidatePlanValuesOption = new HttpValidatePlanValuesOptionSms(
    sendSmsService,
  );

  return new ValidatePlanValuesOptionJobSms(httpValidatePlanValuesOption);
};
