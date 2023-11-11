import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import * as multer from 'multer';
import { ApiController } from './controllers/ApiController';
import { ClassTransformerPipe } from './pipes/ClassTransformerPipe';
import { ClassValidationPipe } from './pipes/ClassValidationPipe';
import { UserDto } from './dtos';
import '@tsed/swagger';
import './protocals';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

@Configuration({
  mount: {
    '/': [ApiController],
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
  imports: [ClassValidationPipe, ClassTransformerPipe],
})
export default class Server {
  @Inject()
  app!: PlatformApplication;
}
