import { DbDefaultStepXml } from '../../../../../data/usecases/ura/response/default/db-default-step-xml';
import { DefaultControllerUra } from '../../../../../presentation/controllers/ura/default/default-controller-ura';

export const makeDefaultControllerUra = () => {
  const dbDefaultStepXml = new DbDefaultStepXml();

  return new DefaultControllerUra(dbDefaultStepXml);
};
