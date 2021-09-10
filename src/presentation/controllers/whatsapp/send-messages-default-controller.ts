import { SendMessagesDefault } from '../../../domain/usecases/whatsapp';
import { ok, serverError } from '../../../utils/response/response';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class SendMessagesDefaultController implements Controller {
  constructor(private readonly sendMessagesDefault: SendMessagesDefault) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.sendMessagesDefault.send({
        ...httpRequest.body,
        ...httpRequest.step,
      });

      return ok('Envio de mensagem realizada', {});
    } catch (error: any) {
      console.log(error);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
