import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import xmlparser from 'express-xml-bodyparser';
import setupPublicRoutes from './config/router';

const server = express();

server.use(cors({ exposedHeaders: 'X-Total-Count' }));
server.use(helmet());
// server.use(xmlparser());
server.use(json());
server.use(express.urlencoded({ extended: true }));

setupPublicRoutes(server, 'ura');

export { server };
