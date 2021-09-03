export interface XmlParser {
  convert(params: XmlParser.Params): XmlParser.Result;
}

export namespace XmlParser {
  export type Params = {
    body: any;
  };

  export type Result = {
    body: any;
  };
}
