import { Middleware } from '../../presentation/protocols/middleware';

export function adaptMiddlewareStepJob(middleware: Middleware) {
  return async (message: Record<string, any>, next: Function) => {
    const httpRequest = {
      body: message.body,
      headers: message.headers,
      step: message.step,
      dialogue: message.dialogue,
    };

    await middleware.handle(httpRequest, () => {
      message.step = httpRequest.step;
      message.dialogue = httpRequest.dialogue;

      return next();
    });
  };
}
