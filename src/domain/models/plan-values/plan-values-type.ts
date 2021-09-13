type Service = {
  name: string;
  value: string;
  title: string;
  description: string;
};

export type Plan = {
  id: string;
  planId: number;
  type: string;
  name: string;
  label: string;
  description: string;
  value: string;
  audio: string;
  program: number;
  services: Array<Service>;
};
