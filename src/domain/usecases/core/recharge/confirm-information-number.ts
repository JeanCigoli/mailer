import { DefaultBody, DefaultResult } from '../../../models';

export interface ConfirmInformationNumber {
  check(
    params: ConfirmInformationNumber.Params,
  ): ConfirmInformationNumber.Result;
}

export namespace ConfirmInformationNumber {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
