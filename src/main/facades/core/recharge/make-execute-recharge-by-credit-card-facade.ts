import { HttpExecuteRechargeByCreditRecharge } from '../../../../data/usecases/core/recharge/http-execute-recharge-by-credit-card';
import { ExecuteRechargeByCreditCard } from '../../../../domain/usecases/core/recharge/execute-recharge-by-credit-card';
import { phoenixRecharge } from '../../../../infra/core/http/helpers/phoenix-recharge';
import { RechargeByCreditCardService } from '../../../../infra/core/http/phoenix/recharge/recharge-by-credit-card-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeExecuteRechargeByCreditCardFacade: ExecuteRechargeByCreditCard.Facade =
  (
    params: ExecuteRechargeByCreditCard.Params,
  ): ExecuteRechargeByCreditCard.Result => {
    const httpClient = new RequestAdapter(phoenixRecharge);

    const rechargeService = new RechargeByCreditCardService(httpClient);

    return new HttpExecuteRechargeByCreditRecharge(rechargeService).handle(
      params,
    );
  };