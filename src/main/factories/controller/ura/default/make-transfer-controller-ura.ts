import { DbTransferXml } from '../../../../../data/usecases/ura/response/default/db-transfer-xml';
import { TransferControllerUra } from '../../../../../presentation/controllers/ura/default/transfer-controller-ura';

export const makeTransferControllerUra = () => {
  const dbTransferXml = new DbTransferXml();

  return new TransferControllerUra(dbTransferXml);
};
