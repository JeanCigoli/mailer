export interface PlanValuesSms {
  handle(body: any): PlanValuesSms.Result;
}

export namespace PlanValuesSms {
  export type Result = Promise<void>;
}
