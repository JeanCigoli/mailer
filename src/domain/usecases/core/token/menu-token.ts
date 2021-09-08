import { DefaultBody } from '../../../models';

export interface MenuToken {
  check(params: MenuToken.Params): MenuToken.Result;
}

export namespace MenuToken {
  export type Params = DefaultBody;

  export type Result = Promise<{
    status: boolean;
    messages: string[];
    data?: any;
  }>;
}
