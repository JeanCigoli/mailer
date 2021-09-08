import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import setupRoutes from './config/router';

const server = express();

server.use(cors({ exposedHeaders: 'X-Total-Count' }));
server.use(helmet());
server.use(json());
server.use(express.urlencoded({ extended: true }));

setupRoutes(server, 'whats');
setupRoutes(server, 'ura');
setupRoutes(server, 'sms');

export { server };
