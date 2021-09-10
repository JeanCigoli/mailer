import { DefaultBody, DefaultResult } from '../../../models';

export interface AddSecurityCode {
  add(params: AddSecurityCode.Params): AddSecurityCode.Result;
}

export namespace AddSecurityCode {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
