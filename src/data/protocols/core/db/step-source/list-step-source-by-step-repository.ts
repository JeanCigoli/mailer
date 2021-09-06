import { StepSource } from '../../../../../domain/models';

export interface ListStepSourceByStepRepository {
  findByStep(
    params: ListStepSourceByStepRepository.Params,
  ): ListStepSourceByStepRepository.Result;
}

export namespace ListStepSourceByStepRepository {
  export type Params = {
    stepId: number;
    sourceId: number;
  };

  export type Result = Promise<StepSource>;
}
