export interface RechargeByCreditCard {
  execute(params: RechargeByCreditCard.Params): RechargeByCreditCard.Result;
}

export namespace RechargeByCreditCard {
  export type Params = {
    paymentId: string;
    planId: string;
    cvv: string;
    msisdn: string;
    clientToken: string;
  };

  export type Result = Promise<{
    status: boolean;
    payload?: {
      rechageId: string;
    };
  }>;
}
