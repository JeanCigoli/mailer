export type Listener = {
  enable: boolean;
  queue: string;
  handle: (message: Record<string, any>) => void;
};
