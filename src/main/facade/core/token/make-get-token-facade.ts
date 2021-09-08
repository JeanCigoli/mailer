import { HttpGetToken } from '../../../../data/usecases/core/token/http-get-token';
import { GetToken } from '../../../../domain/usecases/core/token/get-token';
import { phoenixAuthenticator } from '../../../../infra/core/http/helpers/phoenix-authenticator';

import { GetClientTokenService } from '../../../../infra/core/http/phoenix/token/get-client-token-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeGetTokenFacade: GetToken.Facade = (
  params: GetToken.Params,
): GetToken.Result => {
  const httpClient = new RequestAdapter(phoenixAuthenticator);

  const getTokenService = new GetClientTokenService(httpClient);

  return new HttpGetToken(getTokenService).handle(params);
};
