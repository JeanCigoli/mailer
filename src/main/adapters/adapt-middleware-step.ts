import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../../presentation/protocols/http';
import { Middleware } from '../../presentation/protocols/middleware';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../utils/object';

export function adaptMiddlewareStep(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: formateSnakeCaseKeysForCamelCase(req.body),
      params: formateSnakeCaseKeysForCamelCase(req.params),
      query: formateSnakeCaseKeysForCamelCase(req.query),
      headers: req.headers,
    };

    const httpResponse = await middleware.handle(httpRequest, () => {
      req.step = httpRequest.step;
      req.dialogue = httpRequest.dialogue;

      return next();
    });

    if (!httpResponse) return;

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    return res
      .status(httpResponse.statusCode)
      .json(formateCamelCaseKeysForSnakeCase(httpResponse.body));
  };
}
