export interface GetUserCards {
  get(clientToken: string): GetUserCards.Result;
}

export namespace GetUserCards {
  type Card = {
    paymentId: string;
    binCode: string;
    document: string;
    lastDigits: string;
    validity: string;
    name: string;
    flag: string;
    type: string;
  };
  export type Result = Promise<{
    status: boolean;
    payload?: Array<Card>;
  }>;
}
