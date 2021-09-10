export type Credentials = {
  username: string;
  token: string;
};

export const transformCredentials = (base: string): Credentials => {
  const params = Buffer.from(base, 'base64').toString('ascii');

  return JSON.parse(params);
};
