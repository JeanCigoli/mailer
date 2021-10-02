export interface UpdateLogSendMailRepository {
  update(
    params: UpdateLogSendMailRepository.Params,
    id: number,
  ): UpdateLogSendMailRepository.Result;
}

export namespace UpdateLogSendMailRepository {
  export type Params = any;

  export type Result = Promise<any>;
}
