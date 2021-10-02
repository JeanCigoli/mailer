export interface SendMailMailer {
  send(params: SendMailMailer.Params): SendMailMailer.Result;
}

export namespace SendMailMailer {
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
