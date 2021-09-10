import { DefaultBody, DefaultResult } from '../../../models';

export interface ConfirmAddCard {
  confirm(params: ConfirmAddCard.Params): ConfirmAddCard.Result;
}

export namespace ConfirmAddCard {
  export type Params = DefaultBody;

  export type Result = Promise<DefaultResult>;
}
