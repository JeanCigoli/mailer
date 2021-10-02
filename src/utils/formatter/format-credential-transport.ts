type Credentials = {
  user: string;
  password: string;
  host: string;
  port: number;
};

export const formatCredentialTransport = (
  credential: Credentials,
  type: string,
) => {
  switch (type) {
    case 'gmail':
      return {
        host: credential.host,
        port: credential.port || 465,
        secure: false,
        auth: {
          user: credential.user,
          pass: credential.password,
        },
        tls: {
          rejectUnauthorized: true,
        },
      };
    case 'smtp':
      return {};
    case 'test':
      return {
        host: credential.host,
        port: credential.port || 465,
        auth: {
          user: credential.user,
          pass: credential.password,
        },
      };
    default:
      throw new Error('TYPE_NOT_IMPLEMENTED');
  }
};
