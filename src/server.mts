import { Configuration, Inject } from '@tsed/di';
import { PlatformExpress } from '@tsed/platform-express';
import * as multer from 'multer';
import dotenv from 'dotenv';
import { ApiController } from './controllers/ApiController.mjs';
import { UserDto } from './dtos/index.mjs';
import '@tsed/swagger';
import './protocals/index.mjs';
import './filters/ErrorFilter.mjs';

const config = dotenv.config({
  path: '.env',
});

@Configuration({
  envs: {
    AIRTABLE_API: process.env.AIRTABLE_API || config.parsed?.AIRTABLE_API || '',
    API_KEY_WHITELIST: process.env.API_KEY_WHITELIST || config.parsed?.API_KEY_WHITELIST || '',
    NASA_API: process.env.NASA_API || config.parsed?.NASA_API || '',
    WEATHERBIT_API_KEY: process.env.WEATHERBIT_API_KEY || config.parsed?.WEATHERBIT_API_KEY || '',
  },
  mount: {
    '/': [ApiController],
  },
  ajv: {
    // allErrors: true,
    // verbose: true,
    // logger: {
    //   log: console.log,
    //   warn: console.warn,
    //   error: console.error,
    // },
  },
  middlewares: ['cors', 'helmet', 'method-override', 'json-parser'],
  multer: {
    storage: multer.memoryStorage(),
  },
  swagger: [
    {
      path: '/docs',
      specVersion: '3.0.1',
    },
  ],
  passport: {
    disableSession: true,
    userInfoModel: UserDto,
  },
})
export default class Server {
  @Inject()
  app!: PlatformExpress;
}
