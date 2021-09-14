import { HttpValidateAccount } from '../../../../data/usecases/core/account/http-validate-account';
import { ValidateAccount } from '../../../../domain/usecases/core';
import { phoenixAccount } from '../../../../infra/core/http/helpers/phoenix-account';
import { GetAccountService } from '../../../../infra/core/http/phoenix';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';
import { makeGetTokenFacade } from '../token/make-get-token-facade';

export const makeValidateAccountFacade: ValidateAccount.Facade = (params) => {
  const requestAdapter = new RequestAdapter(phoenixAccount);

  const getAccountService = new GetAccountService(requestAdapter);

  const httpValidateAccount = new HttpValidateAccount(
    getAccountService,
    makeGetTokenFacade,
  );

  return httpValidateAccount.valid(params);
};
