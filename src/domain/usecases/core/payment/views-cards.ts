import { DefaultBody, DefaultResult } from '../../../models';

export interface ViewsCards {
  check(params: ViewsCards.Params): ViewsCards.Result;
}

export namespace ViewsCards {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
