import { HttpSendSmsCallback } from '../../../data/usecases/core/sms/http-send-sms-callback';
import { phoenixClient } from '../../../infra/core/http/helpers/phoenix-client';
import { SendSmsService } from '../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../infra/core/http/web-service-rest-adapter';
import { SendSmsJob } from '../../jobs/send-sms-job';

export const makeSendSmsJob = () => {
  const httpClient = new RequestAdapter(phoenixClient);
  const sendSmsService = new SendSmsService(httpClient);

  const httpSendSmsCallback = new HttpSendSmsCallback(sendSmsService);

  return new SendSmsJob(httpSendSmsCallback);
};
