import { SERVER } from '../utils/config/constants';
import { server } from './application';

(async () => {
  try {
    server.listen(SERVER.PORT, async () => {
      console.log(`SERVER IS RUNNING ON PORT ${SERVER.PORT}`);
    });
  } catch (e) {}
})();
