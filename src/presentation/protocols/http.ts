import { Dialogue, StepSource } from '../../domain/models';

export interface HttpRequest {
  headers?: any;
  body?: any;
  query?: any;
  params?: any;
  step: {
    stepSource: StepSource;
    dialogue?: Dialogue;
  };
}

export interface HttpResponse {
  statusCode: number;
  body?: any;
  headers?: any;
}
