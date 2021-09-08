import { DefaultBody, DefaultResult } from '../../../models';

export interface MenuToken {
  check(params: MenuToken.Params): MenuToken.Result;
}

export namespace MenuToken {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
