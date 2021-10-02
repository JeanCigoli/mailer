import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import setupRoutes from './config/router';

const server = express();

server.use(cors({ exposedHeaders: 'X-Total-Count' }));
server.use(helmet());
server.use(json());
server.use(express.urlencoded({ extended: true }));

server.set('views', path.join(__dirname, '..', '..', 'templates'));
server.set('view engine', 'hbs');

setupRoutes(server);

export { server };
