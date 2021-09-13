import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendListCardRecharge {
  send(params: SendListCardRecharge.Params): SendListCardRecharge.Result;
}

export namespace SendListCardRecharge {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
