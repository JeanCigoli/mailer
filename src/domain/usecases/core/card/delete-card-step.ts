import { DefaultBody, DefaultResult } from '../../../models';

export interface DeleteCardStep {
  delete(params: DeleteCardStep.Params): DeleteCardStep.Result;
}

export namespace DeleteCardStep {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
