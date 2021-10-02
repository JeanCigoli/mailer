import { knexConnection } from '../infra/db/mssql/helpers';
import { SERVER } from '../utils/config/constants';
import errorLogger from '../utils/logger';
import { server } from './application';
import {
  makeCreateTransportOnInit,
  makeCreateMongoOnInit,
  makeCreateRabbitMqOnInit,
} from './facades';

(async () => {
  try {
    await makeCreateMongoOnInit().start();
    await makeCreateRabbitMqOnInit().start();
    await makeCreateTransportOnInit().start();

    await knexConnection.raw('SELECT 1');
    server.listen(SERVER.PORT, async () => {
      console.log(`Server is running on port: ${SERVER.PORT}`);
    });
  } catch (error) {
    errorLogger(error);
  }
})();
