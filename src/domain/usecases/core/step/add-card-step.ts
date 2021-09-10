import { DefaultBody, DefaultResult } from '../../../models';

export interface AddCardStep {
  add(params: AddCardStep.Params): AddCardStep.Result;
}

export namespace AddCardStep {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;

  export type Facade = (params: AddCardStep.Params) => AddCardStep.Result;
}
