import { dbPhoenix } from '../infra/core/db/helpers';
import { SERVER } from '../utils/config/constants';
import errorLogger from '../utils/logger';
import { server } from './application';

(async () => {
  try {
    await dbPhoenix.raw('SELECT 1');

    server.listen(SERVER.PORT, async () => {
      console.log(`Server is running on port: ${SERVER.PORT}`);
    });
  } catch (error) {
    errorLogger(error);
  }
})();
