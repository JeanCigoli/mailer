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

  constructor(private readonly credentials: Credentials | null = null) {
    if (this.credentials) this.setCredentials(this.credentials);
  }

  public static getInstance(): RabbitMqServer {
    if (!RabbitMqServer.instance) {
      RabbitMqServer.instance = new RabbitMqServer();
    }

    return RabbitMqServer.instance;
  }

  public async start() {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  public startSync() {
    (async () => this.start())();
  }

  public async close() {
    if (!this.connection) return;
    this.connection.close();
  }

  private messageToJson(message: Message): object {
    return JSON.parse(message.content.toString());
  }

  public setCredentials(credentials: Credentials) {
    this.uri = `amqp://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}`;
  }

  public async consume(queue: string, callback: (message: Message) => void) {
    await this.channel.consume(queue, (message) => {
      if (!message) return;
      callback(message);
      this.channel.ack(message);
    });
  }
}
