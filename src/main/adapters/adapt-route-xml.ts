import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';
import { formateSnakeCaseKeysForCamelCase } from '../../utils/object';

export function adaptRouteXml(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: formateSnakeCaseKeysForCamelCase(req.body),
      params: formateSnakeCaseKeysForCamelCase(req.params),
      query: formateSnakeCaseKeysForCamelCase(req.query),
      headers: req.headers,
      step: req.step,
      dialogue: req.dialogue,
    };

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.headers) {
      res.set(httpResponse.headers);
    }

    return res.status(httpResponse.statusCode).send(httpResponse.body);
  };
}
