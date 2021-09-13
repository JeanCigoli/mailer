import { HttpAccountNotFound } from '../../../../../data/usecases/whatsapp';
import { SourceMvnoRepository } from '../../../../../infra/core/db/mssql';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { AccountNotFoundJob } from '../../../../jobs/whatsapp';
import { transformCredentials } from '../../../../../utils/base64';

export const makeAccountNotFound = () => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const sourceMvnoRepository = new SourceMvnoRepository();

  const httpAccountNotFound = new HttpAccountNotFound(
    sendMessageHttp,
    sourceMvnoRepository,
    transformCredentials,
  );

  return new AccountNotFoundJob(httpAccountNotFound);
};
