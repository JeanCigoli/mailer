export interface GetUserConsumption {
  get(params: GetUserConsumption.Params): GetUserConsumption.Result;
}

export namespace GetUserConsumption {
  type Data = {
    total: string;
    available: string;
    used: string;
  };

  type Payload = {
    voice: Data;
    sms: Data;
    data: Data;
  };

  export type Params = {
    clientToken: string;
  };

  export type Result = Promise<{
    message: string;
    payload: Payload;
    error: any[];
  }>;
}
