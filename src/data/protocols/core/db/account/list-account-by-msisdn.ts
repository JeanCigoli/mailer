export interface ListAccountByMsisdnRepository {
  findByMsisdn(
    params: ListAccountByMsisdnRepository.Params,
  ): ListAccountByMsisdnRepository.Result;
}

export namespace ListAccountByMsisdnRepository {
  export type Params = {
    msisdn: string;
  };

  export type Result = Promise<Account>;
}
