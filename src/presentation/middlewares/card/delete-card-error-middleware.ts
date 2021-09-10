import { DeleteCardError } from '../../../domain/usecases/core';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class DeleteCardErrorMiddleware implements Middleware {
  constructor(private readonly deleteCardError: DeleteCardError) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.deleteCardError.check({
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
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
