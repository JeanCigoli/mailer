import { Dialogue } from '../../../../../domain/models';

export interface CreateDialogueRepository {
  create(
    params: CreateDialogueRepository.Params,
  ): CreateDialogueRepository.Result;
}

export namespace CreateDialogueRepository {
  export type Params = Omit<Dialogue, 'dialogueId' | 'createdAt' | 'updatedAt'>;

  export type Result = Promise<Dialogue>;
}
