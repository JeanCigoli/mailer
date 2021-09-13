import { Middleware } from '../../presentation/protocols/middleware';

export function adaptMiddlewareStepJob(middleware: Middleware) {
  return async (message: Record<string, any>, next: Function) => {
    const queueRequest = {
      body: message.body,
      headers: message.headers,
      step: message.step,
      dialogue: message.dialogue,
    };

    await middleware.handle(queueRequest, () => {
      message.step = queueRequest.step;
      message.dialogue = queueRequest.dialogue;

      return next();
    });
  };
}
