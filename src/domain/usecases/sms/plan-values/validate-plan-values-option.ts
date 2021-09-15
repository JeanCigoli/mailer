export interface ValidatePlanValuesOption {
  handle(body: any): ValidatePlanValuesOption.Result;
}

export namespace ValidatePlanValuesOption {
  export type Result = Promise<void>;
}
