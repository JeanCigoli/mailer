export interface GetClientToken {
  get(params: GetClientToken.Params): GetClientToken.Result;
}

export namespace GetClientToken {
  export type Params = {
    msisdn: string;
    authentication: string;
  };

  export type Result = Promise<{
    status: boolean;
    token?: string;
  }>;
}
