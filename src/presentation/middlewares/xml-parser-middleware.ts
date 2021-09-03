import { XmlParser } from '../../domain/usecases/ura';
import { serverError } from '../../utils/response';
import { HttpRequest } from '../protocols/http';
import { Middleware } from '../protocols/middleware';

export class XmlParserMiddleware implements Middleware {
  constructor(private readonly xmlParser: XmlParser) {}

  async handle(httpRequest: HttpRequest, next: Function): Middleware.Result {
    try {
      const result = this.xmlParser.convert({
        body: httpRequest.body,
      });

      httpRequest.body = result.body;

      return next();
    } catch (error: any) {
      console.log({ error });

      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
