import { DbMenuXml } from '../../../../../data/usecases/ura/response/menu/db-menu';
import { MenuControllerUra } from '../../../../../presentation/controllers/ura/menu/menu-controller-ura';

export const makeMenuController = () => {
  const dbMenuXml = new DbMenuXml();

  return new MenuControllerUra(dbMenuXml);
};
