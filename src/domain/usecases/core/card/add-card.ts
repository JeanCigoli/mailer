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
    payload: {
      paymentId: string;
    };
  }>;
}
