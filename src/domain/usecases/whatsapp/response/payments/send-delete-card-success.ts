import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendDeleteCardSuccess {
  send(params: SendDeleteCardSuccess.Params): SendDeleteCardSuccess.Result;
}

export namespace SendDeleteCardSuccess {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
