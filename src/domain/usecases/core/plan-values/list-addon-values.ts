import { Plan } from '../../../../utils/types/plan-values/plan-values-type';

export interface ListAddonValues {
  handle(clientToken: string): ListAddonValues.Result;
}

export namespace ListAddonValues {
  export type Result = Promise<{
    addonValues: Array<Plan>;
  }>;
}
