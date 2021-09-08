import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { PlanValuesXmlResponse } from '../../../../domain/usecases/ura/response/plan-values-xml';
import { makeSendSmsJob } from '../../../../main/factories/jobs/make-send-sms-job';
import { contentTypeXml } from '../../../../utils/content-type-xml';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class PlanValuesControllerUra implements Controller {
  constructor(private readonly plansValuesXmlResponse: PlanValuesXmlResponse) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = this.plansValuesXmlResponse.format(httpRequest.body);

      return {
        statusCode: 200,
        body: result,
        headers: contentTypeXml,
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml({ status: 'P01', values: 'erro.wap' }),
        headers: contentTypeXml,
      };
    }
  }
}