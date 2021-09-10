import { Plan } from '../../../models';

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

  export type Facade = (params: ListPlanValues.Params) => ListPlanValues.Result;
}
