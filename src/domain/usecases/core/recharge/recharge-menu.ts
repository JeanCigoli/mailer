import { DefaultBody, DefaultResult } from '../../../models';

export interface MenuRecharge {
  check(params: MenuRecharge.Params): MenuRecharge.Result;
}

export namespace MenuRecharge {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
