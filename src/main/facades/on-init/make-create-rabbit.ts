import { DbCreateRabbit } from '../../../data/usecases';
import { RabbitMqServer } from '../../../infra/amqp/helper';

export const makeCreateRabbitMqOnInit = () => {
  const rabbitMq = RabbitMqServer.getInstance();

  return new DbCreateRabbit(rabbitMq);
};
