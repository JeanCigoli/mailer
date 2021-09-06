export interface RechargeByBillet {
  execute(params: RechargeByBillet.Params): RechargeByBillet.Result;
}

export namespace RechargeByBillet {
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
    status: boolean;
    payload?: {
      billet: Billet;
    };
  }>;
}
