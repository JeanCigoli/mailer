import { DbAuthenticationByToken } from '../../../data/usecases';
import { SecretToken } from '../../../infra/cryptography/secret-token';
import { AuthenticateByTokenMiddleware } from '../../../presentation/middleware/authentication-by-token-middleware';

export const makeAuthenticateByTokenMiddleware = () => {
  const secretToken = new SecretToken();

  const dbValidateAuthentication = new DbAuthenticationByToken(secretToken);

  return new AuthenticateByTokenMiddleware(dbValidateAuthentication);
};
