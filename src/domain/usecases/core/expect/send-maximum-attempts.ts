import { DefaultBody, DefaultResult } from '../../../models';

export interface SendMaximumAttempts {
  send(params: SendMaximumAttempts.Params): SendMaximumAttempts.Result;
}

export namespace SendMaximumAttempts {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;

  export type Facade = (
    params: SendMaximumAttempts.Params,
  ) => SendMaximumAttempts.Result;
}
