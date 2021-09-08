export interface SendSms {
  send(params: SendSms.Params): SendSms.Result;
}

export namespace SendSms {
  export type Params = {
    msisdn: string;
    message: string;
  };

  export type Result = Promise<{
    status: boolean;
  }>;
}