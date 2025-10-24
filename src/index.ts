import { $log } from '@tsed/logger';
import { PlatformExpress } from '@tsed/platform-express';
import Server from './server.mjs';
import dotenv from 'dotenv';
import 'reflect-metadata';

const config = dotenv.config({
  path: '.env',
});

async function bootstrap() {
  let httpPort: string | number = 8080;

  try {
    $log.debug('Start server...');

    if (process.env.NODE_ENV === 'dev') {
      httpPort = '127.0.0.1:8080';
    }

    $log.debug(`NODE_ENV:${process.env.NODE_ENV}`);
    $log.debug(`httpPort:${httpPort}`);

    const configObj = {
      ...config.parsed,
      httpPort,
    };

    const platform = await PlatformExpress.bootstrap(Server, configObj);

    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
