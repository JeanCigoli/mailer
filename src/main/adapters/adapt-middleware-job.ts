import { MiddlewareJob } from '../protocols/listener-job';

export function adaptMiddlewareJob(middleware: MiddlewareJob) {
  return async (message: Record<string, any>, next: Function) => {
    const queueRequest = {
      body: message.body,
      headers: message.headers,
    };

    await middleware.handle(queueRequest, () => {
      message.body = queueRequest.body;

      return next();
    });
  };
}
