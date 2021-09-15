export type ValidSecurityCode = (code: string) => {
  status: boolean;
  code: string;
};
