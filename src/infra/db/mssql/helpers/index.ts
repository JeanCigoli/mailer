import knex from 'knex';
import { knexConfig } from './config';

export const knexConnection = knex(knexConfig);
