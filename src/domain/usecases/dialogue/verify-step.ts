import { Dialogue, StepSource } from '../../models';

export interface VerifyStep {
  step(params: VerifyStep.Params): VerifyStep.Result;
}

export namespace VerifyStep {
  export type Params = {
    msisdn: string;
    message: string;
    sourceId: number;
  };

  export type Result = Promise<{
    stepSource: StepSource;
    dialogue?: Dialogue;
  }>;
}
