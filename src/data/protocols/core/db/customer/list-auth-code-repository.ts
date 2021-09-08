export interface ListAuthCodeRepository {
  findByAccount(
    params: ListAuthCodeRepository.Params,
  ): ListAuthCodeRepository.Result;
}

export namespace ListAuthCodeRepository {
  export type Params = {
    accountId: number;
  };

  export type Result = Promise<{
    authCode: string;
    sourceMvnoId: string;
    accountId: number;
  }>;
}
