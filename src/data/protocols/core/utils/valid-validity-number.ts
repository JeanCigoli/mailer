export type ValidCardValidity = (date: string) => {
  status: boolean;
  validity: string;
};
