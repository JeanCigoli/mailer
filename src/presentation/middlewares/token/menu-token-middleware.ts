import { MenuToken } from '../../../domain/usecases/core';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class MenuTokenMiddleware implements Middleware {
  constructor(private readonly menuToken: MenuToken) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.menuToken.check({
        ...httpRequest.body,
        stepSource: httpRequest.step,
        dialogue: httpRequest.dialogue,
      });

      httpRequest.body = {
        ...httpRequest.body,
        ...result,
      };

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
