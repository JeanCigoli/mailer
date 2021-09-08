import { VerifyMainMenu } from '../../../domain/usecases/core';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class MainMenuMiddleware implements Middleware {
  constructor(private readonly verifyMainMenu: VerifyMainMenu) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.verifyMainMenu.check({
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
