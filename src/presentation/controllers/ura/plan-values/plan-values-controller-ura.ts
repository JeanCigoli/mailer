import { ListPlanValues } from '../../../../domain/usecases/core/plan-values/list-plan-values';
import { makeSendSmsJob } from '../../../../main/factories/jobs/make-send-sms-job';
import { makeResponseXml } from '../../../../utils/response/response-xml';
import { makePlanValuesXmlResponse } from '../../../../utils/response/ura/make-plan-values-xml-response';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class PlanValuesControllerUra implements Controller {
  constructor(private readonly listPlanValues: ListPlanValues) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { clientToken } = httpRequest.body;

      return {
        statusCode: 200,
        body: makePlanValuesXmlResponse('P00'),
        headers: {
          'Content-type': 'application/xml',
        },
      };
    } catch (e) {
      return {
        statusCode: 400,
        body: makeResponseXml({ status: 'P01', values: 'erro.wap' }),
      };
    }
  }
}
