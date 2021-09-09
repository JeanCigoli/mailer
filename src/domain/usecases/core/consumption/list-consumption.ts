export interface ListConsumption {
  handle(params: ListConsumption.Params): ListConsumption.Result;
}

export namespace ListConsumption {
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
    consumption: Payload;
  }>;

  export type Params = {
    msisdn: string;
    token: string;
  };

  export type Facade = (
    params: ListConsumption.Params,
  ) => ListConsumption.Result;
}
