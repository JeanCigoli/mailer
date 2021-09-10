export interface ExecuteRechargeByCreditCard {
  handle(
    params: ExecuteRechargeByCreditCard.Params,
  ): ExecuteRechargeByCreditCard.Result;
}

export namespace ExecuteRechargeByCreditCard {
  export type Params = {
    paymentId: string;
    planId: string;
    cvv: string;
    msisdn: string;
    clientToken: string;
  };

  export type Result = Promise<{
    status: boolean;
    rechargeId?: string;
    message?: string;
  }>;

  export type Facade = (
    params: ExecuteRechargeByCreditCard.Params,
  ) => ExecuteRechargeByCreditCard.Result;
}
