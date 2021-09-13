import { HttpSendBilletRecharge } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendBilletRechargeJob } from '../../../../jobs/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';

export const makeSendBilletRecharge = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpSendBilletRecharge = new HttpSendBilletRecharge(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
  );

  return new SendBilletRechargeJob(httpSendBilletRecharge);
};
