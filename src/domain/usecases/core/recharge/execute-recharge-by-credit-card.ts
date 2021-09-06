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
    status: number;
  }>;
}
