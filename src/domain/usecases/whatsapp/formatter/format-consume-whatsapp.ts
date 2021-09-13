export interface FormatConsumeWhatsApp {
  format(params: FormatConsumeWhatsApp.Params): FormatConsumeWhatsApp.Result;
}

export namespace FormatConsumeWhatsApp {
  export type Params = any;

  export type Result = {
    msisdn: string;
    message: string;
    sourceId: number;
  };
}
