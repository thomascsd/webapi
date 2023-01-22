import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import Server from './server';
import dotenv from 'dotenv';
import 'reflect-metadata';

const config = dotenv.config({
  path: '.env',
});

async function bootstrap() {
  try {
    $log.debug('Start server...');
    const platform = await PlatformExpress.bootstrap(Server, config.parsed);

    await platform.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
