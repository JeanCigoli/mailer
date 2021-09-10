import { DefaultBody, DefaultResult } from '../../../models';

export interface SendRechargeStep {
  send(params: SendRechargeStep.Params): SendRechargeStep.Result;
}

export namespace SendRechargeStep {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;

  export type Facade = (
    params: SendRechargeStep.Params,
  ) => SendRechargeStep.Result;
}
