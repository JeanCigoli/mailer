import { DbConfirmAddCardXml } from '../../../../../data/usecases/ura/response/card/db-confirm-add-card-xml';
import { ConfirmAddCardControllerUra } from '../../../../../presentation/controllers/ura/cards/confirm-add-card-controller-ura';

export const makeConfirmAddCardUra = () => {
  const dbConfirmAddCardXml = new DbConfirmAddCardXml();

  return new ConfirmAddCardControllerUra(dbConfirmAddCardXml);
};
