import { DefaultParams, DefaultResult } from '../../../models';

export interface SendListValuesRecharge {
  send(params: SendListValuesRecharge.Params): SendListValuesRecharge.Result;
}

export namespace SendListValuesRecharge {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
