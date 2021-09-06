export type Dialogue = {
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
