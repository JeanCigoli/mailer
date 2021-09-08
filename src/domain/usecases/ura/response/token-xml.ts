export interface TokenXml {
  handle(body: any): TokenXml.Result;
}

export namespace TokenXml {
  export type Result = string;
}
