import { ConfirmPayment } from '../../../domain/usecases/core';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class ConfirmPaymentMiddleware implements Middleware {
  constructor(private readonly confirmPayment: ConfirmPayment) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.confirmPayment.confirm({
        ...httpRequest.body,
        stepSource: httpRequest.step,
        dialogue: httpRequest.dialogue,
      });

      const { step, ...props } = result;

      httpRequest.body = {
        ...props,
        ...httpRequest.body,
      };
      httpRequest.step = step;

      return next();
    } catch (error: any) {
      console.log(error);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
