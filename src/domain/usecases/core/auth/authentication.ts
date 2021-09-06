export interface Authentication {
  auth(params: Authentication.Params): Authentication.Result;
}

export namespace Authentication {
  export type Params = {
    msisdn: string;
  };

  export type Result = Promise<{
    status: boolean;
    data: any;
  }>;
}
