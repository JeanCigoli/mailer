import { DbValidatePlanValuesOptionXmlResponse } from '../../../../../data/usecases/ura/response/plan-values/db-validate-plan-values-option-xml-response';
import { ValidatePlanValuesOptionControllerUra } from '../../../../../presentation/controllers/ura/plan-values/validate-plan-values-option-controller-ura';

export const makeValidatePlanValuesOptionControllerUra = () => {
  const dbValidatePlanValuesOptionXmlResponse =
    new DbValidatePlanValuesOptionXmlResponse();

  return new ValidatePlanValuesOptionControllerUra(
    dbValidatePlanValuesOptionXmlResponse,
  );
};
