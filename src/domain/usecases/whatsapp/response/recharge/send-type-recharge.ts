import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendTypeRecharge {
  send(params: SendTypeRecharge.Params): SendTypeRecharge.Result;
}

export namespace SendTypeRecharge {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
