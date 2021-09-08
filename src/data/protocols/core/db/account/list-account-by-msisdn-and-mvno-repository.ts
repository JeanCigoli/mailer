export interface ListAccountByMsisdnAndMvnoRepository {
  findByMsisdnAndMvno(
    params: ListAccountByMsisdnAndMvnoRepository.Params,
  ): ListAccountByMsisdnAndMvnoRepository.Result;
}

export namespace ListAccountByMsisdnAndMvnoRepository {
  export type Params = {
    msisdn: string;
    mvnoId: number;
  };

  export type Result = Promise<{
    msisdn: string;
    name: string;
    email: string;
    mvno: string;
    accountId: number;
    externalId: string;
    dateGrace: string;
    mvnoId: number;
  }>;
}
