import { Dialogue } from '../../../../../domain/models';

export interface ListDialogueByMsisdnRepository {
  findByMsisdn(
    params: ListDialogueByMsisdnRepository.Params,
  ): ListDialogueByMsisdnRepository.Result;
}

export namespace ListDialogueByMsisdnRepository {
  export type Params = {
    msisdn: string;
    dateInit: string;
    dateFinal: string;
  };

  export type Result = Promise<Dialogue | null>;
}
