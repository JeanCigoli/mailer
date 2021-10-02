import { SendShipments } from '../../domain/usecases';
import { ok, serverError } from '../../utils/response/response';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class SendShipmentsController implements Controller {
  constructor(private readonly sendShipments: SendShipments) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.sendShipments.send({
        mail: httpRequest.body,
        mvnoId: httpRequest.authData.mvnoId,
        token: httpRequest.token.encryptedToken,
      });

      return ok(result.message, {});
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
