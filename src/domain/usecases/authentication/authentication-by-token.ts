import { DecryptedTokenModel } from '../../models';

export interface AuthenticateByToken {
  authenticate: (token: string) => AuthenticateByToken.Result;
}

export namespace AuthenticateByToken {
  type tokens = {
    encryptedToken: string;
    decryptedToken: DecryptedTokenModel;
  };

  export type Result = Promise<tokens>;
}
