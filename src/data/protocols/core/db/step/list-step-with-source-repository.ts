export interface ListStepWithSourceRepository {
  findStepAndSource(
    params: ListStepWithSourceRepository.Params,
  ): ListStepWithSourceRepository.Result;
}

export namespace ListStepWithSourceRepository {
  export type Params = {
    step: number;
    sourceId: number;
  };

  export type Result = Promise<StepSource>;
}
