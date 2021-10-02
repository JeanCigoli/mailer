import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../../presentation/protocols/http';
import { Middleware } from '../../presentation/protocols/middleware';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';

export function adaptMiddleware(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: formateSnakeCaseKeysForCamelCase(req.body),
      params: formateSnakeCaseKeysForCamelCase(req.params),
      query: formateSnakeCaseKeysForCamelCase(req.query),
      headers: req.headers,
      authData: req.authData,
      token: req.token,
    };

    const httpResponse = await middleware.handle(httpRequest, () => {
      req.authData = httpRequest.authData;
      req.token = httpRequest.token;

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
