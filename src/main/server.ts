import { RabbitMqServer } from '../infra/amqp/helper';
import { MongoHelper } from '../infra/core/db/mongo/helpers';
import { dbPhoenix } from '../infra/core/db/mssql/helpers';
import { RABBITMQ, SERVER, MONGO } from '../utils/config/constants';
import errorLogger from '../utils/logger';
import { server } from './application';

(async () => {
  try {
    await MongoHelper.setCredentials({
      authSource: MONGO.AUTH_SOURCE,
      host: MONGO.HOST,
      name: MONGO.NAME,
      password: MONGO.PASSWORD,
      port: +MONGO.PORT,
      user: MONGO.USER,
    });

    await MongoHelper.connect();

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
