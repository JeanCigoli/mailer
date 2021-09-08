import { DefaultBody } from '../../../models';

export interface VerifyMainMenu {
  check(params: VerifyMainMenu.Params): VerifyMainMenu.Result;
}

export namespace VerifyMainMenu {
  export type Params = DefaultBody;

  export type Result = Promise<{
    status: boolean;
    messages: string[];
    data?: any;
  }>;
}
