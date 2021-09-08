import { Card } from '../../../../utils/types/card/card-type';

export interface ListCards {
  handle(clientToken: string): ListCards.Result;
}

export namespace ListCards {
  export type Result = Promise<{
    cards: Array<Card>;
  }>;

  export type Facade = (clientToken: string) => ListCards.Result;
}
