export interface GetCards {
  get(accountId: string): GetCards.Result;
}

export namespace GetCards {
  type Card = {
    bin: string;
    digFour: string;
    validate: string;
  };
  export type Result = Promise<{
    message: string;
    payload: Array<Card>;
    error: Array<any>;
  }>;
}
