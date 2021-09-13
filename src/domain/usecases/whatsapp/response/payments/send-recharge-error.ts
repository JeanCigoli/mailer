import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendRechargeError {
  send(params: SendRechargeError.Params): SendRechargeError.Result;
}

export namespace SendRechargeError {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
