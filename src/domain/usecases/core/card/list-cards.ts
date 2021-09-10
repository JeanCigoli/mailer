import { Card } from '../../../models';

export interface ListCards {
  handle(clientToken: string): ListCards.Result;
}

export namespace ListCards {
  export type Result = Promise<{
    cards: Array<Card>;
  }>;

  export type Facade = (clientToken: string) => ListCards.Result;
}
