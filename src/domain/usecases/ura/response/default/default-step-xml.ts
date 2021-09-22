export interface DefaultStepXml {
  format(body: any): DefaultStepXml.Result;
}

export namespace DefaultStepXml {
  export type Result = string;
}
