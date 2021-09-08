export interface Authentication {
  auth(params: Authentication.Params): Authentication.Result;
}

export namespace Authentication {
  export type Params = {
    msisdn: string;
    message: string;
    sourceId: number;
    stepSource: StepSource;
  };

  export type Result = Promise<{
    status: boolean;
    messages: string[];
    data?: any;
  }>;
}
