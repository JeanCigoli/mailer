import { Base64Decode } from '../../data/protocols/cryptography';

export const transformCredentials = (base: string): Base64Decode.Result => {
  const params = Buffer.from(base, 'base64').toString('ascii');

  return JSON.parse(params);
};
