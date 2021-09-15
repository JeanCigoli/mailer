export interface ValidatePlanValuesOptionSms {
  handle(body: any): ValidatePlanValuesOptionSms.Result;
}

export namespace ValidatePlanValuesOptionSms {
  export type Result = Promise<void>;
}
