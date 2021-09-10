import { DefaultBody, DefaultResult } from '../../../models';

export interface MenuCards {
  check(params: MenuCards.Params): MenuCards.Result;
}

export namespace MenuCards {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
