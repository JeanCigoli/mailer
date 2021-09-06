import { StepSource } from '../../../../../domain/models';

export interface listStepSourceByIdRepository {
  findById(
    params: listStepSourceByIdRepository.Params,
  ): listStepSourceByIdRepository.Result;
}

export namespace listStepSourceByIdRepository {
  export type Params = {
    id: number;
  };

  export type Result = Promise<StepSource>;
}
