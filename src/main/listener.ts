import { RabbitMqServer } from '../infra/amqp/helper';
import errorLogger from '../utils/logger';
import setupWorker from './config/listener-worker';
import {
  makeCreateMongoOnInit,
  makeCreateRabbitMqOnInit,
  makeCreateTransportOnInit,
} from './facades';

(async () => {
  try {
    const rabbitMqServer = RabbitMqServer.getInstance();

    await makeCreateMongoOnInit().start();
    await makeCreateRabbitMqOnInit().start();
    await makeCreateTransportOnInit().start();

    console.log('Listener started!');
    setupWorker(rabbitMqServer);
  } catch (error) {
    errorLogger(error);
  }
})();
