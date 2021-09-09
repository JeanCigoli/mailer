export interface ListSourceMvnoRepository {
  findBySource(
    params: ListSourceMvnoRepository.Params,
  ): ListSourceMvnoRepository.Result;
}

export namespace ListSourceMvnoRepository {
  export type Params = {
    sourceId: number;
    mvnoId: number;
  };

  export type Result = Promise<{
    sourceMvnoId: number;
    mvnoId: number;
    sourceId: number;
    authentication: string;
    createdAt: string;
  }>;
}
