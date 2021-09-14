import { HttpSendTypeRecharge } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendTypeRechargeJob } from '../../../../jobs/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';
import { verifyMessages } from '../../../../../utils/verify-message-whatsapp';

export const makeSendTypeRecharge = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpSendTypeRecharge = new HttpSendTypeRecharge(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
    verifyMessages,
  );

  return new SendTypeRechargeJob(httpSendTypeRecharge);
};
