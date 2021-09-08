export interface PlanValuesXmlResponse {
  format(body: any): PlanValuesXmlResponse.Result;
}

export namespace PlanValuesXmlResponse {
  export type Result = string;
}
