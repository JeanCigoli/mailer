import { RabbitMqServer } from '../infra/core/amqp/helpers';
import setupWorker from './config/listener-worker';

const server = new RabbitMqServer('');
console.log('Listener started!');
setupWorker(server);
