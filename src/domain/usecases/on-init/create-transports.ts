export interface CreateTransports {
  start(): CreateTransports.Result;
}

export namespace CreateTransports {
  export type Result = Promise<void>;
}
