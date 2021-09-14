import { ValidateAccount } from '../../../../domain/usecases/core';
import { GetToken } from '../../../../domain/usecases/core/token/get-token';
import { RechargeType } from '../../../../utils/enum/recharge-type';
import { GetAccount } from '../../../protocols/core/http';

export class HttpValidateAccount implements ValidateAccount {
  constructor(
    private readonly getAccount: GetAccount,
    private readonly listToken: GetToken.Facade,
  ) {}

  async valid(params: ValidateAccount.Params): ValidateAccount.Result {
    const { token } = !params.token
      ? await this.listToken({
          msisdn: params.msisdn,
          authentication: params.authentication,
        })
      : { token: params.token };

    const account = await this.getAccount.get({
      clientToken: token as string,
    });

    if (!account.payload) {
      return {
        canRechargeSingle: true,
        expected: JSON.stringify({
          0: 'RECHARGE_MENU',
          1: 'RECHARGE_PLAN',
          2: 'ADDON_PLAN',
        }),
      };
    }

    const plan = account.payload.plan.filter(
      (value) => value.type === RechargeType.SINGLE,
    );

    return {
      canRechargeSingle: !plan.length,
      expected: !plan.length
        ? JSON.stringify({
            0: 'RECHARGE_MENU',
            1: 'RECHARGE_PLAN',
            2: 'ADDON_PLAN',
          })
        : JSON.stringify({
            0: 'RECHARGE_MENU',
            2: 'ADDON_PLAN',
          }),
    };
  }
}
