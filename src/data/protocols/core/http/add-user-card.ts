export interface AddUserCard {
  add(params: AddUserCard.Params): AddUserCard.Result;
}

export namespace AddUserCard {
  export type Params = {
    name: string;
    document: string;
    validity: string;
    cardNumber: string;
    type: string;
    cvv: string;
    clientToken: string;
  };

  export type Result = Promise<{
    status: boolean;
    paymentId?: string;
  }>;
}
