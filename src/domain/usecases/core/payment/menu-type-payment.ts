import { DefaultBody, DefaultResult } from '../../../models';

export interface MenuTypePayment {
  check(params: MenuTypePayment.Params): MenuTypePayment.Result;
}

export namespace MenuTypePayment {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
