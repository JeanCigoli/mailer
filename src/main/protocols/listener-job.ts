export interface Job {
  handle(message: object): Promise<void>;
}
