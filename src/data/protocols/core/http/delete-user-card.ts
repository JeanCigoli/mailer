export interface DeleteUserCard {
  delete(params: DeleteUserCard.Params): DeleteUserCard.Result;
}

export namespace DeleteUserCard {
  export type Params = {
    paymentId: string;
    clientToken: string;
  };

  export type Result = Promise<{
    status: boolean;
  }>;
}
