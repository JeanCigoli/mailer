import { DefaultBody, DefaultResult } from '../../../models';

export interface ErrorRechargeInformation {
  check(
    params: ErrorRechargeInformation.Params,
  ): ErrorRechargeInformation.Result;
}

export namespace ErrorRechargeInformation {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
