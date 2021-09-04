import { Authentication } from '../../../../domain/usecases/core';

export class DbAuthentication implements Authentication {
  async auth(params: Authentication.Params): Authentication.Result {
    throw new Error('Method not implemented.');
  }
}
