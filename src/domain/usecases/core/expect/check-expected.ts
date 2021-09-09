import { DefaultBody, DefaultResult } from '../../../models';

export interface CheckExpected {
  check(params: CheckExpected.Params): CheckExpected.Result;
}

export namespace CheckExpected {
  export type Params = DefaultBody;

  export type Result = Promise<{
    isError: boolean;
    data: DefaultResult;
  }>;

  export type Facade = (params: CheckExpected.Params) => CheckExpected.Result;
}
