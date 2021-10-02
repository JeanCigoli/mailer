import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
} from '@badass-team-code/formatted-cases-words';

import { Channel, connect, Connection, Message } from 'amqplib';

type Credentials = {
  user: string;
  password: string;
  host: string;
  port: number;
};

type Payload = {
  body: object;
  headers: object;
};

export class RabbitMqServer {
  private connection!: Connection;
  private channel!: Channel;
  private uri!: string;

  private static instance: RabbitMqServer;

  constructor(private credentials: Credentials | null = null) {
    if (this.credentials) this.setCredentials(this.credentials);
  }

  public static getInstance(): RabbitMqServer {
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

  public publishInQueue(queue: string, message: object, headers: object) {
    const messageFromBuffer = this.messageFromBuffer(
      formateCamelCaseKeysForSnakeCase(message),
    );

    return this.channel.sendToQueue(queue, messageFromBuffer, { headers });
  }

  public publishInExchange(
    exchange: string,
    routingKey: string,
    message: object,
  ) {
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

  private messageToJson(message: Message): object {
    return formateSnakeCaseKeysForCamelCase(
      JSON.parse(message.content.toString()),
    );
  }

  public async consume(queue: string, callback: (payload: Payload) => void) {
    await this.channel.consume(
      queue,
      (message) => {
        if (!message) return;

        const payload: Payload = {
          body: this.messageToJson(message),
          headers: message.properties.headers,
        };

        callback(payload);

        this.channel.ack(message);
      },
      {},
    );
  }
}
