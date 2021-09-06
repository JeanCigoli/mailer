import { Dialogue } from '../../../../../domain/models';

export interface UpdateDialogueRepository {
  update(
    params: UpdateDialogueRepository.Params,
    id: number,
  ): UpdateDialogueRepository.Result;
}

export namespace UpdateDialogueRepository {
  export type Params = Partial<Dialogue>;

  export type Result = Promise<Dialogue>;
}
