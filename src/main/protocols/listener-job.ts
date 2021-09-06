export interface Job {
  handle(message: string): Promise<void>;
}
