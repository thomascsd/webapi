import { Configuration, Inject } from '@tsed/di';
import { PlatformExpress } from '@tsed/platform-express';
import * as multer from 'multer';
import { ApiController } from './controllers/ApiController.mjs';
import { UserDto } from './dtos/index.mjs';
import '@tsed/swagger';
import './protocals/index.mjs';
import './filters/ErrorFilter.mjs';

@Configuration({
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
