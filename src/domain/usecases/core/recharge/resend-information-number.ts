import { DefaultBody, DefaultResult } from '../../../models';

export interface ResendInformationNumber {
  check(params: ResendInformationNumber.Params): ResendInformationNumber.Result;
}

export namespace ResendInformationNumber {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
