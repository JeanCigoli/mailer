import { HttpSendListCardRecharge } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendListCardRechargeController } from '../../../../../presentation/controllers/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';

export const makeSendListCardRecharge = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpSendListCardRecharge = new HttpSendListCardRecharge(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
  );

  return new SendListCardRechargeController(httpSendListCardRecharge);
};
