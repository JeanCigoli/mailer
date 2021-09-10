import { DefaultBody, DefaultResult } from '../../../models';

export interface DeleteCardSuccess {
  check(params: DeleteCardSuccess.Params): DeleteCardSuccess.Result;
}

export namespace DeleteCardSuccess {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
