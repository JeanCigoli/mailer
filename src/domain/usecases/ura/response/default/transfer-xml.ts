export interface TransferXml {
  format(params: any): TransferXml.Result;
}

export namespace TransferXml {
  export type Result = string;
}
