export interface SendSmsCallback {
  handle(params: SendSmsCallback.Params): SendSmsCallback.Result;
}

export namespace SendSmsCallback {
  export type Params = {
    msisdn: string;
    message: string;
    clientToken: string;
  };

  export type Result = Promise<void>;
}
