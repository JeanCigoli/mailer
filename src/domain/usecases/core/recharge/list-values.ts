import { DefaultBody, DefaultResult } from '../../../models';

export interface ListValues {
  list(params: ListValues.Params): ListValues.Result;
}

export namespace ListValues {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
