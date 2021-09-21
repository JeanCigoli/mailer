import { ValidatePlanValuesOptionUra } from '../../../../../domain/usecases/ura/response/validate-plan-values-option-xml';
import { makeResponseXml } from '../../../../../utils/response/response-xml';

export class DbValidatePlanValuesOptionXmlResponse
  implements ValidatePlanValuesOptionUra
{
  handle(body: any): string {
    const messages: Array<string> = body.messages;
    const status: boolean = body.status;
    const canRechargeSingle: boolean = body.data.canRechargeSingle;

    const [jsonMessage, twoMessage] = messages;

    const message = twoMessage
      ? JSON.parse(twoMessage)
      : JSON.parse(jsonMessage);

    const [fullPlanValues, addonPlanValue] = message;

    const fullPlan = twoMessage
      ? [jsonMessage, fullPlanValues]
      : [fullPlanValues];

    const addonPlan = twoMessage
      ? [jsonMessage, addonPlanValue]
      : [addonPlanValue];

    return makeResponseXml({
      status: status ? 'P00' : 'P01',
      values: canRechargeSingle ? fullPlan : addonPlan,
    });
  }
}
