require('dotenv').config({ path: __dirname + '/.env' });
import 'reflect-metadata';
const port: number = parseInt(process.env.PORT, 10) || 3000;

import Fastify from 'fastify';
import { bootstrap } from 'fastify-decorators';
import { resolve } from 'path';

let server = Fastify({
  logger: true,
});

server.register(bootstrap, {
  directory: resolve(__dirname, 'controllers'),
  mask: /\.controller\./,
});

server.listen(port, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }

  console.log(`Server listening at ${address}`);
});
