import { ExecuteRechargeByBillet } from '../../../../domain/usecases/core/recharge/execute-recharge-by-billet';
import { RechargeByBillet } from '../../../protocols/core/http/recharge-by-billet';

export class HttpExecuteRechargeByBillet implements ExecuteRechargeByBillet {
  constructor(private readonly rechargeByBillet: RechargeByBillet) {}

  async handle(
    params: ExecuteRechargeByBillet.Params,
  ): ExecuteRechargeByBillet.Result {
    const result = await this.rechargeByBillet.execute(params);

    if (!result.status || !result.payload) {
      return {
        status: false,
        billet: result?.payload,
      };
    }

    return { billet: result.payload.billet, status: true };
  }
}
