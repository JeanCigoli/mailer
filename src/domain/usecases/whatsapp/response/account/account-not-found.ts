import { DefaultParams, DefaultResult } from '../../../../models';

export interface AccountNotFound {
  notFound(params: AccountNotFound.Params): AccountNotFound.Result;
}

export namespace AccountNotFound {
  export type Params = DefaultResult & DefaultParams;

  export type Result = Promise<void>;
}
