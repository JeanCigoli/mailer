import { HttpSendListValuesRecharge } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendListValuesRechargeController } from '../../../../../presentation/controllers/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';

export const makeSendListValuesRecharge = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpSendListValuesRecharge = new HttpSendListValuesRecharge(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
  );

  return new SendListValuesRechargeController(httpSendListValuesRecharge);
};