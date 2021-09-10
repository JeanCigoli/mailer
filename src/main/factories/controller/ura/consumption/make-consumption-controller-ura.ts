import { DbConsumptionXmlResponse } from '../../../../../data/usecases/ura/response/consumption/db-consumption-xml-response';
import { phoenixAccount } from '../../../../../infra/core/http/helpers/phoenix-account';
import { SendSmsService } from '../../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { ConsumptionControllerUra } from '../../../../../presentation/controllers/ura/consumption/consumption-controller-ura';

export const makeConsumptionControllerUra = () => {
  const httpClient = new RequestAdapter(phoenixAccount);

  const sendSms = new SendSmsService(httpClient);

  const dbConsumptionXml = new DbConsumptionXmlResponse(sendSms);

  return new ConsumptionControllerUra(dbConsumptionXml);
};
