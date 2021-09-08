export interface GetToken {
  handle(params: GetToken.Params): GetToken.Result;
}

export namespace GetToken {
  export type Params = {
    msisdn: string;
    authentication: string;
  };

  export type Result = Promise<{
    status: boolean;
    token?: string;
  }>;

  export type Facade = (params: GetToken.Params) => GetToken.Result;
}
