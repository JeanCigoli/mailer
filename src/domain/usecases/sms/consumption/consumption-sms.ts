export interface ConsumptionSms {
  handle(body: any): ConsumptionSms.Result;
}

export namespace ConsumptionSms {
  export type Result = Promise<void>;
}
