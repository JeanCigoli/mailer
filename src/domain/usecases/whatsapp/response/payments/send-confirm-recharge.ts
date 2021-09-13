import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendConfirmRecharge {
  send(params: SendConfirmRecharge.Params): SendConfirmRecharge.Result;
}

export namespace SendConfirmRecharge {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
