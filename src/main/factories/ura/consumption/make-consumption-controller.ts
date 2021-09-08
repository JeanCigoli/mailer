import { DbConsumptionXmlResponse } from '../../../../data/usecases/ura/response/consumption/db-consumption-xml-response';
import { phoenixSmsClient } from '../../../../infra/core/http/helpers/phoenix-client';
import { SendSmsService } from '../../../../infra/core/http/phoenix/sms/send-sms-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';
import { ConsumptionController } from '../../../../presentation/controllers/ura/consumption/consumption-controller';

export const makeConsumptionController = () => {
  const httpClient = new RequestAdapter(phoenixSmsClient);

  const sendSms = new SendSmsService(httpClient);

  const dbConsumptionXml = new DbConsumptionXmlResponse(sendSms);

  return new ConsumptionController(dbConsumptionXml);
};
