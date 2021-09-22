import { ValidatePlanValuesOptionUra } from '../../../../domain/usecases/ura/response/recharge/validate-plan-values-option-xml';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ValidatePlanValuesOptionControllerUra implements Controller {
  constructor(
    private readonly validatePlanValuesOptionUra: ValidatePlanValuesOptionUra,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.validatePlanValuesOptionUra.handle(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml({
          status: 'P01',
          messages: 'error.wav',
        }),
        headers: contentTypeXml,
      };
    }
  }
}
