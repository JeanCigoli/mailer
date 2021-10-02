export interface SendShipments {
  send(params: SendShipments.Params): SendShipments.Result;
}

export namespace SendShipments {
  export type Params = {
    token: string;
    mvnoId: number;
    mail: {
      to: {
        email: string;
        variables: { [params: string]: any };
      }[];
      subject: string;
      template: string;
    };
  };

  export type Result = Promise<{
    message: string;
  }>;
}
