import { Plan } from '../../../../utils/types/plan-values/plan-values-type';

export interface GetPlanValues {
  getAllValues(clientToken: string): GetPlanValues.Result;
}

export namespace GetPlanValues {
  export type Result = Promise<{
    status: boolean;
    payload?: Array<Plan>;
  }>;
}
