import { ExecuteRechargeByCreditCard } from '../../../../domain/usecases/core/recharge/execute-recharge-by-credit-card';
import { RechargeByCreditCard } from '../../../protocols/core/http/recharge-by-credit-card';

export class HttpExecuteRechargeByCreditRecharge
  implements ExecuteRechargeByCreditCard
{
  constructor(private readonly rechargeWithCreditCard: RechargeByCreditCard) {}

  async handle(
    params: ExecuteRechargeByCreditCard.Params,
  ): ExecuteRechargeByCreditCard.Result {
    const result = await this.rechargeWithCreditCard.execute(params);

    if (!result.status) throw new Error('ERROR_EXECUTE_RECHARGE');

    return { status: 1 };
  }
}
