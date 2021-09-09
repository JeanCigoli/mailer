import { DefaultBody, DefaultResult } from '../../../models';

export interface AddValidityCard {
  add(params: AddValidityCard.Params): AddValidityCard.Result;
}

export namespace AddValidityCard {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
