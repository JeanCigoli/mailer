export interface DeleteCard {
  delete(paymentId: string): DeleteCard.Result;
}

export namespace DeleteCard {
  export type Result = Promise<{
    message: string;
    payload: object;
    error: any[];
  }>;
}
