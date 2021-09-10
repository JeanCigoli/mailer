export interface SuccessSms {
  handle(body: any): SuccessSms.Result;
}

export namespace SuccessSms {
  export type Result = Promise<{
    status: boolean;
  }>;
}
