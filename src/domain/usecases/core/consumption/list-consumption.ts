export interface ListConsumption {
  handle(clientToken: string): ListConsumption.Result;
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

  export type Facade = (clientToken: string) => ListConsumption.Result;
}
