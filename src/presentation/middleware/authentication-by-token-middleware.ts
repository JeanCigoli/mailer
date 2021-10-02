import { AuthenticateByToken } from '../../domain/usecases';
import { makeError } from '../../utils';
import errorLogger from '../../utils/logger';
import { badRequest, unauthorized } from '../../utils/response/response';
import { Middleware } from '../protocols';

export class AuthenticateByTokenMiddleware implements Middleware {
  constructor(
    private readonly authenticateByAuthentication: AuthenticateByToken,
  ) {}

  async handle(...[httpRequest, next]: Middleware.Params): Middleware.Result {
    try {
      if (!httpRequest.headers?.authorization)
        throw new Error('AUTHENTICATION_NOT_FOUND');

      const { authorization } = httpRequest.headers;

      const { encryptedToken, decryptedToken } =
        await this.authenticateByAuthentication.authenticate(authorization);

      const { payload, ...tokenData } = decryptedToken;

      httpRequest.authData = payload;
      httpRequest.token = { encryptedToken, ...tokenData };

      return next();
    } catch (error: any) {
      errorLogger(error);
      switch (error.message) {
        case 'AUTHENTICATION_NOT_FOUND':
          return badRequest(
            makeError('Authorization', 'Authorization não fornecido.'),
          );
        default:
          return unauthorized('Credenciais de autenticação inválidas');
      }
    }
  }
}
