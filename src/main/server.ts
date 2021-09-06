import { RabbitMqServer } from '../infra/amqp/helper';
import { dbPhoenix } from '../infra/core/db/helpers';
import { RABBITMQ, SERVER } from '../utils/config/constants';
import errorLogger from '../utils/logger';
import { server } from './application';

(async () => {
  try {
    const rabbitMqServer = new RabbitMqServer();
    const rabbitMq = rabbitMqServer.getInstance();
    rabbitMq.setCredentials({
      host: RABBITMQ.HOST,
      password: RABBITMQ.PASSWORD,
      port: +RABBITMQ.PORT,
      user: RABBITMQ.USER,
    });
    await rabbitMq.start();

    await dbPhoenix.raw('SELECT 1');

    server.listen(SERVER.PORT, async () => {
      console.log(`Server is running on port: ${SERVER.PORT}`);
    });
  } catch (error) {
    errorLogger(error);
  }
})();