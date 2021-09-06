import { Message } from 'amqplib';

export interface ListenerConsume {
  consume(queue: string, callback: (message: Message) => void): void;
}
