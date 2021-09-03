import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../../presentation/protocols/http';
import { Middleware } from '../../presentation/protocols/middleware';

export function adaptMiddleware(middleware: Middleware) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    };

    const httpResponse = await middleware.handle(httpRequest, () => {
      req.body = httpRequest.body;

      return next();
    });

    if (!httpResponse) return;

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    //RETORNO EM SOAP;
  };
}
