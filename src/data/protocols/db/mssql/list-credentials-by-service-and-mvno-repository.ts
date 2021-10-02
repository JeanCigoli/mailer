export interface ListCredentialByServiceAndMvnoRepository {
  findByServiceAndMvno(
    params: ListCredentialByServiceAndMvnoRepository.Params,
  ): ListCredentialByServiceAndMvnoRepository.Result;
}

export namespace ListCredentialByServiceAndMvnoRepository {
  export type Params = {
    serviceId: number;
    mvnoId: number;
  };

  export type Result = Promise<{
    serviceId: number;
    mvnoId: number;
    credentials: string;
  }>;
}
