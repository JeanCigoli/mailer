import { ListRechargeValues } from '../../../../domain/usecases/core/plan-values/list-recharge-values';
import { GetPlanValues } from '../../../protocols/core/http/get-plan-values';

export class HttpListRechargeValues implements ListRechargeValues {
  constructor(private readonly getPlanValues: GetPlanValues) {}

  async handle(clientToken: string): ListRechargeValues.Result {
    const allValues = await this.getPlanValues.getAllValues(clientToken);

    if (!allValues.status || !allValues.payload) {
      throw new Error('REQUEST_ERROR');
    }

    const rechargeValues = allValues.payload.filter((value) => {
      if (value.type.toUpperCase() === 'RECARGA') {
        return value;
      }
    });

    return { rechargeValues };
  }
}
