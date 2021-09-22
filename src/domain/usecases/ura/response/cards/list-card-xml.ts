export interface ListCardsXml {
  format(body: any): ListCardsXml.Result;
}

export namespace ListCardsXml {
  export type Result = string;
}
