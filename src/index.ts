import 'reflect-metadata';
import Fastify from 'fastify';
import { bootstrap } from 'fastify-decorators';
import { useContainer } from '@fastify-decorators/typedi';
import fastifyEnv from 'fastify-env';
import { Container } from 'typedi';
import path from 'path';
import { fileURLToPath } from 'url';

const port: number = parseInt(process.env.PORT, 10) || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

useContainer(Container);

let server = Fastify({
  logger: true,
});

server.register(fastifyEnv, {
  confKey: 'config',
  schema: {
    type: 'object',
    require: ['AIRTABLE_API'],
    properties: {
      AIRTABLE_API: {
        type: 'string',
      },
    },
  },
  dotenv: true,
  data: process.env,
});

server.register(bootstrap, {
  directory: path.resolve(__dirname, 'controllers'),
  mask: /\.controller\./,
});

server.listen(port, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(-1);
  }

  console.log(`Server listening at ${address}`);
});
