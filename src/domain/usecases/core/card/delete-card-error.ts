import { DefaultBody, DefaultResult } from '../../../models';

export interface DeleteCardError {
  check(params: DeleteCardError.Params): DeleteCardError.Result;
}

export namespace DeleteCardError {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
