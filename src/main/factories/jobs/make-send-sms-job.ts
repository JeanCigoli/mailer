// import { HttpSendSmsCallback } from '../../../data/usecases/core/sms/http-send-sms-callback';
// import { SendSmsService } from '../../../infra/core/http/phoenix/sms/send-sms-service';
// import { RequestAdapter } from '../../../infra/core/http/web-service-rest-adapter';
// import { phoenixSms } from '../../../infra/core/http/helpers/phoenix-sms';
// import { SendSmsJob } from '../../jobs/send-sms-job';

// export const makeSendSmsJob = () => {
//   const httpClient = new RequestAdapter(phoenixSms);
//   const sendSmsService = new SendSmsService(httpClient);

//   const httpSendSmsCallback = new HttpSendSmsCallback(sendSmsService);

//   return new SendSmsJob(httpSendSmsCallback);
// };

import { RaqFormatConsumeWhatsApp } from '../../../data/usecases/whatsapp';
import { FormatConsumeWhatsAppJob } from '../../jobs/whatsapp';

export const sendWhatsAppMiddleware = () => {
  const raqFormatConsumeWhatsApp = new RaqFormatConsumeWhatsApp();

  return new FormatConsumeWhatsAppJob(raqFormatConsumeWhatsApp);
};
