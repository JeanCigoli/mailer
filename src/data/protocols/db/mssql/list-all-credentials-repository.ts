export interface ListAllCredentialsRepository {
  findAll(
    params: ListAllCredentialsRepository.Params,
  ): ListAllCredentialsRepository.Result;
}

export namespace ListAllCredentialsRepository {
  export type Params = {
    serviceId: number;
  };

  export type Result = Promise<
    {
      serviceId: number;
      mvnoId: number;
      credentials: string;
    }[]
  >;
}
