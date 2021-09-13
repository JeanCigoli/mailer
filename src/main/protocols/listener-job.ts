export interface Job {
  handle(message: Record<string, any>, next?: Function): Promise<void>;
}
