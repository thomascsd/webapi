import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import * as multer from 'multer';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiController } from './controllers/ApiController';
import { ClassTransformerPipe } from './pipes/ClassTransformerPipe';
import { ClassValidationPipe } from './pipes/ClassValidationPipe';
import '@tsed/swagger';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

@Configuration({
  mount: {
    '/': [ApiController],
  },
  httpPort: '127.0.0.1:8080',
  multer: {
    storage: multer.memoryStorage(),
  },
  swagger: [
    {
      path: '/docs',
      specVersion: '3.0.1',
    },
  ],
  imports: [ClassValidationPipe, ClassTransformerPipe],
})
export default class Server {
  @Inject()
  app!: PlatformApplication;

  public $beforeRoutesInit(): void | Promise<any> {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }
}
