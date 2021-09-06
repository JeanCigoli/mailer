import { Authentication } from '../../../domain/usecases/core';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.authentication.auth({
        ...httpRequest.body,
        stepSource: httpRequest.step,
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
