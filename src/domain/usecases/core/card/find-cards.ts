export interface FindCards {
  handle(clientToken: string): FindCards.Result;
}

export namespace FindCards {
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
    cards: Array<Card>;
  }>;
}
