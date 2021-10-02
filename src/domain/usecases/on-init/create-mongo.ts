export interface CreateMongo {
  start(): CreateMongo.Result;
}

export namespace CreateMongo {
  export type Result = Promise<void>;
}
