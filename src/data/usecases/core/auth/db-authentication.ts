import { Authentication } from '../../../../domain/usecases/core';
import { ListAccountByMsisdnRepository } from '../../../protocols/core/db';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly listAccountByMsisdnRepository: ListAccountByMsisdnRepository,
  ) {}

  async auth(params: Authentication.Params): Authentication.Result {
    const account = await this.listAccountByMsisdnRepository.findByMsisdn({
      msisdn: params.msisdn,
    });

    if (!account) {
      return {
        data: {},
        status: false,
      };
    }

    return {
      status: true,
      data: account,
    };
  }
}
