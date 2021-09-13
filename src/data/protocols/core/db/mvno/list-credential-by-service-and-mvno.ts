export interface ListCredentialByServiceAndMvno {
  findByService(
    params: ListCredentialByServiceAndMvno.Params,
  ): ListCredentialByServiceAndMvno.Result;
}

export namespace ListCredentialByServiceAndMvno {
  export type Params = {
    service: string;
    mvnoId: number;
  };

  export type Result = Promise<{
    mvnoId: number;
    serviceId: number;
    credentials: string;
  }>;
}
