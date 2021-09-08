import { DbTokenXml } from '../../../../data/usecases/ura/response/token/db-token-xml-response';
import { TokenControllerUra } from '../../../../presentation/controllers/ura/token/token-controller-ura';

export const makeTokenControllerUra = () => {
  const dbTokenXml = new DbTokenXml();

  return new TokenControllerUra(dbTokenXml);
};
