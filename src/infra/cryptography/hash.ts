import crypto from 'crypto';

export const hash = (plaintext: string): string =>
  crypto.createHash('sha256').update(plaintext, 'binary').digest('hex');
