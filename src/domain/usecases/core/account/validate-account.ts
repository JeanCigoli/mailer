export interface ValidateAccount {
  valid(params: ValidateAccount.Params): ValidateAccount.Result;
}

export namespace ValidateAccount {
  export type Params = {
    token?: string;
    msisdn: string;
    authentication: string;
  };

  export type Result = Promise<{
    canRechargeSingle: boolean;
    expected: string;
  }>;

  export type Facade = (
    params: ValidateAccount.Params,
  ) => ValidateAccount.Result;
}
