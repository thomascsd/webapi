import { loadEnv } from '@thomascsd/stools';
import 'reflect-metadata';
import Server from './server.js';

loadEnv();

const server = new Server();
const port: number = parseInt(process.env.PORT, 10) || 3000;
server.run(port);
