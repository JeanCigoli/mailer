import { DefaultBody, DefaultResult } from '../../../models';

export interface AddNumberCard {
  add(params: AddNumberCard.Params): AddNumberCard.Result;
}

export namespace AddNumberCard {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
