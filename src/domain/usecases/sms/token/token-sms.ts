export interface TokenSms {
  handle(body: any): TokenSms.Result;
}

export namespace TokenSms {
  export type Result = Promise<void>;
}
