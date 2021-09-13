import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendMessagesDefault {
  send(params: SendMessagesDefault.Params): SendMessagesDefault.Result;
}

export namespace SendMessagesDefault {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
