import { DefaultParams, DefaultResult } from '../../../../models';

export interface SendListsCardsDelete {
  list(params: SendListsCardsDelete.Params): SendListsCardsDelete.Result;
}

export namespace SendListsCardsDelete {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
