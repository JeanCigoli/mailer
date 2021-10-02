import { DecryptedTokenModel } from '../../../domain/models';

export interface DecryptToken {
  decrypt(data: string): DecryptToken.Result;
}

export namespace DecryptToken {
  export type Result = DecryptedTokenModel;
}
