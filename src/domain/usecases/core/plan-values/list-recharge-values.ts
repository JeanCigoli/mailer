import { Plan } from '../../../../utils/types/plan-values/plan-values-type';

export interface ListRechargeValues {
  handle(clientToken: string): ListRechargeValues.Result;
}

export namespace ListRechargeValues {
  export type Result = Promise<{
    rechargeValues: Array<Plan>;
  }>;
}
