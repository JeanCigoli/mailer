import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendBilletRecharge {
  send(params: SendBilletRecharge.Params): SendBilletRecharge.Result;
}

export namespace SendBilletRecharge {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
