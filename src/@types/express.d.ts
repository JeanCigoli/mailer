interface AuthData {
  authentication: string;
  sourceMvnoId: number;
  mobileOperatorId: number;
  sourceId: number;
  mvnoId: number;
  userId: number;
}

interface TokenData {
  id: string;
  type: number;
  issuedAt: string;
  expiration: string;
  encryptedToken: string;
}

declare module Express {
  export interface Request {
    authData: AuthData;
    token: TokenData;
  }
}
