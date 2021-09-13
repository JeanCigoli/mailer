import { Middleware } from '../../presentation/protocols';

export function adaptMiddlewareJob(middleware: Middleware) {
  return async (message: Record<string, any>, next: Function) => {
    const queueRequest = {
      body: message.body,
      headers: message.headers,
      step: message.step,
      dialogue: message.dialogue,
    };

    await middleware.handle(queueRequest, () => {
      message.body = queueRequest.body;
      message.step = queueRequest.step;

      return next();
    });
  };
}
