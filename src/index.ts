import { loadEnv } from '@thomascsd/stools';
import 'reflect-metadata';
import Server from './server.js';

loadEnv();

const server = new Server();
const port: number = parseInt(process.env.PORT || '3000', 10);
server.run(port);
