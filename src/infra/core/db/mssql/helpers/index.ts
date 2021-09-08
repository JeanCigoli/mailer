import knex from 'knex';
import { phoenixConfig } from './config';

export const dbPhoenix = knex(phoenixConfig);
