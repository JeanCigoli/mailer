import { ValidatePlanValuesOptionUra } from '../../../../domain/usecases/ura/response/validate-plan-values-option-xml';
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
      };
    } catch (e) {
      return {
        statusCode: 400,
      };
    }
  }
}
