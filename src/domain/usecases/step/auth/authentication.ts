export interface Authentication {
  step(params: Authentication.Params): Authentication.Result;
}

export namespace Authentication {
  export type Params = {
    msisdn: string;
    message: string;
  };

  export type Result = {
    message: string[];
  };
}
