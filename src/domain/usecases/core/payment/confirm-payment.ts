import { DefaultBody, DefaultResult } from '../../../models';

export interface ConfirmPayment {
  confirm(params: ConfirmPayment.Params): ConfirmPayment.Result;
}

export namespace ConfirmPayment {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
