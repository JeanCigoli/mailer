import { DbListCardsXmlResponse } from '../../../../../data/usecases/ura/response/card/db-list-cards-xml-response';
import { ListCardsControllerUra } from '../../../../../presentation/controllers/ura/cards/list-cards-controller-ura';

export const makeListCardsControllerUra = () => {
  const listCardXml = new DbListCardsXmlResponse();

  return new ListCardsControllerUra(listCardXml);
};
