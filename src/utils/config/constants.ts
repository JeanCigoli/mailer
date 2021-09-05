import 'dotenv/config';

export const SERVER = {
  BASE_URI_URA: process.env.BASE_URI_URA || '',
  BASE_URI_SMS: process.env.BASE_URI_SMS || '',
  BASE_URI_WHATS: process.env.BASE_URI_WHATS || '',
  PORT: process.env.PORT || 3333,
};

export const URLS = {
  PHOENIX_BASE_URL: process.env.PHOENIX_BASE_URL,
};

export const DATABASE = {
  DB_NAME: process.env.DATABASE_NAME || '',
  DB_DIALECT: process.env.DATABASE_DIALECT || 'mssql',
  DB_HOST: process.env.DATABASE_HOST || '',
  DB_USERNAME: process.env.DATABASE_USER || '',
  DB_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DB_INSTANCE_NAME: process.env.DATABASE_INSTANCE_NAME || '',
  DB_PORT: process.env.DATABASE_PORT || '',
};

export const RABBITMQ = {
  HOST: process.env.RABBIT_HOST || '',
  PORT: process.env.RABBIT_PORT || '',
  USER: process.env.RABBIT_USER || '',
  PASSWORD: process.env.RABBIT_PASSWORD || '',
};
