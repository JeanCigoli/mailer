import { Plan } from '../../../../utils/types/plan-values/plan-values-type';

export interface ListPlanValues {
  handle(params: ListPlanValues.Params): ListPlanValues.Result;
}

export namespace ListPlanValues {
  export type Params = {
    clientToken: string;
    type: string;
  };

  export type Result = Promise<{
    planValues: Array<Plan>;
  }>;
}
