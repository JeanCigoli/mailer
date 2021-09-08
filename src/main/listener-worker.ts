import { RabbitMqServer } from '../infra/core/amqp/helpers';
import setupWorker from './config/listener-worker';
import { RABBITMQ } from '../utils/config/constants';

(async () => {
  try {
    const server = RabbitMqServer.getInstance();

    server.setCredentials({
      user: RABBITMQ.USER,
      host: RABBITMQ.HOST,
      password: RABBITMQ.PASSWORD,
      port: +RABBITMQ.PORT,
    });

    await server.start();

    console.log('Listener started!');
    setupWorker(server);
  } catch (e) {
    console.log({ e });
  }
})();
