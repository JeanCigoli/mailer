import { Channel, connect, Connection, ConsumeMessage, Message } from 'amqplib';

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

  constructor(private credentials: Credentials | null = null) {
    if (this.credentials) this.setCredentials(this.credentials);
  }

  public getInstance(): RabbitMqServer {
    if (!RabbitMqServer.instance) {
      RabbitMqServer.instance = new RabbitMqServer();
    }

    return RabbitMqServer.instance;
  }

  public startSync() {
    (async () => await this.start())();
  }

  public setCredentials(credentials: Credentials) {
    this.uri = `amqp://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}`;
  }

  public async start() {
    if (this.connection) return;
    if (!this.uri) throw new Error('RABBITMQ_CREDENTIALS_NOT_DEFINED');
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  public async close() {
    if (!this.connection) return;
    await this.connection.close();
  }

  public publishInQueue(queue: string, message: any, headers?: any) {
    return this.channel.sendToQueue(queue, this.messageFromBuffer(message), {
      headers,
    });
  }

  public publishInExchange(exchange: string, routingKey: string, message: any) {
    return this.channel.publish(
      exchange,
      routingKey,
      this.messageFromBuffer(message),
    );
  }

  private messageFromBuffer(message: any): Buffer {
    const string = JSON.stringify(message);
    return Buffer.from(string);
  }

  private messageToJson(message: Message): any {
    return JSON.parse(message.content.toString());
  }

  public async consume(
    queue: string,
    callback: (message: any, headers: any) => Promise<void>,
    ackByDefault = true,
  ) {
    await this.channel.consume(
      queue,
      async (message: ConsumeMessage | null) => {
        if (!message || !message.properties.headers) {
          this.channel.ack({} as Message);
          return;
        }

        await callback(this.messageToJson(message), message.properties.headers);
        if (ackByDefault) this.channel.ack(message);
      },
    );
  }
}
