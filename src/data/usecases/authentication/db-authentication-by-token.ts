import { AuthenticateByToken } from '../../../domain/usecases';
import { DecryptToken } from '../../protocols/cryptography';

export class DbAuthenticationByToken implements AuthenticateByToken {
  constructor(private readonly decryptToken: DecryptToken) {}

  async authenticate(token: string): AuthenticateByToken.Result {
    const decrypt = this.decryptToken.decrypt(token);

    return {
      encryptedToken: token,
      decryptedToken: decrypt,
    };
  }
}
