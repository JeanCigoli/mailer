export type DefaultBody = {
  msisdn: string;
  message: string;
  sourceId: number;
  stepSource: StepSource;
  dialogue: Dialogue;
};

export type DefaultResult = {
  status: boolean;
  messages: string[];
  step: StepSource;
  data?: any;
};
