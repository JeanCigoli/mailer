export interface ListDefaultParamsRepository {
  findDefaultParams(
    params: ListDefaultParamsRepository.Params,
  ): ListDefaultParamsRepository.Result;
}

export namespace ListDefaultParamsRepository {
  export type Params = {
    mvnoId: number;
  };

  export type Result = Promise<{
    rgb1: string;
    rgb2: string;
    buttonColor: string;
    company: string;
    mvnoImage: string;
  }>;
}
