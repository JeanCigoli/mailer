import { AccountNotFound } from '../../../../domain/usecases/whatsapp';
import { ok, serverError } from '../../../../utils/response/response';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class AccountNotFoundController implements Controller {
  constructor(private readonly AccountNotFound: AccountNotFound) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.AccountNotFound.notFound({
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
