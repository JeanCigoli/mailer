import { DefaultBody, DefaultResult } from '../../../models';

export interface ListConsumption {
  list(params: ListConsumption.Params): ListConsumption.Result;
}

export namespace ListConsumption {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
