import 'reflect-metadata';
import Server from './server.js';

require('dotenv').config({
  path: 'dist/.env',
});

const server = new Server();
const port: number = parseInt(process.env.PORT || '8080', 10);
server.run(port);
