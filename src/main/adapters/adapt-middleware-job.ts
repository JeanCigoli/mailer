import { Middleware } from '../../presentation/protocols';

export function adaptMiddlewareJob(middleware: Middleware) {
  return async (message: Record<string, any>, next: Function) => {
    const httpRequest = {
      body: message.body,
      headers: message.headers,
      step: message.step,
      dialogue: message.dialogue,
    };

    await middleware.handle(httpRequest, () => {
      message.body = httpRequest.body;
      message.step = httpRequest.step;

      return next();
    });
  };
}
