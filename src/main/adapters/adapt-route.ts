import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';
import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '../../utils/object';

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: formateSnakeCaseKeysForCamelCase(req.body),
      params: formateSnakeCaseKeysForCamelCase(req.params),
      query: formateSnakeCaseKeysForCamelCase(req.query),
      headers: req.headers,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    if (typeof httpResponse.headers === 'object') {
      if (
        Object.values(httpResponse.headers).find(
          (value) => value === 'application/xml',
        )
      )
        return res.status(httpResponse.statusCode).send(httpResponse.body);
    }

    return res
      .status(httpResponse.statusCode)
      .json(formateCamelCaseKeysForSnakeCase(httpResponse.body));
  };
}
