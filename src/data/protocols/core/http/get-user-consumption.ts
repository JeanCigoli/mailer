export interface GetUserConsumption {
  get(clientToken: string): GetUserConsumption.Result;
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

  export type Result = Promise<{
    status: boolean;
    payload?: Payload;
  }>;
}
