export interface SendMail {
  send(params: SendMail.Params): SendMail.Result;
}

export namespace SendMail {
  export type Params = {
    alias: string;
    from: string;
    to: string;
    subject: string;
    template: string;
    context: { [params: string]: any };
  };

  export type Result = Promise<any>;
}
