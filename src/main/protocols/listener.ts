import { Message } from 'amqplib';

export type Listener = {
  enable: boolean;
  queue: string;
  handle: (message: Message) => void;
};
