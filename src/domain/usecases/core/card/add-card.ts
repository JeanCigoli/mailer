export interface AddCard {
  handle(params: AddCard.Params): AddCard.Result;
}

export namespace AddCard {
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
    message?: string;
  }>;

  export type Facade = (params: AddCard.Params) => AddCard.Result;
}
