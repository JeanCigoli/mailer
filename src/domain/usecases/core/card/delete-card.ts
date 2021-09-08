export interface DeleteCard {
  handle(params: DeleteCard.Params): DeleteCard.Result;
}

export namespace DeleteCard {
  export type Params = {
    paymentId: string;
    clientToken: string;
  };

  export type Result = Promise<{
    status: boolean;
  }>;
}