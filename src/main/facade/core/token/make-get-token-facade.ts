import { HttpGetToken } from '../../../../data/usecases/core/token/http-get-token';
import { GetToken } from '../../../../domain/usecases/core/token/get-token';
import {
  phoenixAuthenticatorClient,
  phoenixManagerCardClient,
} from '../../../../infra/core/http/helpers/phoenix-client';
import { GetClientTokenService } from '../../../../infra/core/http/phoenix/token/get-client-token-service';
import { RequestAdapter } from '../../../../infra/core/http/web-service-rest-adapter';

export const makeGetTokenFacade: GetToken.Facade = (
  params: GetToken.Params,
): GetToken.Result => {
  const httpClient = new RequestAdapter(phoenixAuthenticatorClient);

  const getTokenService = new GetClientTokenService(httpClient);

  return new HttpGetToken(getTokenService).handle(params);
};
