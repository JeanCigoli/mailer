import { HttpListCardsSms } from '../../../../../data/usecases/sms/list-cards/http-list-cards-sms';
import { phoenixSms } from '../../../../../infra/core/http/helpers/phoenix-sms';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { ListCardsControllerSms } from '../../../../../presentation/controllers/sms/list-cards/list-cards-controller-sms';

export const makeListCardsControllerSms = () => {
  const httpClient = new RequestAdapter(phoenixSms);

  const sendSmsService = new SendSmsService(httpClient);

  const httpListCardsSms = new HttpListCardsSms(sendSmsService);

  return new ListCardsControllerSms(httpListCardsSms);
};
