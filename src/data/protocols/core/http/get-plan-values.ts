import { Plan } from '../../../../domain/models';

export interface GetPlanValues {
  getAllValues(clientToken: string): GetPlanValues.Result;
}

export namespace GetPlanValues {
  export type Result = Promise<{
    status: boolean;
    payload?: Array<Plan>;
  }>;
}
