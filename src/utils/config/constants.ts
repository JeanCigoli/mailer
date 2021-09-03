import 'dotenv/config';

export const SERVER = {
  BASE_URI_URA: process.env.BASE_URI_URA || '',
  BASE_URI_SMS: process.env.BASE_URI_SMS || '',
  BASE_URI_WHATS: process.env.BASE_URI_WHATS || '',
  PORT: process.env.PORT || 3333,
};
