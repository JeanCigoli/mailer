export interface CreateLogSendMailRepository {
  create(
    params: CreateLogSendMailRepository.Params,
  ): CreateLogSendMailRepository.Result;
}

export namespace CreateLogSendMailRepository {
  export type Params = any;

  export type Result = Promise<any>;
}
