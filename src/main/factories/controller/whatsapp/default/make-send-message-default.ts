import { HttpSendMessagesDefault } from '../../../../../data/usecases/whatsapp';
import { wavyMessage } from '../../../../../infra/core/http/helpers/wavy-message';
import { SendMessageHttp } from '../../../../../infra/core/http/phoenix/whatsapp/send-message-http';
import { RequestAdapter } from '../../../../../infra/core/http/web-service-rest-adapter';
import { SendMessagesDefaultController } from '../../../../../presentation/controllers/whatsapp';

export const makeSendMessageDefault = (buttons: number[]) => {
  const requestAdapter = new RequestAdapter(wavyMessage);

  const sendMessageHttp = new SendMessageHttp(requestAdapter);

  const httpSendMessagesDefault = new HttpSendMessagesDefault(
    sendMessageHttp,
    buttons,
  );

  return new SendMessagesDefaultController(httpSendMessagesDefault);
};
