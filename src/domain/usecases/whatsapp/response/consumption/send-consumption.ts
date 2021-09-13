import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendConsumption {
  send(params: SendConsumption.Params): SendConsumption.Result;
}

export namespace SendConsumption {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
