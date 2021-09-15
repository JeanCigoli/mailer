import { ValidatePlanValuesOptionUra } from '../../../../../domain/usecases/ura/response/validate-plan-values-option-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbValidatePlanValuesOptionXmlResponse
  implements ValidatePlanValuesOptionUra
{
  handle(body: any): string {
    const messages: Array<string> = body.messages;
    const status: boolean = body.status;
    const canRechargeSingle: boolean = body.canRechargeSingle;

    const [fullPlanValues, addonPlanValue] = messages;

    return makeResponseXml({
      status: status ? 'P00' : 'P01',
      values: canRechargeSingle ? fullPlanValues : addonPlanValue,
    });
  }
}
