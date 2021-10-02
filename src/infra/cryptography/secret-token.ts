import { createDecipheriv } from 'crypto';
import { DecryptToken } from '../../data/protocols/cryptography';
import { ENCRYPTION } from '../../utils/config/constants';

export class SecretToken implements DecryptToken {
  decrypt(data: string): DecryptToken.Result {
    const encryptedText = Buffer.from(data, 'base64');

    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(ENCRYPTION.KEY),
      ENCRYPTION.IV,
    );

    const updatedDecipher = decipher.update(encryptedText);

    const finalDecipher = Buffer.concat([updatedDecipher, decipher.final()]);

    const base = finalDecipher.toString();

    return JSON.parse(base);
  }
}
