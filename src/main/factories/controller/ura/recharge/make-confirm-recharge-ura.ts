import { DbConfirmRechargeXml } from '../../../../../data/usecases/ura/response/recharge/db-confirm-recharge-xml';
import { ConfirmRechargeControllerUra } from '../../../../../presentation/controllers/ura/recharge/confirm-recharge-controller-ura';

export const makeConfirmRechargeUra = () => {
  const dbConfirmRechargeXml = new DbConfirmRechargeXml();

  return new ConfirmRechargeControllerUra(dbConfirmRechargeXml);
};
