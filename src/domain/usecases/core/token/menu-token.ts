export interface MenuToken {
  check(params: MenuToken.Params): MenuToken.Result;
}

export namespace MenuToken {
  export type Params = {
    msisdn: string;
    message: string;
    sourceId: number;
    stepSource: StepSource;
    dialogue: Dialogue;
  };

  export type Result = Promise<{
    status: boolean;
    messages: string[];
    data?: any;
  }>;
}
