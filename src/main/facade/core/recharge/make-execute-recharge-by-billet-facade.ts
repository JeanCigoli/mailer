import { HttpExecuteRechargeByBillet } from '../../../../data/usecases/core/recharge/http-execute-recharge-by-billet';
import { ExecuteRechargeByBillet } from '../../../../domain/usecases/core/recharge/execute-recharge-by-billet';
import { phoenixRecharge } from '../../../../infra/core/http/helpers/phoenix-recharge';
import { RechargeByBilletService } from '../../../../infra/core/http/phoenix/recharge/recharge-by-billet-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeExecuteRechargeByBilletFacade: ExecuteRechargeByBillet.Facade =
  (params: ExecuteRechargeByBillet.Params): ExecuteRechargeByBillet.Result => {
    const httpClient = new RequestAdapter(phoenixRecharge);

    const executeRechargeByBilletService = new RechargeByBilletService(
      httpClient,
    );

    return new HttpExecuteRechargeByBillet(
      executeRechargeByBilletService,
    ).handle(params);
  };
