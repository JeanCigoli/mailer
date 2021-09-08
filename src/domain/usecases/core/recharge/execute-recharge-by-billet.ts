export interface ExecuteRechargeByBillet {
  handle(
    params: ExecuteRechargeByBillet.Params,
  ): ExecuteRechargeByBillet.Result;
}

export namespace ExecuteRechargeByBillet {
  export type Params = {
    msisdn: string;
    planId: string;
    clientToken: string;
  };
  type Billet = {
    digitableLine: string;
    expirationDate: Date;
    value: string;
    link: string;
    externalPaymentId: string;
  };

  export type Result = Promise<{
    billet: Billet;
  }>;

  export type Facade = (
    params: ExecuteRechargeByBillet.Params,
  ) => ExecuteRechargeByBillet.Result;
}
