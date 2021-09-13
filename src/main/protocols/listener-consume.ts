export interface ListenerConsume {
  consume(queue: string, callback: (message: object) => void): void;
}
