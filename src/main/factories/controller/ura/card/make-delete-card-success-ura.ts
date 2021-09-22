import { DbDeleteCardSuccessXml } from '../../../../../data/usecases/ura/response/card/db-delete-card-success-xml';
import { DeleteCardSuccessControllerUra } from '../../../../../presentation/controllers/ura/cards/delete-card-success-controller-ura';

export const makeDeleteCardSuccessUra = () => {
  const dbDeleteCardSuccessXml = new DbDeleteCardSuccessXml();

  return new DeleteCardSuccessControllerUra(dbDeleteCardSuccessXml);
};
