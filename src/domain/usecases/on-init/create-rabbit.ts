export interface CreateRabbit {
  start(): CreateRabbit.Result;
}

export namespace CreateRabbit {
  export type Result = Promise<void>;
}
