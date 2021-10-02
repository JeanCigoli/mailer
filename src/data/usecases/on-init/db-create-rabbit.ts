import { CreateRabbit } from '../../../domain/usecases';
import { RabbitMqServer } from '../../../infra/amqp/helper';
import { RABBIT } from '../../../utils/config/constants';

export class DbCreateRabbit implements CreateRabbit {
  constructor(private readonly rabbitMq: RabbitMqServer) {}

  async start(): CreateRabbit.Result {
    this.rabbitMq.setCredentials({
      host: RABBIT.HOST,
      password: RABBIT.PASSWORD,
      port: +RABBIT.PORT,
      user: RABBIT.USER,
    });

    await this.rabbitMq.start();
  }
}
