import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendConfirmAddCard {
  send(params: SendConfirmAddCard.Params): SendConfirmAddCard.Result;
}

export namespace SendConfirmAddCard {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
