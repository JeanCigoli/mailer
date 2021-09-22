export interface MenuXml {
  format(params: any): MenuXml.Result;
}

export namespace MenuXml {
  export type Result = string;
}
