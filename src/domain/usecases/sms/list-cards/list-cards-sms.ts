export interface ListCardsSms {
  handle(body: any): ListCardsSms.Result;
}

export namespace ListCardsSms {
  export type Result = Promise<void>;
}
