export interface ConsumptionXml {
  handle(body: any): ConsumptionXml.Result;
}

export namespace ConsumptionXml {
  export type Result = Promise<string>;
}
