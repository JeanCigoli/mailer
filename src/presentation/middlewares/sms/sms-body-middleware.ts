import errorLogger from '../../../utils/logger';
import { serverError } from '../../../utils/response/response';
import { HttpRequest, Middleware } from '../../protocols';

export class SmsBodyMiddleware implements Middleware {
  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const json = JSON.parse(httpRequest.body);

      httpRequest.body.msisdn = json.ani;
      httpRequest.body.message = json.text;
      httpRequest.body.sourceId = json.sourceId;

      return next();
    } catch (e) {
      errorLogger(e);
      switch (e) {
        default:
          return serverError(e);
      }
    }
  }
}
