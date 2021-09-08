import { DefaultBody, DefaultResult } from '../../../models';

export interface ListConsumptionStep {
  list(params: ListConsumptionStep.Params): ListConsumptionStep.Result;
}

export namespace ListConsumptionStep {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;

  export type Facade = (
    params: ListConsumptionStep.Params,
  ) => ListConsumptionStep.Result;
}
