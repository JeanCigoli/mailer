import { DefaultBody, DefaultResult } from '../../../models';

export interface InformationNumber {
  check(params: InformationNumber.Params): InformationNumber.Result;
}

export namespace InformationNumber {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
