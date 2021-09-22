import { DbConfirmAddMsisdn } from '../../../../../data/usecases/ura/response/recharge/db-confirm-add-msisdn-xml';
import { ConfirmAddMsisdnControllerUra } from '../../../../../presentation/controllers/ura/recharge/confirm-add-msisdn-controller-ura';

export const makeConfirmAddMsisdnUra = () => {
  const dbConfirmAddMsisdn = new DbConfirmAddMsisdn();

  return new ConfirmAddMsisdnControllerUra(dbConfirmAddMsisdn);
};
