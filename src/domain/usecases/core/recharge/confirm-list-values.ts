import { DefaultBody, DefaultResult } from '../../../models';

export interface ConfirmListValues {
  confirm(params: ConfirmListValues.Params): ConfirmListValues.Result;
}

export namespace ConfirmListValues {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
