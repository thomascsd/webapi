import 'reflect-metadata';
import Server from './server';

require('dotenv').config({
  path: '.env',
});

const server = new Server();
const port: number = parseInt(process.env.PORT || '8080', 10);
server.run(port);
