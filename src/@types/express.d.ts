type Dialogue = {
  dialogueId: number;
  accountId: number;
  stepSourceId: number;
  requestText?: string;
  requestDate?: Date;
  responseText?: string;
  responseDate?: Date;
  expected?: any;
  session?: any;
  createdAt: Date;
  updatedAt: Date;
};

type StepSource = {
  stepSourceId: number;
  stepId: number;
  sourceId: number;
  message: string;
  ordering: number;
};

declare module Express {
  export interface Request {
    step: StepSource;
    dialogue?: Dialogue;
  }
}
