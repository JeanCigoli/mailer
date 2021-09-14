export interface GetAccount {
  get(params: GetAccount.Params): GetAccount.Result;
}

export namespace GetAccount {
  export type Params = {
    clientToken: string;
  };

  export type Plan = {
    name: string;
    expiration: string;
    type: string;
    createdAt: string;
  };

  export type Result = Promise<{
    status: boolean;
    payload?: {
      accountId: string;
      name: string;
      document: string;
      msisdn: string;
      iccid: string;
      imsi: string;
      status: string;
      activationDate: string;
      mvno: string;
      plan: Plan[];
      typeDocument: string;
      recurrence: boolean | null;
    };
  }>;
}
