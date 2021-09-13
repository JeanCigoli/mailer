import { RabbitMqServer } from '../infra/amqp/helper';
import { MongoHelper } from '../infra/core/db/mongo/helpers';
import { MONGO, RABBIT } from '../utils/config/constants';
import errorLogger from '../utils/logger';
import setupWorker from './config/listener-worker';

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

    const rabbitMqServer = RabbitMqServer.getInstance();

    rabbitMqServer.setCredentials({
      user: RABBIT.USER,
      password: RABBIT.PASSWORD,
      host: RABBIT.HOST,
      port: +RABBIT.PORT,
    });

    await rabbitMqServer.start();

    console.log('Listener started!');
    setupWorker(rabbitMqServer);
  } catch (error) {
    errorLogger(error);
  }
})();
