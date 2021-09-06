import { Channel, Connection, connect, Message } from 'amqplib';

type Credentials = {
  user: string;
  password: string;
  host: string;
  port: number;
};

export class RabbitMqServer {
  private connection!: Connection;
  private channel!: Channel;
  private uri!: string;

  private static instance: RabbitMqServer;

  constructor(private readonly credentials: Credentials) {}

  public async start() {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  public async consume(queue: string, callback: (message: Message) => void) {
    await this.channel.consume(queue, (message) => {
      if (!message) return;
      callback(message);
      this.channel.ack(message);
    });
  }
}
