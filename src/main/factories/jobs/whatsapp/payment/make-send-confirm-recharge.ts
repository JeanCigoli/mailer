import { HttpSendConfirmRecharge } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendConfirmRechargeJob } from '../../../../jobs/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';
import { verifyMessages } from '../../../../../utils/verify-message-whatsapp';

export const makeSendConfirmRecharge = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpListCardsDeletesDefault = new HttpSendConfirmRecharge(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
    verifyMessages,
  );

  return new SendConfirmRechargeJob(httpListCardsDeletesDefault);
};
