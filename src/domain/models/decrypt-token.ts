export type DecryptedTokenModel = {
  id: string;
  type: number;
  issuedAt: string;
  expiration: string;
  payload: {
    authentication: string;
    sourceMvnoId: number;
    mobileOperatorId: number;
    sourceId: number;
    mvnoId: number;
    userId: number;
  };
};
