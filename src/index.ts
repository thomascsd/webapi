import { $log } from '@tsed/common';
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

    if (process.env.MODE === 'dev') {
      httpPort = '127.0.0.1:8080';
    }

    $log.debug(`MODE:${process.env.MODE}`);
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
