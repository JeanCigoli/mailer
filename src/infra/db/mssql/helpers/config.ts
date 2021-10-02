import { DATABASE } from '../../../../utils/config/constants';

const knexConfig = {
  client: DATABASE.DB_DIALECT,
  connection: {
    host: DATABASE.DB_HOST,
    port: +DATABASE.DB_PORT,
    user: DATABASE.DB_USERNAME,
    password: DATABASE.DB_PASSWORD,
    database: '',
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
  },
};

export { knexConfig };
