import { DefaultParams, DefaultResult } from '../../../../models';

export interface ListsCardsDelete {
  list(params: ListsCardsDelete.Params): ListsCardsDelete.Result;
}

export namespace ListsCardsDelete {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
