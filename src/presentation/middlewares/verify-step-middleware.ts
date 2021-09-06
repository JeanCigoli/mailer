import { VerifyStep } from '../../domain/usecases/dialogue';
import { serverError } from '../../utils/response/response';
import { HttpRequest, Middleware } from '../protocols';

export class VerifyStepMiddleware implements Middleware {
  constructor(private readonly verifyStep: VerifyStep) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = await this.verifyStep.step(httpRequest.body);

      httpRequest.step = result.stepSource;
      httpRequest.dialogue = result.dialogue;

      return next();
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
